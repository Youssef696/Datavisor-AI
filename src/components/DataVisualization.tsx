import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowDownToLine,
  ZoomIn,
  ZoomOut,
  Filter,
} from "lucide-react";

interface DataVisualizationProps {
  data?: any[];
  columns?: string[];
  chartTypes?: string[];
}

const DataVisualization = ({
  data = [
    { month: "Jan", sales: 100, expenses: 80 },
    { month: "Feb", sales: 120, expenses: 90 },
    { month: "Mar", sales: 150, expenses: 100 },
    { month: "Apr", sales: 130, expenses: 95 },
    { month: "May", sales: 180, expenses: 110 },
    { month: "Jun", sales: 200, expenses: 120 },
  ],
  columns = ["month", "sales", "expenses"],
  chartTypes = ["bar", "line", "pie"],
}: DataVisualizationProps) => {
  const [activeChart, setActiveChart] = useState("bar");
  const [xAxis, setXAxis] = useState(columns[0]);
  const [yAxis, setYAxis] = useState(columns[1]);
  const [zoomLevel, setZoomLevel] = useState([100]);

  // Placeholder for chart rendering - in a real implementation, this would use a charting library
  const renderChart = () => {
    switch (activeChart) {
      case "bar":
        return (
          <div className="h-64 bg-gradient-to-b from-blue-50/50 to-white rounded-lg shadow-inner flex items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart className="h-16 w-16 text-primary mb-4" />
              <p className="text-muted-foreground">Bar Chart Visualization</p>
              <p className="text-sm text-muted-foreground">
                X: {xAxis}, Y: {yAxis}
              </p>
            </div>
          </div>
        );
      case "line":
        return (
          <div className="h-64 bg-gradient-to-b from-blue-50/50 to-white rounded-lg shadow-inner flex items-center justify-center">
            <div className="flex flex-col items-center">
              <LineChart className="h-16 w-16 text-primary mb-4" />
              <p className="text-muted-foreground">Line Chart Visualization</p>
              <p className="text-sm text-muted-foreground">
                X: {xAxis}, Y: {yAxis}
              </p>
            </div>
          </div>
        );
      case "pie":
        return (
          <div className="h-64 bg-gradient-to-b from-blue-50/50 to-white rounded-lg shadow-inner flex items-center justify-center">
            <div className="flex flex-col items-center">
              <PieChart className="h-16 w-16 text-primary mb-4" />
              <p className="text-muted-foreground">Pie Chart Visualization</p>
              <p className="text-sm text-muted-foreground">
                Category: {xAxis}, Value: {yAxis}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-gradient-to-r from-white to-blue-50">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Data Visualization</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ZoomIn className="h-4 w-4 mr-2" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="h-4 w-4 mr-2" />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm">
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="bar"
          value={activeChart}
          onValueChange={setActiveChart}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="bar">
              <BarChart className="h-4 w-4 mr-2" />
              Bar Chart
            </TabsTrigger>
            <TabsTrigger value="line">
              <LineChart className="h-4 w-4 mr-2" />
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="pie">
              <PieChart className="h-4 w-4 mr-2" />
              Pie Chart
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">
                X-Axis / Category
              </label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select X-Axis" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Y-Axis / Value
              </label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Y-Axis" />
                </SelectTrigger>
                <SelectContent>
                  {columns
                    .filter((col) => col !== xAxis)
                    .map((column) => (
                      <SelectItem key={column} value={column}>
                        {column}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Zoom Level: {zoomLevel}%
              </label>
              <Slider
                value={zoomLevel}
                onValueChange={setZoomLevel}
                min={50}
                max={200}
                step={10}
              />
            </div>
          </div>

          <TabsContent value="bar">{renderChart()}</TabsContent>
          <TabsContent value="line">{renderChart()}</TabsContent>
          <TabsContent value="pie">{renderChart()}</TabsContent>
        </Tabs>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Showing {data.length} data points. Hover over the chart for more
            details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualization;
