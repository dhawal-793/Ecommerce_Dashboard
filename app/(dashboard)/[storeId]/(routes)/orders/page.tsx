import { FC } from 'react'
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import { formatter } from '@/lib/utils'

import OrderClient from "./components/OrderClient"
import { OrderColumn } from "./components/colums"

interface OrdersProps {
    params: {
        storeId: string
    }
}

const Orders: FC<OrdersProps> = async ({ params }) => {
    const billboards = await prismaDb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedOrders: OrderColumn[] = billboards.map(order => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        isPaid: order.isPaid,
        products: order.orderItems.map(orderItem => orderItem.product.name).join(', '),
        totalPrice: formatter.format(order.orderItems.reduce(
            (total, orderItem) => total + Number(orderItem.product.price), 0
        )),
        createdAt: format(order.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default Orders