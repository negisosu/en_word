"use client"

import { Button } from "@/components/ui/button";
import React, {  useEffect, useState } from "react";
import clsx from "clsx";
import { wordType } from "@/lib/validators/wordSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { wordSetType } from "@/lib/validators/wordSetSchema";

export function Memorize({ wordSet, randomWords }: { wordSet: wordSetType, randomWords: wordType[]}) {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isJa, setIsJa] = useState(false)

    useEffect(() => {
        if(randomWords.length <= currentIndex){
            redirect(`/dashboard/word-set/${wordSet.id}`)
        }
    },[wordSet,randomWords,currentIndex])

    return(
        <div className="h-5/6 grid grid-rows-7 gap-8">
            <div className="row-span-6">
                {randomWords.map((word, i) => (
                    <div className={clsx(i != currentIndex && "hidden", "h-full grid grid-rows-2 gap-4")} key={i}>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    英語
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-full">
                                <div className="text-4xl h-full flex items-center">
                                    {word.en}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={clsx(isJa ? "" : " invisible")}>
                            <CardHeader>
                                <CardTitle>
                                    日本語
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-full">
                                <div className="text-4xl h-full flex items-center">
                                    {word.ja}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <div className=" row-span-1 flex items-center">
                <Button
                size="lg"
                className={clsx(
                    isJa ? "" : "hidden",
                    "w-full"
                )}
                onClick={() => {
                    setIsJa(false)
                    setCurrentIndex(currentIndex + 1)
                }}
                >
                    次へ
                </Button>
                <Button
                size="lg"
                className={clsx(
                    isJa ? "hidden" : "",
                    "w-full"
                )}
                onClick={() => setIsJa(true)}
                >
                    日本語を表示
                </Button>
            </div>
        </div>
    )
}