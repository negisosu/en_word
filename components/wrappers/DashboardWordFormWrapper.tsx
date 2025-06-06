"use server"

import { auth } from "@clerk/nextjs/server"
import { DashboardWordForm } from "../DashboardWordForm"
import { redirect } from "next/navigation"
import { getUserWordSets } from "@/lib/actions/wordSet"

export async function DashboardWordFormWrapper() {

    const { userId } = await auth()
    if(!userId){
        redirect("/")
    }

    const wordSets = await getUserWordSets(userId)
    if(!wordSets){
        redirect("/")
    }

    return(
        <>
            <DashboardWordForm wordSets={wordSets}/>
        </>
    )
}