"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AlertCircle, Clock, TrendingDown } from "lucide-react"

// Mock inventory data
const inventoryProducts = [
  {
    id: 1,
    name: "Organic Black Tea",
    current_stock: 45,
    demand_7_days: 120,
    days_until_stockout: 3,
    restock_price: 450,
    status: "critical",
  },
  {
    id: 2,
    name: "Premium Green Tea",
    current_stock: 230,
    demand_7_days: 95,
    days_until_stockout: 18,
    restock_price: 380,
    status: "warning",
  },
  {
    id: 3,
    name: "Oolong Tea Blend",
    current_stock: 560,
    demand_7_days: 60,
    days_until_stockout: 45,
    restock_price: 320,
    status: "healthy",
  },
  {
    id: 4,
    name: "White Tea Deluxe",
    current_stock: 120,
    demand_7_days: 50,
    days_until_stockout: 12,
    restock_price: 500,
    status: "warning",
  },
  {
    id: 5,
    name: "Herbal Tea Mix",
    current_stock: 890,
    demand_7_days: 180,
    days_until_stockout: 35,
    restock_price: 210,
    status: "healthy",
  },
]

const forecastData = [
  { day: "Day 1", actual: 180, forecast: 175 },
  { day: "Day 2", actual: 165, forecast: 170 },
  { day: "Day 3", actual: 192, forecast: 185 },
  { day: "Day 4", actual: 210, forecast: 200 },
  { day: "Day 5", actual: 205, forecast: 210 },
  { day: "Day 6", actual: 225, forecast: 220 },
  { day: "Day 7", actual: 240, forecast: 235 },
  { day: "Day 8 (Forecast)", actual: null, forecast: 245 },
  { day: "Day 9 (Forecast)", actual: null, forecast: 255 },
  { day: "Day 10 (Forecast)", actual: null, forecast: 260 },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/20"
    case "warning":
      return "bg-[#F57C20]/10 text-[#F57C20] border-[#F57C20]/20"
    case "healthy":
      return "bg-[#34A853]/10 text-[#34A853] border-[#34A853]/20"
    default:
      return "bg-[#E0E0E0]/10 text-[#555555] border-[#E0E0E0]/20"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "critical":
      return <AlertCircle className="w-4 h-4" />
    case "warning":
      return <Clock className="w-4 h-4" />
    case "healthy":
      return <TrendingDown className="w-4 h-4" />
    default:
      return null
  }
}

export default function InventoryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("organic-black-tea")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-1">Inventory AI</h1>
        <p className="text-[#555555]">Predictive inventory management & demand forecasting</p>
      </div>

      {/* Forecasting Chart */}
      <Card className="bg-white border-[#E0E0E0]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
          <CardTitle className="text-[#333333]">Sales Forecast (Next 30 Days)</CardTitle>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-[#E0E0E0] text-[#333333]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#E0E0E0]">
              <SelectItem value="organic-black-tea">Organic Black Tea</SelectItem>
              <SelectItem value="green-tea">Premium Green Tea</SelectItem>
              <SelectItem value="oolong">Oolong Tea Blend</SelectItem>
              <SelectItem value="white-tea">White Tea Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
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
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4B4B4B"
                strokeWidth={2}
                name="Actual Sales"
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#14b8a6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecast"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Low Stock Risk Table */}
      <Card className="bg-white border-[#E0E0E0]">
        <CardHeader>
          <CardTitle className="text-[#333333]">Low Stock Risk Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#E0E0E0]">
                <tr>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">Product Name</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">Current Stock</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">7-Day Forecast</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">Days to Stockout</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-[#555555] font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {inventoryProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3 px-4 text-[#333333] font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-[#555555]">{product.current_stock} units</td>
                    <td className="py-3 px-4 text-[#555555]">{product.demand_7_days} units</td>
                    <td className="py-3 px-4">
                      <span className="text-[#555555]">{product.days_until_stockout} days</span>
                    </td>
                    <td className="py-3 px-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit ${getStatusColor(product.status)}`}
                      >
                        {getStatusIcon(product.status)}
                        <span className="capitalize text-xs font-medium">
                          {product.status === "critical"
                            ? "Critical"
                            : product.status === "warning"
                              ? "Warning"
                              : "Healthy"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" className="bg-[#F57C20] hover:bg-[#E86E12] text-white text-xs">
                        Place Order
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
