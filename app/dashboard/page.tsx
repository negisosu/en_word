import { MyDescription } from "@/components/myTemplates/MyDescription";
import { MyTitle } from "@/components/myTemplates/MyTitle";
import { DashboardWordFormSkeleton } from "@/components/skeletons/DashboardWordFormSkeleton";
import { DashboardWordFormWrapper } from "@/components/wrappers/DashboardWordFormWrapper";
import { WordSetListWrapper } from "@/components/wrappers/WordSetListWrapper";
import Link from "next/link";
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
            <Suspense>
                <WordSetListWrapper/>
                <MyDescription>
                    <Link href={"/dashboard/word-set"}>
                    もっと見る→
                    </Link>
                </MyDescription>
            </Suspense>
        </div>
    )
}