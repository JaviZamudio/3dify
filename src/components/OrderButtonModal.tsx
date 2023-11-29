"use client"

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

interface Provider {
  id: number;
  name: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  website: string | null;
}

export default function OrderButtonModal({ providers }: { providers: Provider[] }) {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <Button color="default" variant="flat" size="sm" onClick={openModal}>
        Pedir
      </Button>
      <Modal isOpen={open} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>Proveedores</ModalHeader>
          <ModalBody>
            {providers.map((provider) => (
              <Card>
                <CardHeader className="text-xl font-semibold">
                  {provider.name}
                </CardHeader>
                <Divider />
                <CardBody>
                  <ProviderInfo title="Teléfono" data={provider.phone} />
                  <ProviderInfo title="Correo" data={provider.email} />
                  <ProviderInfo title="Dirección" data={provider.address} />
                  <ProviderInfo title="Sitio web" data={provider.website} />
                </CardBody>
              </Card>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const ProviderInfo = ({ title, data }: { title: string, data: string | null }) => (data &&
  <div className="flex items-center gap-1">
    <span className="font-semibold">{title}:</span>
    {data}
    <Button isIconOnly variant="light" radius="full" size="sm" className="material-symbols-outlined inline !text-xl" onClick={() => navigator.clipboard.writeText(data)}>
      content_copy
    </Button>
  </div>
)