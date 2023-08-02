import prismaDb from "@/lib/prismaDb";

export const getStocksCount = async (storeId: string) => {
    const totalProducts = await prismaDb.product.count({
        where: {
            storeId: storeId,
            isArchived:false
        }
    })

    return totalProducts
}