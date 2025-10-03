"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface DataUploadProps {
  onUpload: (file: File, name: string, description: string) => void
}

export function DataUpload({ onUpload }: DataUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile && droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile)
        if (!name) setName(droppedFile.name.replace(".csv", ""))
      }
    },
    [name],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!name) setName(selectedFile.name.replace(".csv", ""))
    }
  }

  const handleSubmit = () => {
    if (file && name) {
      onUpload(file, name, description)
      setFile(null)
      setName("")
      setDescription("")
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Upload Dataset</h2>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`mb-6 flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"
        }`}
      >
        {file ? (
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-foreground">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium text-foreground">Drop CSV file here or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports CSV files up to 100MB</p>
            <Input type="file" accept=".csv" onChange={handleFileChange} className="mt-4 max-w-xs" />
          </>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="dataset-name">Dataset Name</Label>
          <Input
            id="dataset-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Alternative Data Q1 2024"
          />
        </div>

        <div>
          <Label htmlFor="dataset-description">Description (Optional)</Label>
          <Textarea
            id="dataset-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the dataset, source, and any relevant context..."
            rows={3}
          />
        </div>

        <Button onClick={handleSubmit} disabled={!file || !name} className="w-full">
          Upload and Process
        </Button>
      </div>
    </Card>
  )
}
