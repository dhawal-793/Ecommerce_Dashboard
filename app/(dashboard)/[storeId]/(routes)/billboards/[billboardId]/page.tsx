import prismaDb from "@/lib/prismaDb"
import BillboardForm from "./components/BillboardForm"

const Billboard = async ({ params }: { params: { billboardId: string } }) => {

    const billboard = await prismaDb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-4 space-y-4">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}

export default Billboard