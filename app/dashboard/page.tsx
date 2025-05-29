import { MyDescription } from "@/components/MyDescription";
import { MyTitle } from "@/components/MyTitle";
import { DashboardWordFormSkeleton } from "@/components/skeletons/DashboardWordFormSkeleton";
import { DashboardWordFormWrapper } from "@/components/wrappers/DashboardWordFormWrapper";
import { Suspense } from "react";

export default async function Page() {

    return(
        <div>
            <MyTitle>
                ダッシュボード
            </MyTitle>
            <MyDescription>
                単語帳全体の確認や新しい単語の追加ができます
            </MyDescription>
            <Suspense fallback={<DashboardWordFormSkeleton/>}>
                <DashboardWordFormWrapper/>
            </Suspense>
        </div>
    )
}