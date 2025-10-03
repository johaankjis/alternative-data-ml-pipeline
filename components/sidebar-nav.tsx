"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, LineChart, Brain, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Data Ingestion",
    href: "/",
    icon: Database,
  },
  {
    title: "Model Training",
    href: "/training",
    icon: Brain,
  },
  {
    title: "Interpretability",
    href: "/interpretability",
    icon: LineChart,
  },
  {
    title: "Results",
    href: "/results",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="font-mono text-lg font-semibold text-foreground">ML Pipeline</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">Alternative Data ML Pipeline v1.0</p>
      </div>
    </div>
  )
}
