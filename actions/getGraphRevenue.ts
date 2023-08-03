import prismaDb from "@/lib/prismaDb";

interface GraphData {
    name: string;
    total: number;
}

export const getGraphRevenue = async (storeId: string) => {
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


    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth();
        let revenueFotThisOrder = 0;

        for (const orderItem of order.orderItems) {
            revenueFotThisOrder += orderItem.product.price.toNumber();
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueFotThisOrder;
    }

    const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return graphData;
}