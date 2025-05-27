"use client"

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label"
import { createUser } from "@/lib/actions/user";
import { useUser } from "@clerk/nextjs";
import { initialState } from "@/lib/validators/userSchema";

export function OnboardingForm() {

    const { user } = useUser()

    const [state, formAction] = useActionState(createUser, initialState)

    return(
        <form action={formAction}>
        <Card className="w-80 sm:w-96">
            <CardHeader className="space-y-4 sm:space-y-8">
                <CardTitle className="text-center text-lg sm:text-xl">
                    ユーザー新規登録
                </CardTitle>
                <CardDescription className="text-center text-xs sm:text-sm">
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
                <Label htmlFor="name" className="my-2 sm:my-4">
                    名前
                </Label>
                <Input
                type="text"
                id="name"
                name="name"
                placeholder="ユーザーネーム"
                autoComplete="off"
                className="text-sm sm:text-lg"
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
                <Button type="submit" className="w-full text-sm sm:text-lg">
                    登録
                </Button>
            </CardFooter>
        </Card>
        </form>
    )
}