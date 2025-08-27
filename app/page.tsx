"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Search,
  Menu,
  Home,
  ShoppingCart,
  FileText,
  Settings,
  Bell,
  User,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

export default function InventorySystem() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "productos", label: "Productos", icon: Package },
    { id: "proveedores", label: "Proveedores", icon: Users },
    { id: "movimientos", label: "Movimientos", icon: TrendingUp },
    { id: "ventas", label: "Ventas", icon: ShoppingCart },
    { id: "reportes", label: "Reportes", icon: FileText },
    { id: "alertas", label: "Alertas", icon: Bell },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  const kpiData = [
    { title: "Ventas del Día", value: "$12,450", change: "+12%", trend: "up" },
    { title: "Productos en Stock", value: "1,247", change: "-3%", trend: "down" },
    { title: "Stock Bajo", value: "23", change: "+5%", trend: "warning" },
    { title: "Proveedores Activos", value: "45", change: "+2%", trend: "up" },
  ]

  const recentMovements = [
    { id: 1, producto: "Whisky Johnnie Walker", tipo: "Entrada", cantidad: 24, fecha: "2024-01-15" },
    { id: 2, producto: "Vodka Absolut", tipo: "Salida", cantidad: 12, fecha: "2024-01-15" },
    { id: 3, producto: "Ron Bacardí", tipo: "Entrada", cantidad: 36, fecha: "2024-01-14" },
  ]

  const lowStockProducts = [
    { id: 1, nombre: "Tequila José Cuervo", stock: 5, minimo: 10 },
    { id: 2, nombre: "Gin Bombay", stock: 3, minimo: 8 },
    { id: 3, nombre: "Brandy Hennessy", stock: 2, minimo: 6 },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p
                      className={`text-xs ${
                        kpi.trend === "up"
                          ? "text-green-600"
                          : kpi.trend === "down"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {kpi.change} desde ayer
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Movimientos Recientes</CardTitle>
                  <CardDescription>Últimas entradas y salidas de inventario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMovements.map((movement) => (
                      <div key={movement.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{movement.producto}</p>
                          <p className="text-sm text-muted-foreground">{movement.fecha}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={movement.tipo === "Entrada" ? "default" : "secondary"}>{movement.tipo}</Badge>
                          <p className="text-sm font-medium">{movement.cantidad} unidades</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Stock Bajo
                  </CardTitle>
                  <CardDescription>Productos que necesitan reposición</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.nombre}</p>
                          <p className="text-sm text-muted-foreground">Mínimo: {product.minimo} unidades</p>
                        </div>
                        <Badge variant="destructive">{product.stock} restantes</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "productos":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Gestión de Productos</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Lista de Productos</CardTitle>
                    <CardDescription>Gestiona tu inventario de bebidas</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Buscar productos..." className="max-w-sm" />
                    <Button variant="outline">Buscar</Button>
                  </div>

                  <div className="border rounded-lg">
                    <table className="w-full">
                      <thead className="border-b bg-muted/50">
                        <tr>
                          <th className="text-left p-4">Código</th>
                          <th className="text-left p-4">Nombre</th>
                          <th className="text-left p-4">Categoría</th>
                          <th className="text-left p-4">Stock</th>
                          <th className="text-left p-4">Precio</th>
                          <th className="text-left p-4">Estado</th>
                          <th className="text-left p-4">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">WHI001</td>
                          <td className="p-4">Whisky Johnnie Walker Black</td>
                          <td className="p-4">Whisky</td>
                          <td className="p-4">45</td>
                          <td className="p-4">$89.99</td>
                          <td className="p-4">
                            <Badge variant="default">Activo</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">VOD001</td>
                          <td className="p-4">Vodka Absolut Original</td>
                          <td className="p-4">Vodka</td>
                          <td className="p-4">23</td>
                          <td className="p-4">$45.99</td>
                          <td className="p-4">
                            <Badge variant="default">Activo</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Sección en desarrollo: {activeSection}</p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-sidebar border-r border-sidebar-border`}
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <Package className="h-8 w-8 text-sidebar-primary" />
            {sidebarOpen && <h1 className="text-xl font-bold text-sidebar-foreground">InventoryPro</h1>}
          </div>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sidebar-accent transition-colors ${
                  activeSection === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar productos, proveedores..." className="pl-10 w-96" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
