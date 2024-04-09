import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
// Importing createServerComponentClient function from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Handle GET Request
export async function GET() {

    // create a supabase client  instance with cookies
    const supabase = createServerComponentClient({ cookies })

    try {
        // Retrieving user information from supabase
        const { data: { user } } = await supabase.auth.getUser()

        // Checking if user is not found
        if (!user) throw Error()
        
        // Querying the prisma database for the users address
        const res = await prisma.addresses.findFirst({
            where: { user_id: user?.id }
        })
        
        // Disconnecting from the Prisma client
        await prisma.$disconnect();
        // Returning the address as a JSON response
        return NextResponse.json(res);
    } catch (error) {
       
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();
         // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}