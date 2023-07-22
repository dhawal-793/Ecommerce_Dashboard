import prismaDb from "@/lib/prismaDb"
import ColorForm from "./components/ColorForm"

const Color = async ({ params }: { params: { colorId: string } }) => {

    const color = await prismaDb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-4 space-y-4">
                <ColorForm initialData={color} />
            </div>
        </div>
    )
}

export default Color