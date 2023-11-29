import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

		const project = await prisma.project.create({
			data: {
				name: reqBody.name,
				description: reqBody.description,
				lightCost: reqBody.lightCost,
				hourCost: reqBody.hourCost
			},
		});

		return NextResponse.json({ code: "OK", message: "Project created successfully", data: project });

    } catch (error) {
		console.log(error);
        return NextResponse.json({ code: "ERROR", message: "Error creating project" }); 
    }
}




