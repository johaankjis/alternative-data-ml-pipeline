"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { FeatureImportance } from "@/lib/types"

interface FeatureImportanceChartProps {
  data: FeatureImportance[]
  title?: string
}

export function FeatureImportanceChart({ data, title = "Feature Importance" }: FeatureImportanceChartProps) {
  const sortedData = [...data].sort((a, b) => b.importanceScore - a.importanceScore)

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
          <YAxis dataKey="featureName" type="category" stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Bar dataKey="importanceScore" radius={[0, 4, 4, 0]}>
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
