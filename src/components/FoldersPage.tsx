import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  BarChart3,
  FolderPlus,
  Upload,
  File,
  MoreVertical,
  Folder,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FolderItem {
  id: string;
  name: string;
  type: "folder";
  items: (FolderItem | FileItem)[];
}

interface FileItem {
  id: string;
  name: string;
  type: "file";
  size: string;
  lastModified: string;
}

const FoldersPage = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderItem | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<FolderItem[]>([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Initialize with some mock folders and files
    const savedFolders = localStorage.getItem("folders");
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      const initialFolders: FolderItem[] = [
        {
          id: "1",
          name: "Sales Data",
          type: "folder",
          items: [
            {
              id: "101",
              name: "Q1_Sales.csv",
              type: "file",
              size: "1.2 MB",
              lastModified: "2023-03-15",
            },
            {
              id: "102",
              name: "Q2_Sales.csv",
              type: "file",
              size: "1.4 MB",
              lastModified: "2023-06-30",
            },
          ],
        },
        {
          id: "2",
          name: "Marketing",
          type: "folder",
          items: [
            {
              id: "201",
              name: "Campaign_Results.xlsx",
              type: "file",
              size: "2.3 MB",
              lastModified: "2023-05-22",
            },
          ],
        },
      ];
      setFolders(initialFolders);
      localStorage.setItem("folders", JSON.stringify(initialFolders));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigateToFolder = (folder: FolderItem) => {
    setCurrentFolder(folder);
    setBreadcrumbs([...breadcrumbs, folder]);
  };

  const navigateUp = () => {
    if (breadcrumbs.length > 0) {
      const newBreadcrumbs = [...breadcrumbs];
      newBreadcrumbs.pop();
      setBreadcrumbs(newBreadcrumbs);
      setCurrentFolder(
        newBreadcrumbs.length > 0
          ? newBreadcrumbs[newBreadcrumbs.length - 1]
          : null,
      );
    }
  };

  const createFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: "folder",
      items: [],
    };

    if (currentFolder) {
      // Add to current folder
      const updatedFolders = [...folders];
      const addToNestedFolder = (items: (FolderItem | FileItem)[]) => {
        return items.map((item) => {
          if (item.id === currentFolder.id && item.type === "folder") {
            return {
              ...item,
              items: [...item.items, newFolder],
            };
          } else if (item.type === "folder") {
            return {
              ...item,
              items: addToNestedFolder(item.items),
            };
          }
          return item;
        });
      };

      const result = addToNestedFolder(updatedFolders);
      setFolders(result);
      localStorage.setItem("folders", JSON.stringify(result));

      // Update current folder view
      setCurrentFolder({
        ...currentFolder,
        items: [...currentFolder.items, newFolder],
      });
    } else {
      // Add to root
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      localStorage.setItem("folders", JSON.stringify(updatedFolders));
    }

    setNewFolderName("");
    setIsCreateFolderOpen(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: "file" as const,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date(file.lastModified).toISOString().split("T")[0],
      }));

      if (currentFolder) {
        // Add to current folder
        const updatedFolders = [...folders];
        const addToNestedFolder = (items: (FolderItem | FileItem)[]) => {
          return items.map((item) => {
            if (item.id === currentFolder.id && item.type === "folder") {
              return {
                ...item,
                items: [...item.items, ...newFiles],
              };
            } else if (item.type === "folder") {
              return {
                ...item,
                items: addToNestedFolder(item.items),
              };
            }
            return item;
          });
        };

        const result = addToNestedFolder(updatedFolders);
        setFolders(result);
        localStorage.setItem("folders", JSON.stringify(result));

        // Update current folder view
        setCurrentFolder({
          ...currentFolder,
          items: [...currentFolder.items, ...newFiles],
        });
      } else {
        // Create a new folder for these files
        const newFolder: FolderItem = {
          id: Date.now().toString(),
          name: `Uploads ${new Date().toLocaleDateString()}`,
          type: "folder",
          items: newFiles,
        };

        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        localStorage.setItem("folders", JSON.stringify(updatedFolders));
      }

      setIsUploadOpen(false);
    },
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const analyzeItem = (item: FileItem | FolderItem) => {
    // In a real app, this would send the file/folder to the analytics engine
    console.log("Analyzing:", item);
    navigate("/analytics");
  };

  const displayItems = currentFolder ? currentFolder.items : folders;

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Datavisor AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          {user && <span className="text-muted-foreground">{user.email}</span>}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Folders</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto"
                onClick={() => {
                  setCurrentFolder(null);
                  setBreadcrumbs([]);
                }}
                disabled={breadcrumbs.length === 0}
              >
                Root
              </Button>
              {breadcrumbs.map((folder, index) => (
                <React.Fragment key={folder.id}>
                  <span className="mx-2">/</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() => {
                      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
                      setBreadcrumbs(newBreadcrumbs);
                      setCurrentFolder(folder);
                    }}
                    disabled={index === breadcrumbs.length - 1}
                  >
                    {folder.name}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {breadcrumbs.length > 0 && (
              <Button variant="outline" onClick={navigateUp}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <Button onClick={() => setIsCreateFolderOpen(true)}>
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        {displayItems.length === 0 ? (
          <Card className="w-full p-8 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">
                No items in this folder
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => setIsCreateFolderOpen(true)}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
                <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {item.type === "folder" ? (
                            <Folder className="h-5 w-5 text-primary" />
                          ) : (
                            <File className="h-5 w-5 text-muted-foreground" />
                          )}
                          {item.type === "folder" ? (
                            <Button
                              variant="link"
                              className="p-0 h-auto"
                              onClick={() =>
                                navigateToFolder(item as FolderItem)
                              }
                            >
                              {item.name}
                            </Button>
                          ) : (
                            <span>{item.name}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.type === "folder" ? "Folder" : "File"}
                      </TableCell>
                      <TableCell>
                        {item.type === "file" ? (item as FileItem).size : "--"}
                      </TableCell>
                      <TableCell>
                        {item.type === "file"
                          ? (item as FileItem).lastModified
                          : "--"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => analyzeItem(item)}>
                              Analyze
                            </DropdownMenuItem>
                            {/* Additional actions would go here */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Create Folder Dialog */}
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateFolderOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={createFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Files Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
          </DialogHeader>
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-8 cursor-pointer hover:border-primary transition-colors"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-medium">Drag & drop files here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: CSV, Excel (.csv, .xlsx, .xls)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoldersPage;
