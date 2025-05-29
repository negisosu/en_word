import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"

const lpFunction = [
    {
        title: "単語をすぐに追加",
        description: "覚えたい単語をダッシュボードからすぐに登録できます。"
    },
    {
        title: "英語を自動翻訳",
        description: "英語を入力すれば自動で翻訳され、翻訳結果も登録されます。"
    },
    {
        title: "英語を覚える",
        description: "もちろん英単語帳というからには現実のように単語帳として使えます。"
    }
]


export default function LP() {
    return (
        <div className="min-h-screen w-full bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        英単語帳
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">簡単なUIの英単語帳</h1>
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
                            <Image
                            src={"/lp-image.png"}
                            alt=""
                            width={10000}
                            height={10000}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">主な機能</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">覚えたい単語を見つけたらダッシュボードからすぐに気軽に登録することができます。</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {lpFunction.map((func, i) => (
                        <Card key={i}>
                            <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                                <Check className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>{func.title}</CardTitle>
                            <CardDescription>
                                {func.description}
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
