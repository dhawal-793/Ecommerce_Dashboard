import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, value } = await req.json()
        if (!name) return new NextResponse("Size Name is required", { status: 400 })
        if (!value) return new NextResponse("Size Value is required", { status: 400 })

        const { storeId, sizeId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!sizeId) return new NextResponse("SizeId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismaDb.size.updateMany({
            where: {
                id: sizeId,
            },
            data: { name, value }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.error(`[SIZE_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { sizeId: string } }) {
    try {

        if (!params.sizeId) return new NextResponse("SizeId is required", { status: 400 })

        const size = await prismaDb.size.findUnique({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.error(`[SIZE_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}