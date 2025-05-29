import { MyDescription } from "@/components/myTemplates/MyDescription"
import { MySubTitle } from "@/components/myTemplates/MySubTitle"
import { MyTitle } from "@/components/myTemplates/MyTitle"
import { DashboardWordFormSkeleton } from "@/components/skeletons/DashboardWordFormSkeleton"
import { WordSetButtonsSkeleton } from "@/components/skeletons/WordSetButtonsSkeleton"
import { WordList } from "@/components/wordSet/WordList"
import { WordSetButtons } from "@/components/wordSet/WordSetButtons"
import { WordFormWrapper } from "@/components/wrappers/WordFormWrapper"
import { getWordSet } from "@/lib/actions/wordSet"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { Suspense } from "react"

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
            <Suspense fallback={<WordSetButtonsSkeleton/>}>
                <WordSetButtons wordSetId={id}/>
            </Suspense>
            <Suspense fallback={<DashboardWordFormSkeleton/>}>
                <WordFormWrapper wordSetId={id}/>
            </Suspense>
            <MySubTitle>
                単語一覧
            </MySubTitle>
            <WordList wordSet={wordSet}/>
        </div>
    )
}