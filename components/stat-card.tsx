import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, description }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-secondary",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground",
              )}
            >
              {change}
            </p>
          )}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            changeType === "positive" && "bg-secondary/10",
            changeType === "negative" && "bg-destructive/10",
            changeType === "neutral" && "bg-primary/10",
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              changeType === "positive" && "text-secondary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-primary",
            )}
          />
        </div>
      </div>
    </Card>
  )
}
