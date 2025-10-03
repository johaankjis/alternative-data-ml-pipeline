"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ModelConfigProps {
  datasetColumns: string[]
  onTrain: (config: TrainingConfig) => void
}

export interface TrainingConfig {
  modelName: string
  modelType: "xgboost" | "random_forest" | "linear"
  features: string[]
  target: string
  hyperparameters: {
    maxDepth: number
    learningRate: number
    nEstimators: number
    subsample: number
  }
  testSize: number
}

export function ModelConfig({ datasetColumns, onTrain }: ModelConfigProps) {
  const [config, setConfig] = useState<TrainingConfig>({
    modelName: "XGBoost Model",
    modelType: "xgboost",
    features: [],
    target: "",
    hyperparameters: {
      maxDepth: 6,
      learningRate: 0.1,
      nEstimators: 100,
      subsample: 0.8,
    },
    testSize: 0.2,
  })

  const addFeature = (feature: string) => {
    if (!config.features.includes(feature) && feature !== config.target) {
      setConfig({ ...config, features: [...config.features, feature] })
    }
  }

  const removeFeature = (feature: string) => {
    setConfig({
      ...config,
      features: config.features.filter((f) => f !== feature),
    })
  }

  const availableColumns = datasetColumns.filter((col) => !config.features.includes(col) && col !== config.target)

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Model Configuration</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="model-name">Model Name</Label>
          <Input
            id="model-name"
            value={config.modelName}
            onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
            placeholder="e.g., XGBoost Baseline"
          />
        </div>

        <div>
          <Label htmlFor="model-type">Model Type</Label>
          <Select value={config.modelType} onValueChange={(value: any) => setConfig({ ...config, modelType: value })}>
            <SelectTrigger id="model-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xgboost">XGBoost</SelectItem>
              <SelectItem value="random_forest">Random Forest</SelectItem>
              <SelectItem value="linear">Linear Regression</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="target">Target Variable</Label>
          <Select value={config.target} onValueChange={(value) => setConfig({ ...config, target: value })}>
            <SelectTrigger id="target">
              <SelectValue placeholder="Select target variable" />
            </SelectTrigger>
            <SelectContent>
              {datasetColumns.map((col) => (
                <SelectItem key={col} value={col}>
                  {col}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Features</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {config.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                {feature}
                <button onClick={() => removeFeature(feature)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          {availableColumns.length > 0 && (
            <Select onValueChange={addFeature}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add feature" />
              </SelectTrigger>
              <SelectContent>
                {availableColumns.map((col) => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-foreground">Hyperparameters</h3>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Max Depth</Label>
              <span className="text-sm text-muted-foreground">{config.hyperparameters.maxDepth}</span>
            </div>
            <Slider
              value={[config.hyperparameters.maxDepth]}
              onValueChange={([value]) =>
                setConfig({
                  ...config,
                  hyperparameters: { ...config.hyperparameters, maxDepth: value },
                })
              }
              min={1}
              max={20}
              step={1}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Learning Rate</Label>
              <span className="text-sm text-muted-foreground">{config.hyperparameters.learningRate}</span>
            </div>
            <Slider
              value={[config.hyperparameters.learningRate * 100]}
              onValueChange={([value]) =>
                setConfig({
                  ...config,
                  hyperparameters: {
                    ...config.hyperparameters,
                    learningRate: value / 100,
                  },
                })
              }
              min={1}
              max={50}
              step={1}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>N Estimators</Label>
              <span className="text-sm text-muted-foreground">{config.hyperparameters.nEstimators}</span>
            </div>
            <Slider
              value={[config.hyperparameters.nEstimators]}
              onValueChange={([value]) =>
                setConfig({
                  ...config,
                  hyperparameters: {
                    ...config.hyperparameters,
                    nEstimators: value,
                  },
                })
              }
              min={10}
              max={500}
              step={10}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <Label>Subsample</Label>
              <span className="text-sm text-muted-foreground">{config.hyperparameters.subsample}</span>
            </div>
            <Slider
              value={[config.hyperparameters.subsample * 100]}
              onValueChange={([value]) =>
                setConfig({
                  ...config,
                  hyperparameters: {
                    ...config.hyperparameters,
                    subsample: value / 100,
                  },
                })
              }
              min={50}
              max={100}
              step={5}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Test Size</Label>
            <span className="text-sm text-muted-foreground">{(config.testSize * 100).toFixed(0)}%</span>
          </div>
          <Slider
            value={[config.testSize * 100]}
            onValueChange={([value]) => setConfig({ ...config, testSize: value / 100 })}
            min={10}
            max={40}
            step={5}
          />
        </div>

        <Button
          onClick={() => onTrain(config)}
          disabled={config.features.length === 0 || !config.target}
          className="w-full"
        >
          Start Training
        </Button>
      </div>
    </Card>
  )
}
