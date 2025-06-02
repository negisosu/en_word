"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { CreateWord, createWordState, createWordType } from "../validators/wordSchema"
import { auth } from "@clerk/nextjs/server"

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

    revalidatePath(`/dashboard/word-set/${validatedFields.data.wordSetId}`)

    return {
        success: true,
        message: "単語の作成に成功しました。"
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

    createWordBackground(validatedFields.data)

    revalidatePath(`/dashboard/word-set/${validatedFields.data.wordSetId}`)

    return {
        success: true,
        message: "単語の作成に成功しました。"
    }
}

export const createWordBackground = async (data: createWordType) => {

    const session = await auth()

    if(!session.userId){
        return new Error("単語の作成に失敗しました。")
    }

    try{
        await prisma.word.create({
            data: data
        })
        // const wordSet = await prisma.wordSet.findUnique({
        //     where: {
        //         id: word.wordSetId
        //     }
        // })
        // await prisma.activityLog.create({
        //     data: {
        //         url: `/dashboard/word-set/${word.wordSetId}`,
        //         body: `${wordSet?.name}に${word.en}を追加しました`,
        //         userId: session.userId
        //     }
        // })
    }catch(err){
        console.error(err)
        throw err
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