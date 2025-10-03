"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface MetricsDataPoint {
  epoch: number
  trainLoss: number
  testLoss: number
  trainAccuracy: number
  testAccuracy: number
}

interface MetricsOverTimeProps {
  data: MetricsDataPoint[]
}

export function MetricsOverTime({ data }: MetricsOverTimeProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Training Metrics Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="epoch" stroke="hsl(var(--muted-foreground))" label={{ value: "Epoch", position: "bottom" }} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Accuracy", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="trainAccuracy"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            name="Train Accuracy"
          />
          <Line
            type="monotone"
            dataKey="testAccuracy"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            name="Test Accuracy"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
