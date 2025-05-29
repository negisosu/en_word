import { MyDescription } from "@/components/myTemplates/MyDescription";
import { MyTitle } from "@/components/myTemplates/MyTitle";
import { WordSetList } from "@/components/wordSet/WordSetList";
import { getUserWordSets } from "@/lib/actions/wordSet";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {

    const { userId } = await auth()

    if(!userId){
        redirect("/")
    }

    const wordSets = await getUserWordSets(userId)

    console.log(wordSets)

    return(
        <div>
            <MyTitle>
                単語帳
            </MyTitle>
            <MyDescription>
                作成した単語帳をすべて確認できます
            </MyDescription>
            <WordSetList wordSets={wordSets}/>
        </div>
    )
}