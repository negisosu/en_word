import { z } from "zod/v4"

export const initialState = {
    message: "",
    errors: [] as z.ZodIssue[]
} as { message: string; errors: z.ZodIssue[] }

export type createWordState = {
    errors?: {
        ja?: string[];
        en?: string[];
        wordSetId?: string[];
    } | z.ZodIssue[];
    message: string;
}

export const WordSchema = z.object({
    id: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    ja: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    en: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
    wordSetId: z.string({
        error: (issue) => issue.input === undefined ? "必須です" : "文字列を入力してください"
    }).nonempty({
        error: "1文字以上入力してください"
    }),
})

export type wordType = z.infer<typeof WordSchema>

export const CreateWord = WordSchema.omit({ id: true })

export type createWordType = z.infer<typeof CreateWord>