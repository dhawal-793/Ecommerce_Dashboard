import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { label, imageUrl } = await req.json()
        if (!label) return new NextResponse("Label is required", { status: 400 })
        if (!imageUrl) return new NextResponse("Image is required", { status: 400 })

        const { storeId, billboardId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!billboardId) return new NextResponse("BillBoardId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const billboard = await prismaDb.billboard.updateMany({
            where: {
                id: billboardId,
            },
            data: { label, imageUrl }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.error(`[BILLBOARD_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {

        if (!params.billboardId) return new NextResponse("BillBoardId is required", { status: 400 })

        const billboard = await prismaDb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.error(`[BILLBOARD_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}