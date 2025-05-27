"use client"

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/Label"
import { createUser } from "@/lib/action";
import { useUser } from "@clerk/nextjs";
import { initialState } from "@/lib/schemas";

export function OnboardingForm() {

    const { user } = useUser()

    const [state, formAction] = useActionState(createUser, initialState)

    return(
        <form action={formAction}>
        <Card className="w-80">
            <CardHeader className="space-y-4">
                <CardTitle className="text-center">
                    ユーザー新規登録
                    </CardTitle>
                <CardDescription>
                    サービスを開始するために、あなたのお名前を教えてください
                </CardDescription>
            </CardHeader>
            <CardContent>
                <input
                type="hidden"
                id="id"
                name="id"
                defaultValue={user?.id}
                />
                <Label htmlFor="name" className="my-2 text-sm">
                    名前
                </Label>
                <Input
                type="text"
                id="name"
                name="name"
                placeholder="ユーザーネーム"
                autoComplete="off"
                />
                {state.errors && Array.isArray(state.errors) && state.errors
                    .filter(error => error.path[0] === 'name')
                    .map((error, index) => (
                        <p key={index} className="my-2 text-sm text-red-500">{error.message}</p>
                    ))}
                <input
                type="hidden"
                id="email"
                name="email"
                defaultValue={user?.primaryEmailAddress?.emailAddress}
                />
        </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full">
                    登録
                </Button>
            </CardFooter>
        </Card>
        </form>
    )
}