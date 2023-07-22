import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, value } = await req.json()
        if (!name) return new NextResponse("Color Name is required", { status: 400 })
        if (!value) return new NextResponse("Color Value is required", { status: 400 })

        const { storeId, colorId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!colorId) return new NextResponse("ColorId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const color = await prismaDb.color.updateMany({
            where: {
                id: colorId,
            },
            data: { name, value }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.error(`[COLOR_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, colorId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { storeId, colorId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!colorId) return new NextResponse("ColorId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const color = await prismaDb.color.deleteMany({
            where: { id: colorId }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.error(`[COLOR_DELETE] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { colorId: string } }) {
    try {

        if (!params.colorId) return new NextResponse("ColorId is required", { status: 400 })

        const color = await prismaDb.color.findUnique({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.error(`[COLOR_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}