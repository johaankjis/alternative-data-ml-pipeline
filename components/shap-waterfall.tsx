"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts"

interface ShapValue {
  feature: string
  value: number
  featureValue: string | number
}

interface ShapWaterfallProps {
  data: ShapValue[]
  baseValue: number
  prediction: number
}

export function ShapWaterfall({ data, baseValue, prediction }: ShapWaterfallProps) {
  const sortedData = [...data].sort((a, b) => Math.abs(b.value) - Math.abs(a.value))

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">SHAP Waterfall Plot</h3>
        <p className="text-sm text-muted-foreground">Individual prediction explanation</p>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Base Value</p>
          <p className="text-lg font-semibold text-foreground">{baseValue.toFixed(4)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Prediction</p>
          <p className="text-lg font-semibold text-foreground">{prediction.toFixed(4)}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Total Impact</p>
          <p className="text-lg font-semibold text-foreground">{(prediction - baseValue).toFixed(4)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
          <YAxis
            dataKey="feature"
            type="category"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 12 }}
            width={110}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value: number, name: string, props: any) => [
              `${value > 0 ? "+" : ""}${value.toFixed(4)}`,
              `Impact (value: ${props.payload.featureValue})`,
            ]}
          />
          <ReferenceLine x={0} stroke="hsl(var(--foreground))" strokeWidth={2} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value > 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
