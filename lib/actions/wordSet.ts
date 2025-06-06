"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { CreateWordSet, createWordSetState, UpdateWordSet } from "../validators/wordSetSchema"
import { redirect } from "next/navigation"

export const getUserWordSets = async (userId: string, limit: number = 100, skip: number = 1) => {
    try{
        const wordSets = await prisma.wordSet.findMany({
            where: {
                userId: userId
            },
            skip: (skip - 1) * limit,
            take: limit
        })
        return wordSets
    }catch(err){
        console.error(err)
        throw err
    }
}

export const getWordSet = async (wordSetId: string, includeWord: boolean = false) => {
    try{
        const wordSet = await prisma.wordSet.findUnique({
            where: {
                id: wordSetId
            },
            include: {
                words: includeWord
            }
        })
        return wordSet
    }catch(err){
        console.error(err)
        throw err
    }
}

export const createWordSet = async (prevState: createWordSetState, formData: FormData) => {
    const validatedFields = CreateWordSet.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        userId: formData.get("userId")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.issues,
            message: "単語帳の作成に失敗しました"
        }
    }

    let wordSetId = ""

    try{
        const wordSet = await prisma.wordSet.create({
            data: validatedFields.data
        })
        wordSetId = wordSet.id
    }catch(err){
        console.error(err)
        return {
            message: "単語帳の作成に失敗しました"
        }
    }

    revalidatePath(`/dashboard/word-set/${wordSetId}`)
    redirect(`/dashboard/word-set/${wordSetId}`)
}

export const updateWordSet = async (prevState: createWordSetState, formData: FormData) => {
    const validatedFields = UpdateWordSet.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        userId: formData.get("userId"),
        wordSetId: formData.get("wordSetId")
    })

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.issues,
            message: "単語帳の更新に失敗しました"
        }
    }

    const { name, description, userId, wordSetId } = validatedFields.data

    try{
        await prisma.wordSet.update({
            where: {
                id: wordSetId
            },
            data: {
                name: name,
                description: description,
                userId: userId
            }
        })
    }catch(err){
        console.error(err)
        return {
            message: "単語帳の更新に失敗しました"
        }
    }

    revalidatePath(`/dashboard/word-set/${wordSetId}`)
    redirect(`/dashboard/word-set/${wordSetId}`)
}

export const deleteWordSet = async (wordSetId: string) => {
    try{
        await prisma.wordSet.delete({
            where: {
                id: wordSetId
            }
        })
    }catch(err){
        console.error(err)
        throw err
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}