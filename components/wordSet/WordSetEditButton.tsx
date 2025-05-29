"use client"

import { initialState, wordSetType } from "@/lib/validators/wordSetSchema";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useActionState, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { deleteWordSet, updateWordSet } from "@/lib/actions/wordSet";

export function WordSetEditButton({ wordSet }: { wordSet: wordSetType }) {

    const [state, formAction, isPending] = useActionState(updateWordSet, initialState)

    const [isOpen, setIsOpen] = useState(false)

    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = () => {
        deleteWordSet(wordSet.id)
    }

    return(
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <div className="cursor-pointer aspect-square w-full h-full flex flex-col items-center justify-center border border-gray-200 rounded-lg shadow-sm">
                        <PencilLine className="w-1/2 h-1/2"/>
                        <div className="text-xs text-muted-foreground">
                            編集
                        </div>
                    </div>
                </SheetTrigger>
                <SheetContent side="bottom">
                    <SheetHeader>
                        <SheetTitle>
                            {`${wordSet.name}を編集`}
                        </SheetTitle>
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
                        defaultValue={wordSet.name}
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
                        defaultValue={wordSet.description}
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
                    defaultValue={wordSet.userId}/>
                    {/*単語帳自体のid(hidden) */}
                    <input
                    type="hidden"
                    id="wordSetId"
                    name="wordSetId"
                    defaultValue={wordSet.id}
                    />
                    {/*作成ボタン */}
                    <div className=" flex justify-end gap-2">
                        <Button
                        size="lg"
                        variant="outline"
                        type="button"
                        className="border-red-500 text-red-500 hover:text-red-500"
                        onClick={() => {
                            setIsDeleting(true)
                            handleDelete()
                        }}
                        disabled={isDeleting}
                        >
                            単語帳を削除
                        </Button>
                        <Button size="lg" type="submit" disabled={isPending}>
                            保存
                        </Button>
                    </div>
                </form>
                </SheetContent>
            </Sheet>
    )
}