"use server"

import { redirect } from "next/navigation"
import { getWordSet } from "@/lib/actions/wordSet"
import { WordForm } from "../wordSet/WordForm"

export async function WordFormWrapper({ wordSetId }: { wordSetId: string }) {

    const wordSet = await getWordSet(wordSetId)
    if(!wordSet){
        redirect("/")
    }

    return(
        <>
            <WordForm wordSet={wordSet}/>
        </>
    )
}