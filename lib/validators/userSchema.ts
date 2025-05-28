import { z } from "zod/v4"

export const initialState = {
    message: "",
    errors: undefined
}

export type createUserState = {
    errors?: {
        id?: string[];
        name?: string[];
        email?: string[];
    } | z.ZodIssue[];
    message: string;
}

export const UserSchema = z.object({
    id: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }),
    name: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    email: z.email({
        error: (issue) => issue.input === undefined ? "必須です" : "emailを入力してください"
    }),
})

export const CreateUser = UserSchema
