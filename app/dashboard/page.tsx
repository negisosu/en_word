import { MyDescription } from "@/components/MyDescription";
import { MyTitle } from "@/components/MyTitle";
import { DashboardWordFormWrapper } from "@/components/wrappers/DashboardWordFormWrapper";

export default async function Page() {

    return(
        <div>
            <MyTitle>
                ダッシュボード
            </MyTitle>
            <MyDescription>
                単語帳全体の確認や新しい単語の追加ができます
            </MyDescription>
            <DashboardWordFormWrapper/>
        </div>
    )
}