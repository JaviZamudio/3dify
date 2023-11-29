"use client"

import { Button, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewFigurePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    description: "",
    hours: "",
    weight: "",
    waste: "",
    materialId: "",
  })
  const [materials, setMaterials] = useState<{
    id: number;
    name: string;
    price: number;
    stock: number;
  }[]>([])

  const getMaterials = async () => {
    const resBody = await fetch("/api/materials").then((req) => req.json())
    console.log(resBody)
    setMaterials(resBody.data)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(form)

    const reqBody = {
      name: form.name,
      description: form.description,
      hours: Number(form.hours),
      weight: Number(form.weight),
      waste: Number(form.waste),
      projectId: Number(params.id),
      materialId: Number(form.materialId),
    }

    const resBody = await fetch(`/api/projects/${params.id}/figures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    }).then((res) => res.json())

    console.log(resBody)

    if (resBody.code !== "OK") {
      alert("Error al crear la figura")
      return
    }

    alert("Figura creada exitosamente")
    router.back()
  }

  useEffect(() => {
    getMaterials()
  }, [])

  return (
    <main className="">
      <h1 className="text-3xl mt-8 font-semibold text-center">
        Crear Figura
      </h1>
      <form className="mx-auto max-w-sm mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input required label="Nombre" name="name" value={form.name} onChange={handleChange} />
        <Textarea required label="Descripción" name="description" value={form.description} onChange={handleChange} />
        <Input required label="Horas de impresión" name="hours" value={form.hours} onChange={handleChange} type="number" placeholder="0.00" />
        <Input required label="Peso (gr)" name="weight" value={form.weight} onChange={handleChange} type="number" placeholder="0.00" />
        <Input required label="Desperdicio (gr)" name="waste" value={form.waste} onChange={handleChange} type="number" placeholder="0.00" />
        <Select required label="Material" name="materialId" onChange={handleSelectChange}>
          {materials.map((material) => (
            <SelectItem key={material.id} value={material.id}>{material.name}</SelectItem>
          ))}
        </Select>

        <Divider />

        <div className="flex gap-4 justify-between items-center">
          <Button color="primary" variant="solid" size="lg" className="w-1/2" type="submit">
            Agregar
          </Button>
          <Button color="default" variant="bordered" size="lg" className="w-1/2" onClick={() => router.back()}>
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  )
}