import prismaDb from "@/lib/prismaDb"
import CategoryForm from "./components/CategoryForm"

const Category = async ({ params }: { params: { categoryId: string ,storeId:string} }) => {

    const category = await prismaDb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })

    const billoards = await prismaDb.billboard.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-4 space-y-4">
                <CategoryForm initialData={category} billboards={billoards} />
            </div>
        </div>
    )
}

export default Category