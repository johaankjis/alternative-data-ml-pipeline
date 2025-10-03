"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { ModelConfig, type TrainingConfig } from "@/components/model-config"
import { TrainingProgress } from "@/components/training-progress"
import type { Model } from "@/lib/types"

// Mock dataset columns
const mockColumns = ["date", "price", "volume", "sentiment_score", "category", "region", "web_traffic", "target_return"]

export default function TrainingPage() {
  const [models, setModels] = useState<Model[]>([])
  const [trainingProgress, setTrainingProgress] = useState<Record<string, number>>({})

  const handleTrain = (config: TrainingConfig) => {
    console.log("[v0] Starting training with config:", config)

    const newModel: Model = {
      id: String(models.length + 1),
      name: config.modelName,
      datasetId: "1",
      modelType: config.modelType,
      hyperparameters: config.hyperparameters,
      trainingDate: new Date(),
      status: "training",
    }

    setModels([...models, newModel])
    setTrainingProgress({ ...trainingProgress, [newModel.id]: 0 })

    // Simulate training progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setTrainingProgress((prev) => ({ ...prev, [newModel.id]: progress }))

      if (progress >= 100) {
        clearInterval(interval)

        // Update model with completed status and metrics
        setModels((prevModels) =>
          prevModels.map((m) =>
            m.id === newModel.id
              ? {
                  ...m,
                  status: "completed",
                  metrics: {
                    trainAccuracy: 0.85 + Math.random() * 0.1,
                    testAccuracy: 0.78 + Math.random() * 0.1,
                    trainRmse: 0.12 + Math.random() * 0.05,
                    testRmse: 0.15 + Math.random() * 0.05,
                    trainMae: 0.09 + Math.random() * 0.03,
                    testMae: 0.11 + Math.random() * 0.03,
                    r2Score: 0.72 + Math.random() * 0.1,
                    trainingTimeSeconds: Math.floor(30 + Math.random() * 60),
                  },
                }
              : m,
          ),
        )
      }
    }, 500)
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-2xl font-semibold text-foreground">Model Training</h1>
          <p className="mt-1 text-sm text-muted-foreground">Configure and train machine learning models</p>
        </div>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <ModelConfig datasetColumns={mockColumns} onTrain={handleTrain} />

            <div className="space-y-6">
              {models.length === 0 ? (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border p-12">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">No models trained yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">Configure and start training to see results</p>
                  </div>
                </div>
              ) : (
                models.map((model) => (
                  <TrainingProgress key={model.id} model={model} progress={trainingProgress[model.id]} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
