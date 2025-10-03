"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Dataset } from "@/lib/types"

interface DataPreviewProps {
  dataset: Dataset
}

export function DataPreview({ dataset }: DataPreviewProps) {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{dataset.name}</h2>
          <p className="text-sm text-muted-foreground">{dataset.description}</p>
        </div>
        <Badge variant={dataset.status === "active" ? "default" : "secondary"}>{dataset.status}</Badge>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Rows</p>
          <p className="text-2xl font-semibold text-foreground">{dataset.rowCount.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Columns</p>
          <p className="text-2xl font-semibold text-foreground">{dataset.columnCount}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Upload Date</p>
          <p className="text-sm font-medium text-foreground">{dataset.uploadDate.toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-foreground">Column Information</h3>
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Null Count</TableHead>
                <TableHead>Unique Values</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataset.columns.map((column) => (
                <TableRow key={column.name}>
                  <TableCell className="font-mono text-sm">{column.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{column.type}</Badge>
                  </TableCell>
                  <TableCell>{column.nullCount}</TableCell>
                  <TableCell>{column.uniqueCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {dataset.preview && dataset.preview.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-foreground">Data Preview (First 5 Rows)</h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(dataset.preview[0]).map((key) => (
                    <TableHead key={key} className="font-mono text-xs">
                      {key}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataset.preview.map((row, idx) => (
                  <TableRow key={idx}>
                    {Object.values(row).map((value, cellIdx) => (
                      <TableCell key={cellIdx} className="font-mono text-xs">
                        {String(value)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </Card>
  )
}
