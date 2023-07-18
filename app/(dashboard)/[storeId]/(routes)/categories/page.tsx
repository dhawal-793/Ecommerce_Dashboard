import { FC } from 'react'
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import CategoryClient from "./components/CategoryClient"
import { CategoryColumn } from "./components/colums"


interface CategoriesProps {
    params: {
        storeId: string
    }
}

const Categories: FC<CategoriesProps> = async ({ params }) => {
    const categories = await prismaDb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map(category => ({
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default Categories