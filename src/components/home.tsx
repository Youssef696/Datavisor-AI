import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Lightbulb,
  LineChart,
  PieChart,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-slate-900">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Datavisor AI</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Help</Button>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Data Analysis Made Simple for Everyone
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload your CSV or Excel files and get instant visual insights and
              AI-powered summaries. No technical skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => navigate("/register")}
              >
                Get Started <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="Data visualization"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm my-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent inline-block mx-auto">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-4 shadow-inner">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Data Upload</h3>
              <p className="text-muted-foreground">
                Simply drag and drop your CSV or Excel files into the upload
                area. Organize your files in folders for better management.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-4 shadow-inner">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Automatic Visualization
              </h3>
              <p className="text-muted-foreground">
                Get instant charts and graphs that best represent your data.
                Multiple visualization types available for deeper insights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/20 p-3 rounded-full mb-4 shadow-inner">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground">
                Receive intelligent summaries explaining key trends and findings
                in your data without needing technical expertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-inner">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up for free and get access to all features
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-inner">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Your Data</h3>
            <p className="text-muted-foreground">
              Upload CSV or Excel files to your secure account
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-inner">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Analysis</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your data and generates visualizations
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/20 p-4 rounded-full mb-4 w-16 h-16 flex items-center justify-center shadow-inner">
              <span className="text-xl font-bold text-primary">4</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Insights</h3>
            <p className="text-muted-foreground">
              Review AI-generated insights and export your analysis
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" onClick={() => navigate("/register")}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm my-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "Datavisor AI has transformed how we analyze our sales data. The
                visualizations are beautiful and the insights are spot on."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold">JD</span>
                </div>
                <div>
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-sm text-muted-foreground">
                    Sales Director
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "As someone with no data science background, this tool has been
                a game-changer for my marketing analytics."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold">MS</span>
                </div>
                <div>
                  <p className="font-semibold">Mike Smith</p>
                  <p className="text-sm text-muted-foreground">
                    Marketing Manager
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">
                "The folder organization and team sharing features make
                collaboration on data analysis so much easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold">AT</span>
                </div>
                <div>
                  <p className="font-semibold">Alex Thompson</p>
                  <p className="text-sm text-muted-foreground">
                    Project Manager
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="bg-gradient-to-r from-primary to-blue-700 text-primary-foreground">
          <CardContent className="pt-6 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already making data-driven
              decisions with Datavisor AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/register")}
              >
                Create Free Account
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-semibold">Datavisor AI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Datavisor AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
