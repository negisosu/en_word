import { wordSetType } from "@/lib/validators/wordSetSchema";
import { WordSetEditButton } from "./WordSetEditButton";
import { WordSetMemorizeLink } from "./WordSetMemorizeLInk";

export function WordSetButtons({ wordSet }: { wordSet: wordSetType}) {
    return(
        <div className="w-full grid grid-cols-5 gap-2 my-2 sm:my-4">
            <WordSetMemorizeLink wordSet={wordSet}/>
            <WordSetEditButton wordSet={wordSet}/>
        </div>
    )
}