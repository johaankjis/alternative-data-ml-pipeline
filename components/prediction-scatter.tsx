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

interface PredictionPoint {
  actual: number
  predicted: number
}

interface PredictionScatterProps {
  data: PredictionPoint[]
}

export function PredictionScatter({ data }: PredictionScatterProps) {
  const minValue = Math.min(...data.map((d) => Math.min(d.actual, d.predicted)))
  const maxValue = Math.max(...data.map((d) => Math.max(d.actual, d.predicted)))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Predicted vs Actual Values</h3>
        <p className="text-sm text-muted-foreground">Perfect predictions would fall on the diagonal line</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey="actual"
            name="Actual"
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Actual Values", position: "bottom", fill: "hsl(var(--foreground))" }}
            domain={[minValue, maxValue]}
          />
          <YAxis
            type="number"
            dataKey="predicted"
            name="Predicted"
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Predicted Values", angle: -90, position: "insideLeft", fill: "hsl(var(--foreground))" }}
            domain={[minValue, maxValue]}
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
          <ReferenceLine
            segment={[
              { x: minValue, y: minValue },
              { x: maxValue, y: maxValue },
            ]}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Scatter data={data} fill="hsl(var(--chart-1))" fillOpacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  )
}
