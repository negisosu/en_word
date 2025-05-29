import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function DashboardWordFormSkeleton () {
    return(
        <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            <Skeleton className="h-4 w-80 mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-4">
          {/* 単語帳選択 */}
          <div>
            <Skeleton className="h-10 w-full" />
          </div>
  
          {/* 自動翻訳のON/OFF */}
          <div className="flex space-x-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-40" />
          </div>
  
          {/* 入力form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 英語入力 */}
            <div className="space-y-2 sm:space-y-4">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
  
            {/* 日本語入力 */}
            <div className="space-y-2 sm:space-y-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
  
          {/* エラー表示エリア（空の状態） */}
          <div className="h-6">{/* エラーがある場合のスペースを確保 */}</div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <CardDescription className="text-xs sm:text-sm">
            <Skeleton className="h-4 w-48" />
          </CardDescription>
          <Skeleton className="h-10 w-16" />
        </CardFooter>
      </Card>
    )
}