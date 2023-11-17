import OrderButtonModal from "@/components/OrderButtonModal";
import prisma from "@/configs/db"
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Spacer } from "@nextui-org/react";

export default async function MaterialsPage() {
  const materials = await prisma.material.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      Providers: true
    }
  })

  return (
    <div className="">
      <h1 className="text-4xl">Materials Page</h1>

      <Divider className="my-6" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {materials.map((material) => (
          // under 700 grams, bg-warning-400
          // under 300 grams, bg-danger-400
          <Card key={material.id} className={`${material.stock < 300 ? 'bg-danger-100' : material.stock < 700 ? 'bg-warning-100' : 'bg-content2'}`}>
            <CardHeader className="text-xl font-semibold">{material.name}</CardHeader>
            <Divider />
            <CardBody>
              <div><span className="font-semibold">Precio:</span> <code>${material.price}/kg</code></div>
              <div><span className="font-semibold">Stock:</span> <code>{material.stock}gr</code></div>

              <Spacer y={2} />

              {/* Text, weather it's enough or not */}
              {material.stock < 300 && <div className="text-danger-700 flex items-center gap-2"><span className="material-symbols-outlined">warning</span>No hay suficiente stock</div>}
              {material.stock < 700 && material.stock >= 300 && <div className="text-warning-700 flex items-center gap-2"><span className="material-symbols-outlined">info</span>Stock bajo</div>}
              {material.stock >= 700 && <div className="text-success-700 flex items-center gap-2"><span className="material-symbols-outlined">check</span>Stock suficiente</div>}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-end">
              <OrderButtonModal providers={material.Providers} />
            </CardFooter>
          </Card>
        ))}
        <Card isPressable className="bg-content3 text-content3-foreground py-8">
          <CardBody className="flex justify-center items-center h-full text-xl">
            <span className="!text-6xl material-symbols-outlined">add</span>
            Agregar material
          </CardBody>
        </Card>
      </div>
    </div >
  )
}