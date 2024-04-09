import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        // Counting the total number of products in the database
        const productsCount = await prisma.products.count();

        // Generating a random skip value within the range of product count
        const skip = Math.floor(Math.random() * productsCount);

        // Querying the Prisma database for 5 products, starting from the randomly generated skip value
        const products = await prisma.products.findMany({
            take: 5, // Limiting the number of products to 5
            skip: skip, // Skipping the first 'skip' number of products
            orderBy: { id: 'asc' }, // Ordering the products by ID in ascending order
        });

        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the random products as a JSON response
        return NextResponse.json(products);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
