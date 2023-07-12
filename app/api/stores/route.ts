import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name } = await req.json()
        if (!name) return new NextResponse("Name is required", { status: 400 })

        const store = await prismaDb.store.create({
            data: { name, userId }
        })
        return NextResponse.json(store)

    } catch (error) {
        console.error(`[STORES_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }


}