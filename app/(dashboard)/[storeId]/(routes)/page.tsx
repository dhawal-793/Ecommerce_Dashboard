import { FC } from 'react'
import { CreditCard, IndianRupee, Package } from "lucide-react";

import { getTotalRevenue } from '@/actions/getTotalRevenue';
import { getStocksCount } from '@/actions/getStocksCount';
import { getTotalSales } from '@/actions/getTotalSales';
import { formatter } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";

interface DashboardPageProps {
    params: {
        storeId: string
    }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
    const totalRevenue = await getTotalRevenue(params.storeId)
    const salesCount = await getTotalSales(params.storeId)
    const StocksCount = await getStocksCount(params.storeId)

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Heading title="Dashboard" description="Overview of your Store" />
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
                            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
                            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
                            <Package className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {StocksCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage