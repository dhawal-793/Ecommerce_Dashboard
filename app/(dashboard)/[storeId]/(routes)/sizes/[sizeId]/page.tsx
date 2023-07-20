import prismaDb from "@/lib/prismaDb"
import SizeForm from "./components/SizeForm"

const Size = async ({ params }: { params: { sizeId: string } }) => {

    const size = await prismaDb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-4 space-y-4">
                <SizeForm initialData={size} />
            </div>
        </div>
    )
}

export default Size