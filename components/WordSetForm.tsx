"use client"

import { useUser } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useActionState } from "react";
import { createWordSet } from "@/lib/actions/wordSet";
import { initialState } from "@/lib/validators/wordSetSchema";

export function WordSetForm () {

    const [state, formAction] = useActionState(createWordSet, initialState)

    const { user } = useUser()

    return(
        <SheetContent side="bottom">
            <SheetHeader>
                <SheetTitle>
                    単語帳の新規作成
                </SheetTitle>
                <SheetDescription>
                    新しく自分の単語帳を作成できます
                </SheetDescription>
            </SheetHeader>
                <form action={formAction} className="flex flex-col space-y-4 py-4 px-4">
                    {/*単語帳の名前 */}
                    <div className="space-y-2 sm:space-y-4">
                        <Label>
                            名前
                        </Label>
                        <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="例：英検3級"
                        autoComplete="off"
                        />
                        <div>
                            {state.errors && Array.isArray(state.errors) && state.errors
                            .filter(error => error.path[0] === "name")
                            .map((error, index) => (
                                <p key={index} className="my-2 text-sm text-red-500">{error.message}</p>
                            ))}
                        </div>
                    </div>
                    {/*単語帳の説明（任意） */}
                    <div className="space-y-2 sm:space-y-4">
                        <Label>
                            説明（任意）
                        </Label>
                        <Textarea
                        id="description"
                        name="description"
                        placeholder="単語帳の説明を入力（任意）"
                        />
                        <div>
                            {state.errors && Array.isArray(state.errors) && state.errors
                            .filter(error => error.path[0] === "description")
                            .map((error, index) => (
                                <p key={index} className="my-2 text-sm text-red-500">{error.message}</p>
                            ))}
                        </div>
                    </div>
                    {/*単語帳の持ち主ユーザー（hidden） */}
                    <input
                    type="hidden"
                    id="userId"
                    name="userId"
                    defaultValue={user?.id}/>
                    {/*作成ボタン */}
                    <div className=" flex justify-end">
                        <Button size="lg" type="submit">
                            作成
                        </Button>
                    </div>
                </form>
        </SheetContent>
    )
}