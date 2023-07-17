import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { label, imageUrl } = await req.json()
        if (!label) return new NextResponse("Label is required", { status: 400 })
        if (!imageUrl) return new NextResponse("Image is required", { status: 400 })

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

        const billboard = await prismaDb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.error(`[BILLBOARD_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const billboards = await prismaDb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.error(`[BILLBOARDS_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}