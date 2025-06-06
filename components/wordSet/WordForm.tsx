"use client"

import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useActionState, useEffect, useState } from "react"
import {  initialState } from "@/lib/validators/wordSchema"
import { useDebounce } from "use-debounce"
import { Checkbox } from "../ui/checkbox"
import { createWord } from "@/lib/actions/word"
import { wordSetType } from "@/lib/validators/wordSetSchema"
import { useRouter } from "next/navigation"

export function WordForm({wordSet, ...props }: React.ComponentProps<typeof Card> & { wordSet: wordSetType }){

    const router = useRouter()
    const [state, formAction, isPending] = useActionState(createWord, initialState)
    const [isAutoTranslate, setIsAutoTranslate] = useState<boolean>(true)
    const [enText, setEnText] = useState("")
    const [jaText, setJaText] = useState("")
    const [jaTextPlaceholder, setJaTextPlaceholder] = useState("例：こんにちは")
    const [debounced] = useDebounce(enText, 500)

    //翻訳処理のuseEffect
    useEffect(() => {
        const handleTranslate = async () => {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ text: enText }),
            })
            const data = await res.json()
            setJaText(data.text)
            setJaTextPlaceholder("例：こんにちは")
        }

        if(!isAutoTranslate){
            return
        }

        if(enText == ""){
            setJaText("")
            setJaTextPlaceholder("例：こんにちは")
            return
        }else{
            setJaText("")
            setJaTextPlaceholder("翻訳中...")
        }

        if(debounced){
            handleTranslate()
        }
    },[enText, debounced, isAutoTranslate])

    useEffect(() => {
        if(state.success && !isPending){
            setEnText("")
            setJaText("")
            router.refresh()
        }
    },[state.success, isPending, router])

    return(
        <form action={formAction}>
            <Card {...props}>
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                        新しい単語を追加
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        この単語帳に単語を追加できます
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-4">
                    {/*自動翻訳のON/OFF */}
                    <div className="flex space-x-2">
                        <Checkbox checked={isAutoTranslate} onCheckedChange={() => setIsAutoTranslate(!isAutoTranslate)}/>
                        <Label className="text-muted-foreground">英語の自動翻訳を有効化</Label>
                    </div>
                    {/*入力form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*単語帳ID入力(hidden) */}
                        <input
                        type="hidden"
                        id="wordSetId"
                        name="wordSetId"
                        defaultValue={wordSet.id}
                        />
                        {/*英語入力 */}
                        <div className="space-y-2 sm:space-y-4">
                            <Label>英語</Label>
                            <Input
                            type="text"
                            id="en"
                            name="en"
                            placeholder="例：hello"
                            autoComplete="off"
                            value={enText}
                            onChange={(e) => setEnText(e.target.value)}
                            />
                        </div>
                        {/*日本語入力 */}
                        <div className="space-y-2 sm:space-y-4">
                            <Label>日本語</Label>
                            <Input
                            type="text"
                            id="ja"
                            name="ja"
                            placeholder={jaTextPlaceholder}
                            autoComplete="off"
                            value={jaText}
                            onChange={(e) => setJaText(e.target.value)}
                            />
                        </div>
                    </div>
                    {/*エラー表示 */}
                    <div>
                        {state?.errors && Array.isArray(state.errors) && state.errors
                        .filter(error => error.path[0] === "ja" || error.path[0] === "en")
                        .map((error, index) => (
                            <p key={index} className="my-2 text-sm text-red-500">{error.path[0] === "ja" && "日本語"}{error.path[0] === "en" && "英語"}:{error.message}</p>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className=" flex justify-between items-center">
                    <CardDescription className="text-xs sm:text-sm">
                        Enterまたは右のボタンで作成
                    </CardDescription>
                    <Button size="lg" type="submit" className="text-sm sm:text-lg" disabled={jaTextPlaceholder == "翻訳中..." || isPending}>
                        作成
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}