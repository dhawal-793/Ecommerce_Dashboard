import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

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