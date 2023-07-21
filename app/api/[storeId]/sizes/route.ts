import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, value } = await req.json()
        if (!name) return new NextResponse("Size Name is required", { status: 400 })
        if (!value) return new NextResponse("Size Value is required", { status: 400 })

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const size = await prismaDb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.error(`[SIZE_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })
        
        const sizes = await prismaDb.size.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.error(`[SIZES_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}