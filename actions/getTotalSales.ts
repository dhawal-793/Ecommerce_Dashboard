import prismaDb from "@/lib/prismaDb";

export const getTotalSales = async (storeId: string) => {
    const salesTotal = await prismaDb.order.count({
        where: {
            storeId: storeId,
            isPaid: true
        }
    })

    return salesTotal
}