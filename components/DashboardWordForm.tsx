"use client"

import { wordSetType } from "@/lib/validators/wordSetSchema"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select"
import { useActionState, useEffect, useState } from "react"
import {  initialState } from "@/lib/validators/wordSchema"
import { useDebounce } from "use-debounce"
import { Checkbox } from "./ui/checkbox"
import { createDashboardWord } from "@/lib/actions/word"
import { Plus } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { WordSetForm } from "./WordSetForm"

export function DashboardWordForm({ wordSets }: { wordSets: wordSetType[] }){

    const [state, formAction, isPending] = useActionState(createDashboardWord, initialState)
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
        }
    },[state.success, isPending])

    if(wordSets.length === 0){
        return(
            <div>
                <h3 className="text-xl my-2 sm:my-4">まだあなたの単語帳はありません。新しく作ってみましょう！</h3>
                <Sheet>
                    <SheetTrigger asChild>
                        <div className="w-1/4 border aspect-square rounded-lg shadow-sm flex flex-col items-center justify-center">
                            <Plus className="w-1/2 h-1/2"/>
                            <div className="text-xs">新規作成</div>
                        </div>
                    </SheetTrigger>
                    <WordSetForm/>
                </Sheet>
            </div>
        )
    }

    return(
        <form action={formAction}>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                        新しい単語を追加
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        選択した単語帳にダッシュボードから単語を追加できます
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-4">
                    {/*単語帳選択 */}
                    <div>
                        <Select defaultValue={wordSets[0].id} name="wordSetId">
                            <SelectTrigger>
                                <SelectValue placeholder="単語帳を選択"/>
                            </SelectTrigger>
                            <SelectContent>
                                {wordSets.map((wordSet) => (
                                    <SelectItem key={wordSet.id} value={wordSet.id}>
                                        {wordSet.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {/*自動翻訳のON/OFF */}
                    <div className="flex space-x-2">
                        <Checkbox checked={isAutoTranslate} onCheckedChange={() => setIsAutoTranslate(!isAutoTranslate)}/>
                        <Label className="text-muted-foreground">英語の自動翻訳を有効化</Label>
                    </div>
                    {/*入力form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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