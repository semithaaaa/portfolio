import type React from "react"
import { BrainCircuit, Database, FileCode2, BarChart3, Cpu, LineChart, Sigma, Layers, Code2, Boxes } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillIconProps {
  name: string
  className?: string
}

export function SkillIcon({ name, className }: SkillIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    python: <FileCode2 className={cn("w-full h-full", className)} />,
    r: <Sigma className={cn("w-full h-full", className)} />,
    sql: <Database className={cn("w-full h-full", className)} />,
    tensorflow: <BrainCircuit className={cn("w-full h-full", className)} />,
    pytorch: <Cpu className={cn("w-full h-full", className)} />,
    powerbi: <BarChart3 className={cn("w-full h-full", className)} />,
    tableau: <LineChart className={cn("w-full h-full", className)} />,
    keras: <Layers className={cn("w-full h-full", className)} />,
    oracle: <Database className={cn("w-full h-full", className)} />,
    java: <Code2 className={cn("w-full h-full", className)} />,
    scikit: <Boxes className={cn("w-full h-full", className)} />,
  }

  return (
    <div className="text-cyan-400">
      {iconMap[name.toLowerCase()] || <FileCode2 className={cn("w-full h-full", className)} />}
    </div>
  )
}
