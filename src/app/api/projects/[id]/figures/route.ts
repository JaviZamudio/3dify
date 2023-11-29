import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const projectId = params.id;
        const reqBody = await request.json();

        const figure = await prisma.figure.create({
            data: {
                name: reqBody.name,
                description: reqBody.description,
                hours: reqBody.hours,
                weight: reqBody.weight,
                waste: reqBody.waste,
                projectId: projectId,
                materialId: reqBody.materialId  
            },
        });

        const material = await prisma.material.findUnique({
            where: { id: reqBody.materialId }
        });
        
        if (material) {
            const newStock = material.stock - reqBody.weight - reqBody.waste;
            await prisma.material.update({
                where: { id: reqBody.materialId },
                data: { stock: newStock }
            });
        }

        return NextResponse.json({ code: "OK", message: "Figure created successfully", data: figure });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: "ERROR", message: "Error creating figure" }); 
    }
}