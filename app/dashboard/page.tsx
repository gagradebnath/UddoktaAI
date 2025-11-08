"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react"

// Mock data
const metricsData = {
  revenue_uplift_pct: 28.5,
  stockout_risk_score: 35,
  resolution_rate_pct: 94,
  waste_reduction_target: 42,
  next_action_text: 'Restock "Organic Black Tea" - Predicted 7-day lead time',
}

const demandForecastData = [
  { month: "Jul", predicted: 2400, actual: 2210 },
  { month: "Aug", predicted: 1398, actual: 2290 },
  { month: "Sep", predicted: 9800, actual: 2000 },
  { month: "Oct", predicted: 3908, actual: 2108 },
  { month: "Nov", predicted: 4800, actual: 2200 },
  { month: "Dec", predicted: 3200, actual: 2800 },
]

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 75000 },
  { month: "Jun", revenue: 89000 },
  { month: "Jul", revenue: 98000 },
  { month: "Aug", revenue: 112000 },
  { month: "Sep", revenue: 128000 },
  { month: "Oct", revenue: 145000 },
  { month: "Nov", revenue: 167000 },
  { month: "Dec", revenue: 189000 },
]

const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
}: {
  title: string
  value: number | string
  unit: string
  icon: any
  color: string
}) => (
  <Card className="bg-white border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#555555] mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#333333]">{value}</span>
            <span className="text-sm text-[#888888]">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function DashboardHome() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-1">Dashboard</h1>
        <p className="text-[#555555]">AI-Driven Business Intelligence</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Projected Revenue Uplift"
          value={`${metricsData.revenue_uplift_pct}%`}
          unit="YoY"
          icon={TrendingUp}
          color="bg-[#F57C20]"
        />
        <MetricCard
          title="Stockout Risk Score"
          value={metricsData.stockout_risk_score}
          unit="/100"
          icon={AlertTriangle}
          color="bg-[#E74C3C]"
        />
        <MetricCard
          title="Chatbot Resolution Rate"
          value={`${metricsData.resolution_rate_pct}%`}
          unit="Success"
          icon={CheckCircle}
          color="bg-[#34A853]"
        />
        <MetricCard
          title="Waste Reduction Target"
          value={`${metricsData.waste_reduction_target}%`}
          unit="Achieved"
          icon={Zap}
          color="bg-[#F57C20]"
        />
      </div>

      {/* Next Action Alert */}
      <Alert className="bg-[#FFF1E6] border-[#F57C20] text-[#333333]">
        <AlertTriangle className="h-4 w-4 text-[#F57C20]" />
        <AlertDescription>
          <strong className="text-[#F57C20]">Inventory Alert:</strong> {metricsData.next_action_text}
          <Button className="ml-4 h-7 text-xs bg-[#F57C20] hover:bg-[#E86E12] text-white" size="sm">
            Take Action
          </Button>
        </AlertDescription>
      </Alert>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Demand Forecast */}
        <Card className="bg-white border-[#E0E0E0]">
          <CardHeader>
            <CardTitle className="text-[#333333]">Demand Forecast Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis stroke="#555555" />
                <YAxis stroke="#555555" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E0E0E0",
                    color: "#333333"
                  }}
                />
                <Legend />
                <Bar dataKey="predicted" fill="#F57C20" name="Predicted Sales" />
                <Bar dataKey="actual" fill="#4B4B4B" name="Actual Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Year-to-Date Revenue */}
        <Card className="bg-white border-[#E0E0E0]">
          <CardHeader>
            <CardTitle className="text-[#333333]">Year-to-Date Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis stroke="#555555" />
                <YAxis stroke="#555555" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E0E0E0",
                    color: "#333333"
                  }}
                  formatter={(value) => `$${(value as number).toLocaleString()}`}
                />
                <Line type="monotone" dataKey="revenue" stroke="#F57C20" strokeWidth={3} dot={false} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
