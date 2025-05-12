import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  BarChart3,
  FolderOpen,
  Upload,
  FileSpreadsheet,
  LogOut,
  FileIcon,
} from "lucide-react";
import FileUpload from "./FileUpload";
import { supabase } from "../lib/supabase";

const UserDashboard = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    id?: string;
  } | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showGoogleDrive, setShowGoogleDrive] = useState(false);
  const [googleDriveFiles, setGoogleDriveFiles] = useState<any[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated with Supabase
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Fallback to localStorage check for backward compatibility
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
      }

      // Get user data from localStorage
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      } else if (session?.user) {
        // If we have a session but no localStorage data, update localStorage
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const userInfo = {
          id: session.user.id,
          email: session.user.email || "",
          name: userData?.name || session.user.email?.split("@")[0] || "User",
        };

        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("isAuthenticated", "true");
        setUser(userInfo);
      }
    };

    checkAuth();
  }, [navigate]);

  // Check if user has connected Google Drive
  useEffect(() => {
    const checkProviders = async () => {
      const { data } = await supabase.auth.getUserIdentities();
      const hasGoogleProvider = data?.identities?.some(
        (identity) => identity.provider === "google",
      );
      if (hasGoogleProvider) {
        // User has connected Google account
        localStorage.setItem("googleConnected", "true");
      }
    };

    checkProviders();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("googleConnected");
    navigate("/");
  };

  const fetchGoogleDriveFiles = async () => {
    setIsLoadingDrive(true);
    setShowGoogleDrive(true);

    try {
      // Call our edge function to fetch Google Drive files
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-google-drive-files",
        {
          body: {},
        },
      );

      if (error) throw error;

      setGoogleDriveFiles(data.files || []);
    } catch (error) {
      console.error("Error fetching Google Drive files:", error);
      // If we get an error, it might be because the user needs to reconnect their Google account
      const isGoogleConnected =
        localStorage.getItem("googleConnected") === "true";

      if (!isGoogleConnected) {
        // Prompt user to connect Google account
        connectGoogleAccount();
      }
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const connectGoogleAccount = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/drive.readonly",
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const selectGoogleDriveFile = async (
    fileId: string,
    fileName: string,
    mimeType: string,
  ) => {
    try {
      // Call our edge function to get file content
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-google-drive-download",
        {
          body: { fileId, fileName, mimeType },
        },
      );

      if (error) throw error;

      // Save file reference to our database
      if (user?.id) {
        const { error: dbError } = await supabase.from("files").insert([
          {
            user_id: user.id,
            name: fileName,
            size: data.size || 0,
            type: mimeType,
            path: data.path || null,
          },
        ]);

        if (dbError) throw dbError;
      }

      // Navigate to analytics with the file data
      navigate("/analytics", { state: { fileData: data } });
    } catch (error) {
      console.error("Error downloading Google Drive file:", error);
    }
  };

  const handleFileAccepted = (file: File) => {
    // In a real app, this would upload the file to a server
    console.log("File accepted:", file);
    // Navigate to analytics dashboard with the file
    navigate("/analytics");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50/30">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Datavisor AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">{user.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Welcome back, {user.name}!
          </h2>
          <p className="text-muted-foreground">
            What would you like to do today?
          </p>
        </div>

        {showUpload ? (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowUpload(false)}
              className="mb-4"
            >
              Back to Dashboard
            </Button>
            <FileUpload onFileAccepted={handleFileAccepted} />
          </div>
        ) : showGoogleDrive ? (
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => setShowGoogleDrive(false)}
              className="mb-4"
            >
              Back to Dashboard
            </Button>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Google Drive Files</h3>

              {isLoadingDrive ? (
                <div className="flex justify-center items-center h-40">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : googleDriveFiles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {googleDriveFiles.map((file) => (
                    <Card
                      key={file.id}
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        selectGoogleDriveFile(file.id, file.name, file.mimeType)
                      }
                    >
                      <CardContent className="p-4 flex items-center">
                        <FileIcon className="h-8 w-8 text-primary mr-3" />
                        <div>
                          <h4 className="font-medium">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {file.mimeType}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No files found or unable to access Google Drive
                  </p>
                  <Button onClick={connectGoogleAccount}>
                    Reconnect Google Account
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-4 shadow-inner">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload File</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a CSV or Excel file for instant analysis
                </p>
                <Button onClick={() => setShowUpload(true)} className="w-full">
                  Upload Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-4 shadow-inner">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Google Drive Files
                </h3>
                <p className="text-muted-foreground mb-4">
                  Access and analyze files directly from your Google Drive
                </p>
                <Button onClick={fetchGoogleDriveFiles} className="w-full">
                  Connect Google Drive
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/20 p-4 rounded-full mb-4 shadow-inner">
                  <FolderOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Manage Folders</h3>
                <p className="text-muted-foreground mb-4">
                  Organize your files into folders for better management
                </p>
                <Button
                  onClick={() => navigate("/folders")}
                  variant="outline"
                  className="w-full"
                >
                  Go to Folders
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
