import { FC } from 'react'

import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prismaDb from '@/lib/prismaDb'

interface SetingsProps {
    params: {
        storeId: string
    }
}

const page: FC<SetingsProps> = async ({ params: { storeId } }) => {
    const { userId } = auth()
    if (!userId) redirect('/sign-in')
    const store = await prismaDb.store.findFirst({
        where: {
            id: storeId,
            userId
        }
    })
    if (!store) redirect('/')

    return (
        <div className='flex flex-col'>
            <div className='flex-1 p-8 pt-6 space-y-4'>
                <h1 className='text-2xl font-bold'>Settings</h1>
            </div>
        </div>
    )
}

export default page

