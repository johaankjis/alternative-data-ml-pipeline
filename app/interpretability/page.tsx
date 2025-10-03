"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { FeatureImportanceChart } from "@/components/feature-importance-chart"
import { ShapWaterfall } from "@/components/shap-waterfall"
import { ShapSummary } from "@/components/shap-summary"
import { PartialDependence } from "@/components/partial-dependence"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { FeatureImportance } from "@/lib/types"

// Mock data
const mockFeatureImportance: FeatureImportance[] = [
  { featureName: "sentiment_score", importanceScore: 0.4523, importanceType: "gain" },
  { featureName: "volume", importanceScore: 0.3012, importanceType: "gain" },
  { featureName: "price", importanceScore: 0.2465, importanceType: "gain" },
  { featureName: "web_traffic", importanceScore: 0.1823, importanceType: "gain" },
  { featureName: "region", importanceScore: 0.0987, importanceType: "gain" },
  { featureName: "category", importanceScore: 0.0654, importanceType: "gain" },
]

const mockShapWaterfall = {
  baseValue: 0.0234,
  prediction: 0.0456,
  values: [
    { feature: "sentiment_score", value: 0.0145, featureValue: 0.72 },
    { feature: "volume", value: 0.0089, featureValue: 45000 },
    { feature: "price", value: -0.0034, featureValue: 125.43 },
    { feature: "web_traffic", value: 0.0067, featureValue: 12500 },
    { feature: "region", value: -0.0023, featureValue: "US" },
    { feature: "category", value: -0.0012, featureValue: "Tech" },
  ],
}

const mockShapSummary = [
  { feature: "sentiment_score", shapValue: 0.0145, featureValue: 0.72 },
  { feature: "sentiment_score", shapValue: 0.0123, featureValue: 0.68 },
  { feature: "sentiment_score", shapValue: -0.0098, featureValue: 0.45 },
  { feature: "sentiment_score", shapValue: 0.0167, featureValue: 0.85 },
  { feature: "volume", shapValue: 0.0089, featureValue: 45000 },
  { feature: "volume", shapValue: 0.0112, featureValue: 52000 },
  { feature: "volume", shapValue: -0.0045, featureValue: 32000 },
  { feature: "volume", shapValue: 0.0134, featureValue: 58000 },
  { feature: "price", shapValue: -0.0034, featureValue: 125.43 },
  { feature: "price", shapValue: 0.0056, featureValue: 132.12 },
  { feature: "price", shapValue: -0.0067, featureValue: 118.89 },
  { feature: "price", shapValue: 0.0078, featureValue: 138.45 },
  { feature: "web_traffic", shapValue: 0.0067, featureValue: 12500 },
  { feature: "web_traffic", shapValue: 0.0089, featureValue: 15200 },
  { feature: "web_traffic", shapValue: -0.0034, featureValue: 9800 },
  { feature: "web_traffic", shapValue: 0.0098, featureValue: 16500 },
]

const mockPartialDependence = [
  { featureValue: 0.1, prediction: 0.012 },
  { featureValue: 0.2, prediction: 0.018 },
  { featureValue: 0.3, prediction: 0.023 },
  { featureValue: 0.4, prediction: 0.028 },
  { featureValue: 0.5, prediction: 0.032 },
  { featureValue: 0.6, prediction: 0.037 },
  { featureValue: 0.7, prediction: 0.043 },
  { featureValue: 0.8, prediction: 0.048 },
  { featureValue: 0.9, prediction: 0.052 },
  { featureValue: 1.0, prediction: 0.055 },
]

export default function InterpretabilityPage() {
  const [selectedModel, setSelectedModel] = useState("model-1")
  const [selectedFeature, setSelectedFeature] = useState("sentiment_score")

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-2xl font-semibold text-foreground">Model Interpretability</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Understand model predictions with SHAP values and feature importance
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6 flex gap-4">
            <div className="w-64">
              <Label htmlFor="model-select">Select Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="model-1">XGBoost Baseline</SelectItem>
                  <SelectItem value="model-2">Random Forest v1</SelectItem>
                  <SelectItem value="model-3">XGBoost Tuned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-64">
              <Label htmlFor="feature-select">Feature for PDP</Label>
              <Select value={selectedFeature} onValueChange={setSelectedFeature}>
                <SelectTrigger id="feature-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sentiment_score">sentiment_score</SelectItem>
                  <SelectItem value="volume">volume</SelectItem>
                  <SelectItem value="price">price</SelectItem>
                  <SelectItem value="web_traffic">web_traffic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <FeatureImportanceChart data={mockFeatureImportance} />
              <ShapWaterfall
                data={mockShapWaterfall.values}
                baseValue={mockShapWaterfall.baseValue}
                prediction={mockShapWaterfall.prediction}
              />
            </div>

            <ShapSummary data={mockShapSummary} />

            <PartialDependence data={mockPartialDependence} featureName={selectedFeature} />
          </div>
        </div>
      </main>
    </div>
  )
}
