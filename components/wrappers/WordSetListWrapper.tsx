"use server"

import { getUserWordSets } from "@/lib/actions/wordSet"
import { auth } from "@clerk/nextjs/server"
import { WordSetList } from "../wordSet/WordSetList"

export async function WordSetListWrapper () {

    const session = await auth()

    if(!session.userId){
        return(
            <div>
                情報の取得に失敗しました。時間をおいて再度お試しください。
            </div>
        )
    }

    const wordSets = await getUserWordSets(session.userId, 4)

    return(
        <>
            <WordSetList wordSets={wordSets}/>
        </>
    )
}