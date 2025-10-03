"use client"

import { Card } from "@/components/ui/card"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

interface ResidualPoint {
  predicted: number
  residual: number
}

interface ResidualAnalysisProps {
  data: ResidualPoint[]
}

export function ResidualAnalysis({ data }: ResidualAnalysisProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Residual Plot</h3>
        <p className="text-sm text-muted-foreground">Residuals should be randomly distributed around zero</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey="predicted"
            name="Predicted"
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Predicted Values", position: "bottom", fill: "hsl(var(--foreground))" }}
          />
          <YAxis
            type="number"
            dataKey="residual"
            name="Residual"
            stroke="hsl(var(--muted-foreground))"
            label={{
              value: "Residuals (Actual - Predicted)",
              angle: -90,
              position: "insideLeft",
              fill: "hsl(var(--foreground))",
            }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number, name: string) => [value.toFixed(4), name]}
          />
          <ReferenceLine y={0} stroke="hsl(var(--primary))" strokeWidth={2} />
          <Scatter data={data} fill="hsl(var(--chart-2))" fillOpacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  )
}
