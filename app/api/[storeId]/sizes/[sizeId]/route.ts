import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

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