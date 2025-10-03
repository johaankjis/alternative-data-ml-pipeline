"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"

interface MetricsSummaryProps {
  bestAccuracy: number
  avgAccuracy: number
  totalModels: number
  avgTrainingTime: number
}

export function MetricsSummary({ bestAccuracy, avgAccuracy, totalModels, avgTrainingTime }: MetricsSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Best Accuracy</p>
            <p className="text-2xl font-semibold text-foreground">{(bestAccuracy * 100).toFixed(2)}%</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Accuracy</p>
            <p className="text-2xl font-semibold text-foreground">{(avgAccuracy * 100).toFixed(2)}%</p>
          </div>
          <Activity className="h-8 w-8 text-primary" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Models</p>
            <p className="text-2xl font-semibold text-foreground">{totalModels}</p>
          </div>
          <TrendingDown className="h-8 w-8 text-accent" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Training Time</p>
            <p className="text-2xl font-semibold text-foreground">{avgTrainingTime}s</p>
          </div>
          <Clock className="h-8 w-8 text-muted-foreground" />
        </div>
      </Card>
    </div>
  )
}
