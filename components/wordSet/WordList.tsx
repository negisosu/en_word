"use client"

import { wordType } from "@/lib/validators/wordSchema";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteWord } from "@/lib/actions/word";
import { wordSetType } from "@/lib/validators/wordSetSchema";
import React, { useState } from "react";
import clsx from "clsx";

export function WordList({ wordSet }: { wordSet: wordSetType & { words: wordType[] } | undefined}) {

    if(!wordSet?.words){
        return <div className="flex items-center justify-between px-4 py-2 border border-red-500 text-red-500 rounded-lg transition-colors">
            単語が見つかりませんでした
        </div>
    }

    if(wordSet.words.length == 0){
        return <div className="flex items-center justify-between px-4 py-2 border rounded-lg transition-colors text-muted-foreground text-sm sm:text-lg">
            単語がまだ作成されていません
    </div>
    }

    return(
        <div>
            {wordSet.words.map((word) => (
                <React.Fragment key={word.id}>
                    <WordListOne word={word}/>
                </React.Fragment>
            ))}
        </div>
    )
}

function WordListOne({word}: {word: wordType}) {

    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    return(
        <div key={word.id} className="flex items-center justify-between px-4 py-2 border rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex-1">
            <div className="grid grid-cols-9 gap-3 text-lg">
                <div className={clsx(
                    isDeleting && "font-light text-muted-foreground",
                    "font-bold col-span-4 break-words"
                )}>{word.en}</div>
                <div className="text-muted-foreground">→</div>
                <div className={clsx(
                    isDeleting && "font-light text-muted-foreground",
                    "font-medium col-span-4 break-words"
                )}>{word.ja}</div>
            </div>
        </div>
        <form action={deleteWord.bind(null, word.id)}>
            <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setIsDeleting(!isDeleting)}
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">削除</span>
            </Button>
        </form>
    </div>
    )
}