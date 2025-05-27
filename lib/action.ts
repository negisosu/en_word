"use server"

import { prisma } from "./prisma"

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