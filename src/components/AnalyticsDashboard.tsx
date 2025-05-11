import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileDown,
  PieChart,
  BarChart,
  LineChart,
  Info,
  ArrowLeft,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DataVisualization from "./DataVisualization";
import AISummary from "./AISummary";

interface AnalyticsDashboardProps {
  fileName?: string;
  data?: any;
  isLoading?: boolean;
}

const AnalyticsDashboard = ({
  fileName = "sample_data.csv",
  data = {
    columns: ["Category", "Sales", "Profit", "Date"],
    rows: 120,
    summary: {
      numeric: 2,
      categorical: 1,
      temporal: 1,
    },
  },
  isLoading = false,
}: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Mock data for visualizations
  const mockChartData = {
    histogram: {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [12000, 19000, 15000, 22000],
    },
    pieChart: {
      labels: ["Electronics", "Furniture", "Office Supplies", "Clothing"],
      values: [35, 25, 20, 20],
    },
    lineChart: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      values: [5000, 7500, 6800, 9200, 10500, 11200],
    },
  };

  const handleExport = (format: "pdf" | "html") => {
    // This would be implemented with actual export functionality
    console.log(`Exporting as ${format}...`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Analyzing your data...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 space-y-6 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Analyzing: {fileName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("html")}>
            <FileDown className="mr-2 h-4 w-4" />
            Export HTML
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Summary</CardTitle>
          <CardDescription>
            Overview of your dataset containing {data.rows} rows and{" "}
            {data.columns.length} columns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Numeric Columns
              </p>
              <p className="text-2xl font-bold">{data.summary.numeric}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Categorical Columns
              </p>
              <p className="text-2xl font-bold">{data.summary.categorical}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                Temporal Columns
              </p>
              <p className="text-2xl font-bold">{data.summary.temporal}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="histogram">
            <BarChart className="h-4 w-4 mr-2" />
            Histogram
          </TabsTrigger>
          <TabsTrigger value="pie">
            <PieChart className="h-4 w-4 mr-2" />
            Pie Chart
          </TabsTrigger>
          <TabsTrigger value="line">
            <LineChart className="h-4 w-4 mr-2" />
            Line Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AISummary />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      {data.columns.map((column: string, index: number) => (
                        <th key={index} className="p-2 text-left border">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sample data rows - in a real app, these would come from the actual data */}
                    <tr>
                      <td className="p-2 border">Electronics</td>
                      <td className="p-2 border">5200</td>
                      <td className="p-2 border">1200</td>
                      <td className="p-2 border">2023-01-15</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Furniture</td>
                      <td className="p-2 border">3800</td>
                      <td className="p-2 border">950</td>
                      <td className="p-2 border">2023-01-22</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">Office Supplies</td>
                      <td className="p-2 border">2100</td>
                      <td className="p-2 border">420</td>
                      <td className="p-2 border">2023-01-30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Showing 3 of {data.rows} rows
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="histogram" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Distribution</CardTitle>
              <CardDescription>
                Histogram showing sales distribution by quarter
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DataVisualization
                type="histogram"
                data={mockChartData.histogram}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                Pie chart showing sales distribution by product category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DataVisualization type="pie" data={mockChartData.pieChart} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>
                Line chart showing sales trend over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <DataVisualization type="line" data={mockChartData.lineChart} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
