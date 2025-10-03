"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { Model } from "@/lib/types"

interface TrainingProgressProps {
  model: Model
  progress?: number
}

export function TrainingProgress({ model, progress = 0 }: TrainingProgressProps) {
  const getStatusIcon = () => {
    switch (model.status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "training":
        return <Clock className="h-5 w-5 text-primary" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-destructive" />
    }
  }

  const getStatusColor = () => {
    switch (model.status) {
      case "completed":
        return "default"
      case "training":
        return "secondary"
      case "failed":
        return "destructive"
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-foreground">{model.name}</h3>
            <p className="text-sm text-muted-foreground">{model.modelType.toUpperCase()}</p>
          </div>
        </div>
        <Badge variant={getStatusColor()}>{model.status}</Badge>
      </div>

      {model.status === "training" && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Training Progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      {model.metrics && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Train Accuracy</p>
              <p className="text-lg font-semibold text-foreground">{(model.metrics.trainAccuracy * 100).toFixed(2)}%</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">Test Accuracy</p>
              <p className="text-lg font-semibold text-foreground">{(model.metrics.testAccuracy * 100).toFixed(2)}%</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">RMSE</p>
              <p className="text-lg font-semibold text-foreground">{model.metrics.testRmse.toFixed(4)}</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">R² Score</p>
              <p className="text-lg font-semibold text-foreground">{model.metrics.r2Score.toFixed(4)}</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Training Time</p>
            <p className="text-sm font-medium text-foreground">{model.metrics.trainingTimeSeconds}s</p>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-lg bg-muted/30 p-3">
        <p className="mb-2 text-xs font-medium text-foreground">Hyperparameters</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(model.hyperparameters).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-muted-foreground">{key}:</span>
              <span className="font-mono text-foreground">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
