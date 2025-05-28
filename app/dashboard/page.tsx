import { DashboardWordForm } from "@/components/DashboardWordForm";
import { MyDescription } from "@/components/MyDescription";
import { MyTitle } from "@/components/MyTitle";
import { getUserWordSets } from "@/lib/actions/wordSet";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {

    const { userId } = await auth()

    if(!userId){
        redirect("/")
    }

    const wordSets = await getUserWordSets(userId)

    if(!wordSets){
        redirect("/")
    }

    return(
        <div>
            <MyTitle>
                ダッシュボード
            </MyTitle>
            <MyDescription>
                単語帳全体の確認や新しい単語の追加ができます
            </MyDescription>
            <DashboardWordForm wordSets={wordSets} className="w-full"/>
        </div>
    )
}