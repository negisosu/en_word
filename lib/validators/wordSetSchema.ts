import { z } from "zod/v4"

export const initialState = {
    message: "",
    errors: undefined
}

export type createWordSetState = {
    errors?: {
        name?: string[],
        description?: string[],
        userId?: string[],
    } | z.ZodIssue[];
    message: string;
}

export const WordSetSchema = z.object({
    id: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    name: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    description: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }),
    is_public: z.boolean({
        error: "真偽値を入力してください"
    }),
    userId: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
})

export type wordSetType = z.infer<typeof WordSetSchema>

export const CreateWordSet = WordSetSchema.omit({ id: true, is_public: true })
export const UpdateWordSet = CreateWordSet.extend({ wordSetId: z.string().nonempty() })