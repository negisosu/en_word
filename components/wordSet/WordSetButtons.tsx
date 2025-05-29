import { WordSetEditButton } from "./WordSetEditButton";
import { WordSetMemorizeLink } from "./WordSetMemorizeLInk";
import { getWordSet } from "@/lib/actions/wordSet";

export async function WordSetButtons({ wordSetId }: {wordSetId: string}) {

    const wordSet = await getWordSet(wordSetId, true)

    if(!wordSet){
        return(
            <div>
                情報の取得に失敗しました。時間をおいて再度お試しください。
            </div>
        )
    }

    return(
        <div className="w-full grid grid-cols-5 gap-2 my-2 sm:my-4">
            <WordSetMemorizeLink wordSet={wordSet}/>
            <WordSetEditButton wordSet={wordSet}/>
        </div>
    )
}