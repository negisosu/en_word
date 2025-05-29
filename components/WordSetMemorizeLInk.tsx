import { wordType } from "@/lib/validators/wordSchema";
import { wordSetType } from "@/lib/validators/wordSetSchema";
import clsx from "clsx";
import { Languages } from "lucide-react";
import Link from "next/link";

export function WordSetMemorizeLink({wordSet}: { wordSet: wordSetType & { words: wordType[] }}) {

    return(
        <Link
        className={clsx(
            wordSet.words.length === 0 ? "hidden" : "",
            "col-span-2"
        )}
        href={`/dashboard/word-set/${wordSet.id}/memorize`}
        >
            <div className="cursor-pointer w-full h-full flex flex-col items-center justify-center border border-gray-200 rounded-lg shadow-sm">
                <Languages className="w-1/2 h-1/2"/>
                <div className="text-xs text-muted-foreground">
                    覚える
                </div>
            </div>
        </Link>
    )
}