import { TranslationServiceClient } from "@google-cloud/translate"
import { NextRequest, NextResponse } from "next/server";

const client = new TranslationServiceClient()
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
const location = "global"

export async function POST(req: NextRequest) {
    const { text } = await req.json()

    const [response] = await client.translateText({
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain',
        sourceLanguageCode: 'en',
        targetLanguageCode: 'ja',
    })

    return NextResponse.json({ text: response.translations?.[0]?.translatedText})
}