import prisma from "@/app/libs/Prisma";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Querying the Prisma database for all products
        const products = await prisma.products.findMany();

        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the products as a JSON response
        return NextResponse.json(products);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
