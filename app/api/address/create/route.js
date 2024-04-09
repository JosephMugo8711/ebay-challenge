import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Handling POST request
export async function POST(req) {

    // Creating a supabase client instance with cookies
    const supabase = createServerComponentClient({ cookies })

    try {
        // Retrieving user information from supabase
        const { data: { user } } = await supabase.auth.getUser()

        // Checking if user is not found
        if (!user) throw Error()

        // Parsing the request body as JSON
        const body = await req.json();
        
        // Creating a new address entry in the prisma
        const res = await prisma.addresses.create({
            data: {
                user_id: user?.id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
            }
        })
        // Disconnecting from the Prisma client
        await prisma.$disconnect();

          // Returning the newly created address as a JSON response
        return NextResponse.json(res);
    } catch (error) {
         // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}