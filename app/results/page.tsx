"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { ModelComparison } from "@/components/model-comparison"
import { MetricsOverTime } from "@/components/metrics-over-time"
import { PredictionScatter } from "@/components/prediction-scatter"
import { ResidualAnalysis } from "@/components/residual-analysis"
import { MetricsSummary } from "@/components/metrics-summary"
import type { Model } from "@/lib/types"

// Mock data
const mockModels: Model[] = [
  {
    id: "1",
    name: "XGBoost Baseline",
    datasetId: "1",
    modelType: "xgboost",
    hyperparameters: { maxDepth: 6, learningRate: 0.1, nEstimators: 100, subsample: 0.8 },
    trainingDate: new Date("2024-01-15"),
    status: "completed",
    metrics: {
      trainAccuracy: 0.8542,
      testAccuracy: 0.7823,
      trainRmse: 0.1234,
      testRmse: 0.1567,
      trainMae: 0.0923,
      testMae: 0.1145,
      r2Score: 0.7234,
      trainingTimeSeconds: 45,
    },
  },
  {
    id: "2",
    name: "XGBoost Tuned",
    datasetId: "1",
    modelType: "xgboost",
    hyperparameters: { maxDepth: 8, learningRate: 0.05, nEstimators: 200, subsample: 0.9 },
    trainingDate: new Date("2024-01-16"),
    status: "completed",
    metrics: {
      trainAccuracy: 0.8923,
      testAccuracy: 0.8156,
      trainRmse: 0.1089,
      testRmse: 0.1423,
      trainMae: 0.0812,
      testMae: 0.1067,
      r2Score: 0.7689,
      trainingTimeSeconds: 78,
    },
  },
  {
    id: "3",
    name: "Random Forest v1",
    datasetId: "1",
    modelType: "random_forest",
    hyperparameters: { maxDepth: 10, nEstimators: 150 },
    trainingDate: new Date("2024-01-17"),
    status: "completed",
    metrics: {
      trainAccuracy: 0.8734,
      testAccuracy: 0.7945,
      trainRmse: 0.1156,
      testRmse: 0.1489,
      trainMae: 0.0867,
      testMae: 0.1123,
      r2Score: 0.7456,
      trainingTimeSeconds: 62,
    },
  },
]

const mockMetricsOverTime = [
  { epoch: 1, trainLoss: 0.45, testLoss: 0.52, trainAccuracy: 0.65, testAccuracy: 0.62 },
  { epoch: 2, trainLoss: 0.38, testLoss: 0.46, trainAccuracy: 0.72, testAccuracy: 0.69 },
  { epoch: 3, trainLoss: 0.32, testLoss: 0.41, trainAccuracy: 0.78, testAccuracy: 0.74 },
  { epoch: 4, trainLoss: 0.28, testLoss: 0.38, trainAccuracy: 0.82, testAccuracy: 0.77 },
  { epoch: 5, trainLoss: 0.24, testLoss: 0.36, trainAccuracy: 0.85, testAccuracy: 0.79 },
  { epoch: 6, trainLoss: 0.21, testLoss: 0.35, trainAccuracy: 0.87, testAccuracy: 0.8 },
  { epoch: 7, trainLoss: 0.19, testLoss: 0.34, trainAccuracy: 0.89, testAccuracy: 0.81 },
  { epoch: 8, trainLoss: 0.17, testLoss: 0.34, trainAccuracy: 0.9, testAccuracy: 0.81 },
]

const mockPredictions = Array.from({ length: 100 }, () => {
  const actual = Math.random() * 0.1 - 0.05
  const noise = (Math.random() - 0.5) * 0.02
  return {
    actual,
    predicted: actual + noise,
  }
})

const mockResiduals = mockPredictions.map((p) => ({
  predicted: p.predicted,
  residual: p.actual - p.predicted,
}))

export default function ResultsPage() {
  const bestAccuracy = Math.max(...mockModels.map((m) => m.metrics?.testAccuracy || 0))
  const avgAccuracy = mockModels.reduce((sum, m) => sum + (m.metrics?.testAccuracy || 0), 0) / mockModels.length
  const avgTrainingTime =
    mockModels.reduce((sum, m) => sum + (m.metrics?.trainingTimeSeconds || 0), 0) / mockModels.length

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-2xl font-semibold text-foreground">Results & Metrics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Compare model performance and analyze predictions</p>
        </div>

        <div className="space-y-6 p-8">
          <MetricsSummary
            bestAccuracy={bestAccuracy}
            avgAccuracy={avgAccuracy}
            totalModels={mockModels.length}
            avgTrainingTime={Math.round(avgTrainingTime)}
          />

          <ModelComparison models={mockModels} />

          <div className="grid gap-6 lg:grid-cols-2">
            <MetricsOverTime data={mockMetricsOverTime} />
            <PredictionScatter data={mockPredictions} />
          </div>

          <ResidualAnalysis data={mockResiduals} />
        </div>
      </main>
    </div>
  )
}
