import React from "react";
import { motion } from "framer-motion";
import FileUpload from "./FileUpload";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Lightbulb,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Datavisor AI</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Help</Button>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Data Analysis Made Simple for Everyone
            </h2>
            <p className="text-xl text-muted-foreground">
              Upload your CSV or Excel files and get instant visual insights and
              AI-powered summaries. No technical skills required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
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

      {/* Upload Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upload Your Data</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag and drop your CSV or Excel file to get started with your data
            analysis
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FileUpload />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg my-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Data</h3>
              <p className="text-muted-foreground">
                Simply drag and drop your CSV or Excel files into the upload
                area
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Automatic Visualization
              </h3>
              <p className="text-muted-foreground">
                Get instant charts and graphs that best represent your data
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground">
                Receive intelligent summaries explaining key trends and findings
              </p>
            </CardContent>
          </Card>
        </div>
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
