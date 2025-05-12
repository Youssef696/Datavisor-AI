import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

interface AISummaryProps {
  summary?: string;
  insights?: {
    key: string;
    value: string;
    type: "positive" | "negative" | "neutral" | "warning";
  }[];
  isLoading?: boolean;
}

const AISummary = ({
  summary = "Based on the analysis of your data, we've identified several key insights. The dataset shows a normal distribution with some outliers in the upper range. There's a strong correlation between variables X and Y, suggesting a potential causal relationship. The time series data indicates a seasonal pattern with peaks occurring every quarter.",
  insights = [
    {
      key: "Strong correlation",
      value: "Variables X and Y (0.87)",
      type: "positive",
    },
    {
      key: "Outliers detected",
      value: "3 data points in upper range",
      type: "warning",
    },
    { key: "Missing values", value: "2.3% of dataset", type: "negative" },
    {
      key: "Seasonal pattern",
      value: "Quarterly peaks observed",
      type: "neutral",
    },
  ],
  isLoading = false,
}: AISummaryProps) => {
  return (
    <Card className="w-full bg-gradient-to-r from-white to-blue-50 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <span>AI-Generated Summary</span>
          {isLoading && (
            <Badge variant="outline" className="animate-pulse bg-muted">
              Analyzing...
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            <div className="h-4 bg-muted rounded animate-pulse w-11/12" />
            <div className="h-4 bg-muted rounded animate-pulse w-4/5" />
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-4">{summary}</p>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Key Insights:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-md border hover:shadow-sm transition-all duration-200"
                  >
                    {insight.type === "positive" && (
                      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    )}
                    {insight.type === "negative" && (
                      <TrendingDown className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    {insight.type === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                    {insight.type === "neutral" && (
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{insight.key}</p>
                      <p className="text-xs text-gray-500">{insight.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AISummary;
