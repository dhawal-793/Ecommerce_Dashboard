'use client'

import { FC } from 'react'
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/ui/data-table'
import { ProductColumn, columns } from './colums'
import ApiList from '@/components/ui/api-list'

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products (${data.length})`}
                    description="Manage Products for store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />
            <Heading
                title="API"
                description="API calls for Products."
            />
            <Separator />
            <ApiList entityName='products' entityIdName='productId' />

        </>
    )
}

export default ProductClient