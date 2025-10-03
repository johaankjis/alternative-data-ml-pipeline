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

interface ShapSummaryPoint {
  feature: string
  shapValue: number
  featureValue: number
}

interface ShapSummaryProps {
  data: ShapSummaryPoint[]
}

export function ShapSummary({ data }: ShapSummaryProps) {
  // Group by feature
  const features = Array.from(new Set(data.map((d) => d.feature)))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">SHAP Summary Plot</h3>
        <p className="text-sm text-muted-foreground">Feature impact distribution across all predictions</p>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey="shapValue"
            name="SHAP Value"
            stroke="hsl(var(--muted-foreground))"
            label={{ value: "SHAP Value (impact on model output)", position: "bottom", fill: "hsl(var(--foreground))" }}
          />
          <YAxis
            type="category"
            dataKey="feature"
            name="Feature"
            stroke="hsl(var(--muted-foreground))"
            width={90}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number, name: string, props: any) => [
              `SHAP: ${value.toFixed(4)}, Value: ${props.payload.featureValue.toFixed(2)}`,
              props.payload.feature,
            ]}
          />
          <ReferenceLine x={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
          {features.map((feature, idx) => (
            <Scatter
              key={feature}
              data={data.filter((d) => d.feature === feature)}
              fill={`hsl(var(--chart-${(idx % 5) + 1}))`}
              fillOpacity={0.6}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  )
}
