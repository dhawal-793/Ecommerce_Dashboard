'use client'

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation"


const MainNav = ({ className, ...props }:
    React.HTMLAttributes<HTMLElement>) => {
    const pathName = usePathname();
    const params = useParams()

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "settings",
            active: pathName === `/${params.storeId}/settings`
        },
    ]

    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>

            {
                routes.map(({ active, label, href }) => (
                    <Link key={href} href={href}
                        className={cn('text-sm font-medium transition-colors hover:text-primary', active ? 'text-black dark:text-white' : 'text-muted-foreground')}
                    >
                        {label}
                    </Link>
                ))
            }
        </nav>
    )
}

export default MainNav