"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from "lucide-react"

interface ProductFormProps {
  product?: {
    id?: string
    codigo: string
    nombre: string
    categoria: string
    proveedor: string
    precio: number
    stock: number
    stockMinimo: number
    descripcion?: string
    imagen?: string
  }
  onSave: (product: any) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    codigo: product?.codigo || "",
    nombre: product?.nombre || "",
    categoria: product?.categoria || "",
    proveedor: product?.proveedor || "",
    precio: product?.precio || 0,
    stock: product?.stock || 0,
    stockMinimo: product?.stockMinimo || 0,
    descripcion: product?.descripcion || "",
    imagen: product?.imagen || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imagen || null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es requerido"
    } else if (formData.codigo.length > 20) {
      newErrors.codigo = "El código no puede exceder 20 caracteres"
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    } else if (formData.nombre.length > 100) {
      newErrors.nombre = "El nombre no puede exceder 100 caracteres"
    }

    if (!formData.categoria) {
      newErrors.categoria = "La categoría es requerida"
    }

    if (!formData.proveedor) {
      newErrors.proveedor = "El proveedor es requerido"
    }

    if (formData.precio <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0"
    }

    if (formData.stock < 0) {
      newErrors.stock = "El stock no puede ser negativo"
    }

    if (formData.stockMinimo < 0) {
      newErrors.stockMinimo = "El stock mínimo no puede ser negativo"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setErrors({ ...errors, imagen: "La imagen no puede exceder 5MB" })
        return
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors({ ...errors, imagen: "Solo se permiten archivos JPG y PNG" })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData({ ...formData, imagen: result })
        setErrors({ ...errors, imagen: "" })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setFormData({ ...formData, imagen: "" })
  }

  const isFormValid = validateForm()

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
        <CardDescription>
          {product ? "Modifica los datos del producto" : "Completa la información del nuevo producto"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código *</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                placeholder="Ej: WHI001"
                maxLength={20}
                className={errors.codigo ? "border-destructive" : ""}
              />
              {errors.codigo && <p className="text-sm text-destructive">{errors.codigo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Whisky Johnnie Walker Black"
                maxLength={100}
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría *</Label>
              <Select
                value={formData.categoria}
                onValueChange={(value) => setFormData({ ...formData, categoria: value })}
              >
                <SelectTrigger className={errors.categoria ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whisky">Whisky</SelectItem>
                  <SelectItem value="vodka">Vodka</SelectItem>
                  <SelectItem value="ron">Ron</SelectItem>
                  <SelectItem value="tequila">Tequila</SelectItem>
                  <SelectItem value="gin">Gin</SelectItem>
                  <SelectItem value="brandy">Brandy</SelectItem>
                  <SelectItem value="licor">Licor</SelectItem>
                  <SelectItem value="vino">Vino</SelectItem>
                  <SelectItem value="cerveza">Cerveza</SelectItem>
                </SelectContent>
              </Select>
              {errors.categoria && <p className="text-sm text-destructive">{errors.categoria}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="proveedor">Proveedor *</Label>
              <Select
                value={formData.proveedor}
                onValueChange={(value) => setFormData({ ...formData, proveedor: value })}
              >
                <SelectTrigger className={errors.proveedor ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecciona un proveedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diageo">Diageo</SelectItem>
                  <SelectItem value="pernod-ricard">Pernod Ricard</SelectItem>
                  <SelectItem value="bacardi">Bacardi Limited</SelectItem>
                  <SelectItem value="beam-suntory">Beam Suntory</SelectItem>
                  <SelectItem value="brown-forman">Brown-Forman</SelectItem>
                </SelectContent>
              </Select>
              {errors.proveedor && <p className="text-sm text-destructive">{errors.proveedor}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">Precio *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className={errors.precio ? "border-destructive" : ""}
              />
              {errors.precio && <p className="text-sm text-destructive">{errors.precio}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Actual *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                className={errors.stock ? "border-destructive" : ""}
              />
              {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockMinimo">Stock Mínimo *</Label>
              <Input
                id="stockMinimo"
                type="number"
                min="0"
                value={formData.stockMinimo}
                onChange={(e) => setFormData({ ...formData, stockMinimo: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                className={errors.stockMinimo ? "border-destructive" : ""}
              />
              {errors.stockMinimo && <p className="text-sm text-destructive">{errors.stockMinimo}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción opcional del producto..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen del Producto</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div>
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" asChild>
                    <span>Seleccionar Imagen</span>
                  </Button>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">JPG o PNG, máximo 5MB</p>
              </div>
            </div>
            {errors.imagen && <p className="text-sm text-destructive">{errors.imagen}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              {product ? "Actualizar" : "Crear"} Producto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
