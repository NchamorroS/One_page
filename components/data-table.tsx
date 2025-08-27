"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  searchPlaceholder?: string
  onView?: (item: any) => void
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  onExport?: () => void
}

export default function DataTable({
  data,
  columns,
  searchPlaceholder = "Buscar...",
  onView,
  onEdit,
  onDelete,
  onExport,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showFilters, setShowFilters] = useState(false)

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="max-w-sm"
          />
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="text-left p-4">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        onClick={() => handleSort(column.key)}
                        className="h-auto p-0 font-medium hover:bg-transparent"
                      >
                        {column.label}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="font-medium">{column.label}</span>
                    )}
                  </th>
                ))}
                {(onView || onEdit || onDelete) && (
                  <th className="text-left p-4">
                    <span className="font-medium">Acciones</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/25">
                    {columns.map((column) => (
                      <td key={column.key} className="p-4">
                        {column.render ? column.render(item[column.key], item) : String(item[column.key] || "")}
                      </td>
                    ))}
                    {(onView || onEdit || onDelete) && (
                      <td className="p-4">
                        <div className="flex gap-2">
                          {onView && (
                            <Button variant="ghost" size="sm" onClick={() => onView(item)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(startIndex + pageSize, sortedData.length)} de {sortedData.length}{" "}
              resultados
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                setPageSize(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
