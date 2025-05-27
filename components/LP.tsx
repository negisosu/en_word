import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"


export default function LP() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        ロゴ
                    </div>
                    <SignedIn>
                            <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <div className="space-x-4">
                            <Button asChild variant={"outline"}>
                                <SignInButton forceRedirectUrl={"/dashboard"}>
                                    Googleでログイン
                                </SignInButton>
                            </Button>
                        </div>
                    </SignedOut>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <Badge variant="secondary" className="mb-4">
                        2025/5/29 リリース
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">簡単なUIの単語帳</h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        覚えたい単語を見つけたとき、すぐに登録できます。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={"/dashboard"}>
                            <Button size="lg" className="text-lg px-8">
                            ダッシュボードへ
                            </Button>
                        </Link>
                        <SignedOut>
                            <Button asChild variant={"outline"} size="lg" className="hidden sm:block text-lg px-8">
                                <SignInButton forceRedirectUrl={"/dashboard"}>
                                    Googleでログイン
                                </SignInButton>
                            </Button>
                        </SignedOut>
                    </div>
                    <div className="mt-12">
                        <div className="bg-muted rounded-lg p-8 max-w-4xl mx-auto">
                            <p className="text-muted-foreground mb-4">ここに製品画像やデモ動画を配置</p>
                            <div className="aspect-video bg-background rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                                <p className="text-muted-foreground">画像・動画エリア</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">主な機能</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">ここに機能の概要説明を入力してください</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Check className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>機能タイトル {i}</CardTitle>
                            <CardDescription>
                                ここに機能の説明を入力してください。ユーザーにとってのメリットを明確に伝えましょう。
                            </CardDescription>
                            </CardHeader>
                        </Card>
                        ))}
                    </div>
                </div>
            </section>

{/*　あとでQ&Aとかアンケートで使うかも */}
      {/* CTA Section
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">今すぐ始めませんか？</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">ここに行動を促すメッセージを入力してください</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="メールアドレスを入力" className="bg-background text-foreground" />
            <Button variant="secondary" size="lg">
              無料で始める
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-75">クレジットカード不要・いつでもキャンセル可能</p>
        </div>
      </section> */}

      {/* Footer */}
        <footer className="border-t py-12">
        <div className=" mt-8 pt-8 text-center text-muted-foreground">
            <p>作者：negigi0404@gmail.com</p>
        </div>
        </footer>
    </div>
  )
}
