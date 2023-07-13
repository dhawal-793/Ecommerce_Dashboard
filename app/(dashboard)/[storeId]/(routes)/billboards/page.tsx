


import prismaDb from "@/lib/prismaDb"
import BillboardClient from "./components/BillboardClient"




import { FC } from 'react'

interface BillboardsProps {
    params: {
        storeId: string
    }
}

const Billboards: FC<BillboardsProps> = async ({ params }) => {
    const billboards = await prismaDb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    
    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient data={billboards} />
            </div>
        </div>
    )
}

export default Billboards