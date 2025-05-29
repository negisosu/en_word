"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { CreateWord, createWordState, createWordType } from "../validators/wordSchema"
import { redirect } from "next/navigation"

export const createDashboardWord = async (prevState: createWordState, formData: FormData) => {
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

    createWordBackground(validatedFields.data)

    revalidatePath("/dashboard")
    redirect("/dashboard")
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
    
    createWordBackground(validatedFields.data)

    revalidatePath(`/dashboard/word-set/${validatedFields.data.wordSetId}`)
    redirect(`/dashboard/word-set/${validatedFields.data.wordSetId}`)
}

export const createWordBackground = async (data: createWordType) => {

    try{
        await prisma.word.create({
            data: data
        })
    }catch(err){
        console.error(err)
        return {
            message: "単語の作成に失敗しました"
        }
    }
}

export const deleteWord = async (wordId: string) => {
    try {
        await prisma.word.delete({
            where: {
                id: wordId
            }
        })
        revalidatePath("/dashboard")
    } catch (err) {
        console.error(err)
        throw new Error("単語の削除に失敗しました")
    }
}

export const getRandomWords = async (wordSetId: string) => {
    try{
        const words = await prisma.$queryRaw<{id: string; en: string; ja: string; wordSetId: string }[]>`SELECT en, ja FROM "Word" WHERE "wordSetId" = ${wordSetId} ORDER BY RANDOM() LIMIT 100`
        return words
    }catch(err){
        console.error(err)
        throw err
    }
}