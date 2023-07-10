import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const { name } = await req.json()
        if (!name) return new NextResponse("Name is required", { status: 400 })

        const { storeId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })

        const store = await prismaDb.store.updateMany({
            where: { id: storeId, userId },
            data: { name }
        })

        return NextResponse.json(store)


    } catch (error) {
        console.error(`[STORE_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })

    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const { storeId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })

        const store = await prismaDb.store.deleteMany({
            where: { id: storeId, userId }
        })

        return NextResponse.json(store)


    } catch (error) {
        console.error(`[STORE_DELETE] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })

    }
}