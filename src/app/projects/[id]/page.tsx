import NextLink from "@/components/NextLink";
import prisma from "@/configs/db";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react";

export default async function ProjectsPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUniqueOrThrow({
    where: {
      id: parseInt(params.id)
    },
    select: {
      id: true,
      name: true,
      description: true,
      date: true,
      hourCost: true,
      lightCost: true,
      Figures: {
        select: {
          id: true,
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
  })
  const totalHours = project.Figures.reduce((acc, figure) => acc + figure.hours, 0)
  const totalCost = project.Figures.reduce((acc, figure) => acc + (figure.weight * (figure.Material.price / 1000)) + (figure.waste * (figure.Material.price / 1000)) + (figure.hours * project.lightCost!), 0)
  const totalPrice = project.Figures.reduce((acc, figure) => acc + (figure.hours * project.hourCost!), 0)
  const totalWeight = project.Figures.reduce((acc, figure) => acc + figure.weight, 0)
  const totalWaste = project.Figures.reduce((acc, figure) => acc + figure.waste, 0)
  const totalMaterialCost = project.Figures.reduce((acc, figure) => acc + (figure.weight * (figure.Material.price / 1000)), 0)
  const totalWasteCost = project.Figures.reduce((acc, figure) => acc + (figure.waste * (figure.Material.price / 1000)), 0)
  const totalLightCost = project.Figures.reduce((acc, figure) => acc + (figure.hours * project.lightCost!), 0)

  const revenue = totalPrice - totalCost
  const profitMargin = (revenue / totalPrice) * 100

  return (
    <div className="">
      <h1 className="text-4xl"><span className="font-semibold">Proyecto:</span> {project.name}</h1>
      <span className="text-default-500 mt-2 block">{project.date?.toLocaleDateString()}</span>
      <Divider className="my-6" />

      {/* Info */}
      <Card className="bg-content3 text-content3-foreground">
        <CardBody className="gap-2 grid grid-cols-3 p-6">
          <div className="col-span-3 mb-2"><span className="font-semibold">Descripción:</span> {project.description}</div>
          <div><span className="font-semibold text-success-700">Precio por hora:</span> ${project.hourCost}/hr</div>
          <div><span className="font-semibold">Costo de luz:</span> ${project.lightCost}/hr</div>
          <div><span className="font-semibold">Horas totales:</span> {totalHours}hr</div>
          <div><span className="font-semibold">Peso total:</span> {totalWeight}gr</div>
          <div><span className="font-semibold">Desperdicio total:</span> {totalWaste}gr</div>
          <div><span className="font-semibold text-danger-700">Costo total de material:</span> ${totalMaterialCost}</div>
          <div><span className="font-semibold text-danger-700">Costo total de desperdicio:</span> ${totalWasteCost}</div>
          <div><span className="font-semibold text-danger-700">Costo total de luz:</span> ${totalLightCost}</div>
          <Divider className="col-span-3 my-2" />
          <div className="text-lg"><span className="font-semibold text-success-700">Precio total:</span> ${totalPrice}</div>
          <div className="text-lg"><span className="font-semibold text-danger-700">Costo total:</span> ${totalCost}</div>
          <Divider className="col-span-3 my-2" />
          <div className="text-lg"><span className="font-semibold">Ganancia:</span> ${revenue}</div>
          <div className="text-lg"><span className="font-semibold">Margen de ganancia:</span> {profitMargin.toFixed(2)}%</div>
        </CardBody>
      </Card>
      <Divider className="my-6" />

      {/* Figures */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Figuras</h2>
        <NextLink href={`/projects/${params.id}/figures/new`}>
          <Button color="primary" variant="solid" size="md" className="gap-1">
            <span className="material-symbols-outlined">add</span>
            Nuevo
          </Button>
        </NextLink>
      </div>

      <div className="flex flex-col gap-4 w-full items-center mt-4">
        {project.Figures.map((figure) => (
          <Card key={figure.id} className="w-full">
            <CardHeader className="flex flex-col gap-1 w-full items-start">
              <span className="text-xl font-semibold">{figure.name}</span>
            </CardHeader>
            <Divider />
            <CardBody className="gap-2 grid grid-cols-2">
              <div><span className="font-semibold">Horas:</span> {figure.hours}hr</div>
              <div><span className="font-semibold">Peso:</span> {figure.weight}gr</div>
              <div><span className="font-semibold">Desperdicio:</span> {figure.waste}gr</div>
              <Divider className="col-span-2" />
              <div className="text-lg"><span className="font-semibold">Precio:</span> ${figure.hours * project.hourCost!}</div>
              <div className="text-lg"><span className="font-semibold">Costo de material:</span> ${figure.weight * (figure.Material.price / 1000)}</div>
              <div className="text-lg"><span className="font-semibold">Costo de desperdicio:</span> ${figure.waste * (figure.Material.price / 1000)}</div>
              <div className="text-lg"><span className="font-semibold">Costo de luz:</span> ${figure.hours * project.lightCost!}</div>
            </CardBody>
            <Divider />
            {/* <CardFooter className="flex justify-end">
              <Button color="danger" variant="solid" size="sm" className="gap-1">
                <span className="material-symbols-outlined">delete</span>
                Eliminar
              </Button>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  )
}