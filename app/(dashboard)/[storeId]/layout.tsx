import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"



export default async function DashboardLayout(
    { children, params }:
        { children: React.ReactNode, params: any }
) {
    const { userId } = auth()
    if (!userId) redirect('/sign-in')

    const store = await prismaDb.store.findFirst({
        where: {
            id: params.storeId, userId
        }
    })

    if (!store) redirect('/')
    return (
        <>
            <div>
                This wil be Navbar
            </div>
            {children}
        </>
    )
}