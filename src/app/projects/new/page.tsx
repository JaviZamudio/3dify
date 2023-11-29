"use client"

import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    description: "",
    lightCost: "",
    hourCost: ""
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(form)

    const reqBody = {
      name: form.name,
      description: form.description,
      lightCost: Number(form.lightCost),
      hourCost: Number(form.hourCost)
    }

    const resBody = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    }).then((res) => res.json())

    console.log(resBody)

    if (resBody.code !== "OK") {
      alert("Error al crear el proyecto")
      return
    }

    alert("Proyecto creado")
    router.push(`/projects/${resBody.data.id}`)
  }

  return (
    <main className="">
      <h1 className="text-3xl mt-8 font-semibold text-center">
        Agregar Proyecto
      </h1>
      <form className="mx-auto max-w-sm mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input required label="Nombre" name="name" value={form.name} onChange={handleChange} />
        <Textarea required label="Descripción" name="description" value={form.description} onChange={handleChange} />
        <Input required label="Costo de luz (hr)" name="lightCost" value={form.lightCost} onChange={handleChange} type="number" startContent="$" placeholder="0.00" />
        <Input required label="Costo por hora" name="hourCost" value={form.hourCost} onChange={handleChange} type="number" startContent="$" placeholder="0.00" />
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