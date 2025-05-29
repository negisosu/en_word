import { wordSetType } from "@/lib/validators/wordSetSchema";
import { WordSetEditButton } from "./WordSetEditButton";
import { WordSetMemorizeLink } from "./WordSetMemorizeLInk";
import { wordType } from "@/lib/validators/wordSchema";

export function WordSetButtons({ wordSet }: { wordSet: wordSetType & { words: wordType []}}) {
    return(
        <div className="w-full grid grid-cols-5 gap-2 my-2 sm:my-4">
            <WordSetMemorizeLink wordSet={wordSet}/>
            <WordSetEditButton wordSet={wordSet}/>
        </div>
    )
}