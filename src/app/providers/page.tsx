import prisma from "@/configs/db";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function ProvidersPage() {
  const providers = await prisma.provider.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      phone: true,
      email: true,
      address: true,
      website: true
    }
  })

  console.log(providers)

  return (
    <div className="">
      <h1 className="text-4xl">Providers Page</h1>
      <Divider className="my-6" />

      <div className="flex flex-col gap-4 w-full">
        {providers.map((provider) => (
          <Card key={provider.id}>
            <CardHeader className="text-xl font-semibold">{provider.name}</CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-2">
              <ProviderInfo title="Descripción" data={provider.description} />
              <ProviderInfo title="Teléfono" data={provider.phone} />
              <ProviderInfo title="Correo" data={provider.email} />
              <ProviderInfo title="Dirección" data={provider.address} />
              <ProviderInfo title="Sitio web" data={provider.website} />
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

const ProviderInfo = ({ title, data }: { title: string, data: string | null }) => (data &&
  <div className="flex items-center gap-1">
    <span className="font-semibold">{title}:</span>
    {data}
  </div>
)