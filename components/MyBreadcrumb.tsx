"use client"

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";

export function MyBreadcrumb() {

    const pathname = usePathname()

    const splitPathname = pathname.split("/")

    return(
        <Breadcrumb>
            <BreadcrumbList>
            {
            splitPathname.map((path, i) => {
                return(<React.Fragment key={i}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={path == "" ? "/" : splitPathname.slice(0, i + 1).join("/")}>
                            {path == "" ? "/" : path}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {splitPathname.length != i + 1 && <BreadcrumbSeparator/>}
                </React.Fragment>
                )
            })
            }
            </BreadcrumbList>
        </Breadcrumb>
    )
}