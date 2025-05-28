import { MyDescription } from "@/components/MyDescription"
import { MySubTitle } from "@/components/MySubTitle"
import { MyTitle } from "@/components/MyTitle"
import { WordForm } from "@/components/WordForm"
import { WordList } from "@/components/WordList"
import { getWordSet } from "@/lib/actions/wordSet"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const wordSet = await getWordSet(id, true)

    const session = await auth()

    if(!wordSet){
        return <div>
            情報の取得に失敗しました。時間をおいて再度お試しください。
        </div>
    }

    if(wordSet?.userId != session.userId){
        notFound()
    }

    return(
        <div>
            <MyTitle>
                {wordSet?.name}
            </MyTitle>
            <MyDescription>
                {wordSet.description}
            </MyDescription>
            <WordForm wordSet={wordSet}/>
            <MySubTitle>
                単語一覧
            </MySubTitle>
            <WordList wordSet={wordSet}/>
        </div>
    )
}