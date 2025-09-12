import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  subtitle?: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

export function KPICard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  subtitle,
  variant = "default"
}: KPICardProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-gradient-success text-success-foreground",
    warning: "bg-gradient-warning text-warning-foreground",
    danger: "bg-destructive text-destructive-foreground"
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:shadow-lg",
      variantStyles[variant]
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-90"
            )}>
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
              {subtitle && (
                <span className={cn(
                  "text-sm",
                  variant === "default" ? "text-muted-foreground" : "opacity-75"
                )}>
                  {subtitle}
                </span>
              )}
            </div>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {trend === "up" && <ArrowUpIcon className="h-4 w-4 text-success" />}
                {trend === "down" && <ArrowDownIcon className="h-4 w-4 text-destructive" />}
                {trend === "neutral" && <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />}
                <span className={cn(
                  "text-sm font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className={cn(
              "p-3 rounded-lg",
              variant === "default" ? "bg-muted" : "bg-background/20"
            )}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}