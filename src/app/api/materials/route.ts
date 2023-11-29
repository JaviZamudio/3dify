import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // opt out of cache
        const headers = request.headers

        const materials = await prisma.material.findMany()

        return NextResponse.json({ code: "OK", message: "Materials successfuly requested", data: materials });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ code: "ERROR", message: "Error creating project" });
    }
}