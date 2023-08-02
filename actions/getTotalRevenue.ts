import prismaDb from "@/lib/prismaDb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismaDb.order.findMany({
        where: {
            storeId: storeId,
            isPaid: true
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    })

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderTotal, orderItem) => {
            return orderTotal + orderItem.product.price.toNumber()
        }, 0)
        return total + orderTotal
    }, 0)

    return totalRevenue
}