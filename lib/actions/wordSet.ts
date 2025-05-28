"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { CreateWord, createWordState } from "../validators/wordSchema"
import { redirect } from "next/navigation"

export const getUserWordSets = async (userId: string) => {
    try{
        const wordSets = await prisma.wordSet.findMany({
            where: {
                userId: userId
            }
        })
        return wordSets
    }catch(err){
        console.error(err)
        throw err
    }
}

export const createWord = async (prevState: createWordState, formData: FormData) => {
    const validatedFields = CreateWord.safeParse({
        ja: formData.get("ja"),
        en: formData.get("en"),
        wordSetId: formData.get("wordSetId"),
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.issues,
            message: "単語の作成に失敗しました。"
        }
    }

    try{
        await prisma.word.create({
            data: validatedFields.data
        })
    }catch(err){
        console.error(err)
        return {
            message: "単語の作成に失敗しました"
        }
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}