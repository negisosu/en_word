import { z } from "zod/v4"

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