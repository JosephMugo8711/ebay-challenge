// Importing PrismaClient instance from a custom path
import prisma from "@/app/libs/Prisma";

// Importing NextResponse from 'next/server'
import { NextResponse } from "next/server";

// Handling GET request
export async function GET(req, context) {
    try {
        // Destructuring 'id' from context.params
        const { id } = context.params;

        // Querying the Prisma database for a product with the specified ID
        const product = await prisma.products.findFirst({
            where: { id: Number(id) }
        });

        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the product as a JSON response
        return NextResponse.json(product);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
