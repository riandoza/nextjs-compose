import { object, string, TypeOf } from "zod"

export const KeywordSchema = object({
    keyword: string({ required_error: "masukkan keyword atau nama website" }).min(4, "kata kunci minimal 4 karakter"),
})

export type KeywordSchemaType = TypeOf<typeof KeywordSchema>
