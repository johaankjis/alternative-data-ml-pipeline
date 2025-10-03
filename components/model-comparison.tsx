"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import type { Model } from "@/lib/types"

interface ModelComparisonProps {
  models: Model[]
}

export function ModelComparison({ models }: ModelComparisonProps) {
  const sortedModels = [...models]
    .filter((m) => m.metrics)
    .sort((a, b) => (b.metrics?.testAccuracy || 0) - (a.metrics?.testAccuracy || 0))

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Model Leaderboard</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Test Accuracy</TableHead>
              <TableHead>RMSE</TableHead>
              <TableHead>R² Score</TableHead>
              <TableHead>Training Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModels.map((model, idx) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">#{idx + 1}</TableCell>
                <TableCell className="font-medium">{model.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{model.modelType}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{((model.metrics?.testAccuracy || 0) * 100).toFixed(2)}%</span>
                    {idx === 0 && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                  </div>
                </TableCell>
                <TableCell className="font-mono">{model.metrics?.testRmse.toFixed(4)}</TableCell>
                <TableCell className="font-mono">{model.metrics?.r2Score.toFixed(4)}</TableCell>
                <TableCell>{model.metrics?.trainingTimeSeconds}s</TableCell>
                <TableCell>
                  <Badge variant={model.status === "completed" ? "default" : "secondary"}>{model.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
