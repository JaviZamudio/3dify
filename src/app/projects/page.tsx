import NextLink from "@/components/NextLink";
import prisma from "@/configs/db";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      date: true,
      hourCost: true,
      lightCost: true,
      Figures: {
        select: {
          name: true,
          hours: true,
          weight: true,
          waste: true,
          Material: {
            select: {
              price: true
            }
          }
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Projects Page</h1>
        <Link href="/projects/new">
          <Button color="primary" variant="solid" size="md" className="gap-1">
            <span className="material-symbols-outlined">add</span>
            Nuevo
          </Button>
        </Link>
      </div>
      <Divider className="my-6" />

      <div className="flex flex-col gap-4 w-full items-center">
        {projects.map((project) => {
          const totalHours = project.Figures.reduce((acc, figure) => acc + figure.hours, 0)
          const totalCost = project.Figures.reduce((acc, figure) => acc + (figure.weight * (figure.Material.price / 1000)) + (figure.waste * (figure.Material.price / 1000)) + (figure.hours * project.lightCost!), 0)
          const totalPrice = project.Figures.reduce((acc, figure) => acc + (figure.hours * project.hourCost!), 0)
          const revenue = totalPrice - totalCost
          const profitMargin = (revenue / totalPrice) * 100

          return (
            <Card key={project.id} className="w-full">
              <CardHeader className="flex flex-col gap-1 w-full items-start">
                <span className="text-xl font-semibold">{project.name}</span>
                <span className="text-sm text-default-500">{project.date?.toLocaleDateString()}</span>
              </CardHeader>
              <Divider />
              <CardBody className="gap-2 grid grid-cols-2">
                <div><span className="font-semibold">Descripción:</span> {project.description}</div>
                <div><span className="font-semibold">Horas totales:</span> {totalHours}</div>
                <div><span className="font-semibold">Costo total:</span> ${totalCost}</div>
                <div><span className="font-semibold">Precio total:</span> ${totalPrice}</div>
                <Divider className="col-span-2" />
                <div className="text-lg"><span className="font-semibold">Ganancia:</span> ${revenue}</div>
                <div className="text-lg"><span className="font-semibold">Margen de ganancia:</span> {profitMargin.toFixed(2)}%</div>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-end">
                <Button color="secondary" variant="flat" size="md" as={NextLink} href={`/projects/${project.id}`}>Ver detalles</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}