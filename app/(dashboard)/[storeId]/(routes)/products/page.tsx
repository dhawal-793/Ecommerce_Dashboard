
import { FC } from 'react'
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import { formatter } from '@/lib/utils'

import ProductClient from "./components/ProductClient"
import { ProductColumn } from "./components/colums"

interface ProductsProps {
    params: {
        storeId: string
    }
}

const Products: FC<ProductsProps> = async ({ params }) => {
    const products = await prismaDb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductColumn[] = products.map(product => ({

        id: product.id,
        name: product.name,
        price: formatter.format(product.price.toNumber()),
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        category:product.category.name,
        size:product.size.name,
        color:product.color.value,
        createdAt: format(product.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    )
}

export default Products