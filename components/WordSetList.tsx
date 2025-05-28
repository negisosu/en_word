"use client"

import { wordSetType } from "@/lib/validators/wordSetSchema";
import { MySubTitle } from "./MySubTitle";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function WordSetList({ wordSets }: { wordSets: wordSetType[]}) {

    return(
        <div>
            <MySubTitle>
                単語帳一覧
            </MySubTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wordSets.map((wordSet) => (
                    <Link key={wordSet.id} href={`/dashboard/word-set/${wordSet.id}`} className="w-full">
                        <Card className="grid h-32">
                            <CardHeader>
                                <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {wordSet.name}
                                </CardTitle>
                                <CardDescription className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {wordSet.description}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>

                ))}
            </div>
        </div>
    )
}