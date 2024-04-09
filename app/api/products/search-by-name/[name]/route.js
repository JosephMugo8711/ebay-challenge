import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        // Destructuring 'name' from context.params
        const { name } = context.params;

        // Querying the Prisma database for up to 5 products with titles containing 'name' (case-insensitive)
        const items = await prisma.products.findMany({
            take: 5, // Limiting the number of items to 5
            where: {
                title: {
                    contains: name, // Searching for titles containing 'name'
                    mode: 'insensitive' // Making the search case-insensitive
                },
            },
        });

        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the matching items as a JSON response
        return NextResponse.json(items);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
