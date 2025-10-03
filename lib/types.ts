export interface Dataset {
  id: string
  name: string
  description: string
  rowCount: number
  columnCount: number
  uploadDate: Date
  status: "active" | "processing" | "error"
  columns: DataColumn[]
  preview?: Record<string, any>[]
}

export interface DataColumn {
  name: string
  type: "numeric" | "categorical" | "datetime" | "text"
  nullCount: number
  uniqueCount: number
  stats?: ColumnStats
}

export interface ColumnStats {
  mean?: number
  median?: number
  std?: number
  min?: number
  max?: number
  mode?: string | number
}

export interface Model {
  id: string
  name: string
  datasetId: string
  modelType: "xgboost" | "random_forest" | "linear"
  hyperparameters: Record<string, any>
  trainingDate: Date
  status: "training" | "completed" | "failed"
  metrics?: ModelMetrics
}

export interface ModelMetrics {
  trainAccuracy: number
  testAccuracy: number
  trainRmse: number
  testRmse: number
  trainMae: number
  testMae: number
  r2Score: number
  trainingTimeSeconds: number
}

export interface FeatureImportance {
  featureName: string
  importanceScore: number
  importanceType: "gain" | "weight" | "cover" | "shap"
}
