import { Memorize } from "@/components/wordSet/Memorize";
import { MyDescription } from "@/components/myTemplates/MyDescription";
import { MyTitle } from "@/components/myTemplates/MyTitle";
import { getRandomWords } from "@/lib/actions/word";
import { getWordSet } from "@/lib/actions/wordSet";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const wordSet = await getWordSet(id, true)

    if(!wordSet){
        return <div>
            情報の取得に失敗しました。時間をおいて再度お試しください。
        </div>
    }

    const randomWords = await getRandomWords(wordSet.id)

    return(
        <div className="h-full">
            <MyTitle>
                {`${wordSet.name}を覚える`}
            </MyTitle>
            <MyDescription>
                単語はランダムに表示されます
            </MyDescription>
            <Memorize wordSet={wordSet} randomWords={randomWords}/>
        </div>
    )
}