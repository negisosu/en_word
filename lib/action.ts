"use server"

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUser, createUserState } from "./schemas";

export const createUser = async (prevState: createUserState, formData: FormData) => {
    const validatedFields = CreateUser.safeParse({
        id: formData.get("id"),
        name: formData.get("name"),
        email: formData.get("email")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.issues,
            message: "ユーザーの作成に失敗しました"
        }
    }

    try{
        await prisma.user.create({
            data: validatedFields.data
        })
    }catch(err){
        console.error(err)
        return {
            message: "ユーザーの作成に失敗しました"
        }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}