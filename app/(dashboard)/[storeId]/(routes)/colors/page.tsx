
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import ColorClient from "./components/ColorClient"


import { FC } from 'react'
import { ColorColumn } from "./components/colums"

interface ColorsProps {
    params: {
        storeId: string
    }
}

const Colors: FC<ColorsProps> = async ({ params }) => {
    const colors = await prismaDb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedColors: ColorColumn[] = colors.map(color => ({

        id: color.id,
        name: color.name,
        value:color.value,
        createdAt: format(color.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}

export default Colors