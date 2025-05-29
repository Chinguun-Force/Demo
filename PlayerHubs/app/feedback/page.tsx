import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Санал хүсэлт</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Санал хүсэлт илгээх</CardTitle>
              <CardDescription>Таны санал хүсэлт бидэнд чухал. Системийг сайжруулахад тусална уу.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Нэр</Label>
                  <Input id="name" placeholder="Таны нэр" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">И-мэйл</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Ангилал</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Санал хүсэлтийн төрөл сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Алдаа мэдээлэх</SelectItem>
                    <SelectItem value="feature">Шинэ функц санал болгох</SelectItem>
                    <SelectItem value="improvement">Сайжруулалт</SelectItem>
                    <SelectItem value="question">Асуулт</SelectItem>
                    <SelectItem value="other">Бусад</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Гарчиг</Label>
                <Input id="subject" placeholder="Санал хүсэлтийн гарчиг" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Мессеж</Label>
                <Textarea id="message" placeholder="Дэлгэрэнгүй тайлбар бичнэ үү..." className="min-h-[120px]" />
              </div>

              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Илгээх
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
