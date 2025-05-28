// import { TranslationServiceClient } from "@google-cloud/translate"
import { NextRequest, NextResponse } from "next/server";

// const client = new TranslationServiceClient()
// const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
// const location = "global"

export async function POST(req: NextRequest) {
    const { text } = await req.json()

    // const [response] = await client.translateText({
    //     parent: `projects/${projectId}/locations/${location}`,
    //     contents: [text],
    //     mimeType: 'text/plain',
    //     sourceLanguageCode: 'en',
    //     targetLanguageCode: 'ja',
    // })

    const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_CLOUD_API_KEY}`,
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                q: text,
                source: "en",
                target: "ja",
                format: "text"
            })
        }
        )

    const { data } = await res.json()

    return NextResponse.json({ text: data.translations[0].translatedText })
}