"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PartialDependencePoint {
  featureValue: number
  prediction: number
}

interface PartialDependenceProps {
  data: PartialDependencePoint[]
  featureName: string
}

export function PartialDependence({ data, featureName }: PartialDependenceProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Partial Dependence Plot</h3>
        <p className="text-sm text-muted-foreground">Effect of {featureName} on predictions</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="featureValue"
            stroke="hsl(var(--muted-foreground))"
            label={{ value: featureName, position: "bottom", fill: "hsl(var(--foreground))" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "Predicted Value", angle: -90, position: "insideLeft", fill: "hsl(var(--foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number) => [value.toFixed(4), "Prediction"]}
          />
          <Line type="monotone" dataKey="prediction" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
