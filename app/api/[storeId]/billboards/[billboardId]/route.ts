import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

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