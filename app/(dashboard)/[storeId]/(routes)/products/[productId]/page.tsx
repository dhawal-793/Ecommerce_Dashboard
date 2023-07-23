import prismaDb from "@/lib/prismaDb"
import ProductForm from "./components/ProductForm"

const Product = async ({ params }: { params: { storeId: string, productId: string } }) => {

    const product = await prismaDb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images:true
        }
    })

    const categories = await prismaDb.category.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const sizes = await prismaDb.size.findMany({
        where: {
            storeId: params.storeId
        }
    })
    const colors = await prismaDb.color.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-4 space-y-4">
                <ProductForm
                    initialData={product}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    )
}

export default Product