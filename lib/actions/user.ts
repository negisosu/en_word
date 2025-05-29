"use server"

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateUser, createUserState, userType } from "../validators/userSchema";

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

    createUserBackground(validatedFields.data)

    revalidatePath("/dashboard")
    redirect("/dashboard")
}

export const createUserBackground = async (data: userType) => {
    try{
        await prisma.user.create({
            data: data
        })
        // await prisma.activityLog.create({
        //     data: {
        //         url: "/dashboard/guide",
        //         body: "ユーザーを作成しました！使い方を見てみましょう！",
        //         userId: user.id
        //     }
        // })
    }catch(err){
        console.error(err)
        throw err
    }
}

export const createDefaultWordSet = async (userId: string) => {

    try{
        await prisma.wordSet.create({
            data: {
                name: "最初の単語帳",
                description: "",
                userId: userId,
            }
        })
    }catch(err){
        console.error(err)
        return {
            message: '単語帳の作成に失敗しました'
        }
    }
}

export const isUserExist = async (id: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    if(user){
        return true
    }else {
        return false
    }
}

export const getUser = async (id: string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    }catch(err){
        console.error(err)
        throw err
    }
}