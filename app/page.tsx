"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { DataUpload } from "@/components/data-upload"
import { DataPreview } from "@/components/data-preview"
import type { Dataset } from "@/lib/types"

// Mock data for demonstration
const mockDataset: Dataset = {
  id: "1",
  name: "Alternative Data Sample",
  description: "Sample alternative data for predictive modeling",
  rowCount: 1000,
  columnCount: 8,
  uploadDate: new Date(),
  status: "active",
  columns: [
    { name: "date", type: "datetime", nullCount: 0, uniqueCount: 365 },
    { name: "price", type: "numeric", nullCount: 5, uniqueCount: 987 },
    { name: "volume", type: "numeric", nullCount: 3, uniqueCount: 945 },
    { name: "sentiment_score", type: "numeric", nullCount: 12, uniqueCount: 234 },
    { name: "category", type: "categorical", nullCount: 0, uniqueCount: 5 },
    { name: "region", type: "categorical", nullCount: 2, uniqueCount: 10 },
    { name: "web_traffic", type: "numeric", nullCount: 8, uniqueCount: 876 },
    { name: "target_return", type: "numeric", nullCount: 0, uniqueCount: 998 },
  ],
  preview: [
    {
      date: "2024-01-01",
      price: 125.43,
      volume: 45000,
      sentiment_score: 0.72,
      category: "Tech",
      region: "US",
      web_traffic: 12500,
      target_return: 0.023,
    },
    {
      date: "2024-01-02",
      price: 126.12,
      volume: 48000,
      sentiment_score: 0.68,
      category: "Tech",
      region: "US",
      web_traffic: 13200,
      target_return: 0.015,
    },
    {
      date: "2024-01-03",
      price: 124.89,
      volume: 42000,
      sentiment_score: 0.65,
      category: "Finance",
      region: "EU",
      web_traffic: 11800,
      target_return: -0.008,
    },
    {
      date: "2024-01-04",
      price: 127.34,
      volume: 51000,
      sentiment_score: 0.78,
      category: "Tech",
      region: "APAC",
      web_traffic: 14500,
      target_return: 0.031,
    },
    {
      date: "2024-01-05",
      price: 126.78,
      volume: 47500,
      sentiment_score: 0.71,
      category: "Healthcare",
      region: "US",
      web_traffic: 13000,
      target_return: 0.019,
    },
  ],
}

export default function DataIngestionPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([mockDataset])
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(mockDataset)

  const handleUpload = (file: File, name: string, description: string) => {
    // In a real app, this would parse the CSV and send to backend
    console.log("[v0] Uploading file:", file.name, name, description)

    // Mock dataset creation
    const newDataset: Dataset = {
      id: String(datasets.length + 1),
      name,
      description,
      rowCount: 500,
      columnCount: 6,
      uploadDate: new Date(),
      status: "active",
      columns: [
        { name: "feature_1", type: "numeric", nullCount: 0, uniqueCount: 450 },
        { name: "feature_2", type: "numeric", nullCount: 2, uniqueCount: 480 },
        { name: "feature_3", type: "categorical", nullCount: 0, uniqueCount: 8 },
        { name: "feature_4", type: "numeric", nullCount: 5, uniqueCount: 495 },
        { name: "feature_5", type: "datetime", nullCount: 0, uniqueCount: 365 },
        { name: "target", type: "numeric", nullCount: 0, uniqueCount: 498 },
      ],
      preview: [],
    }

    setDatasets([...datasets, newDataset])
    setSelectedDataset(newDataset)
  }

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-2xl font-semibold text-foreground">Data Ingestion</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload and manage datasets for ML pipeline</p>
        </div>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <DataUpload onUpload={handleUpload} />
            {selectedDataset && <DataPreview dataset={selectedDataset} />}
          </div>
        </div>
      </main>
    </div>
  )
}
