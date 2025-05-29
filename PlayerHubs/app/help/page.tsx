import Link from "next/link"
import { ArrowLeft, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HelpPage() {
  const helpTopics = [
    {
      title: "Эхлэх гарын авлага",
      description: "Системийг хэрхэн ашиглах талаар суралцах",
      articles: ["Бүртгүүлэх", "Профайл тохируулах", "Анхны үнэлгээ"],
    },
    {
      title: "Техникийн үнэлгээ",
      description: "Үнэлгээний талаар дэлгэрэнгүй мэдээлэл",
      articles: ["Үнэлгээ хэрхэн өгөх", "Оноо тооцох", "Дахин өгөх боломж"],
    },
    {
      title: "Лидерборд",
      description: "Зэрэглэл болон оноо системийн тухай",
      articles: ["Оноо хэрхэн тооцогдох", "Зэрэглэл харах", "Шагнал системийн тухай"],
    },
    {
      title: "Тохиргоо",
      description: "Хувийн тохиргоо болон нууцлал",
      articles: ["Профайл засах", "Нууцлалын тохиргоо", "Мэдэгдэл удирдах"],
    },
  ]

  const faqs = [
    {
      question: "Үнэлгээг хэдэн удаа өгч болох вэ?",
      answer: "Ихэнх үнэлгээг дахин өгөх боломжтой. Гэхдээ зарим тусгай үнэлгээг зөвхөн нэг удаа өгөх боломжтой.",
    },
    {
      question: "Миний оноо хэрхэн тооцогдох вэ?",
      answer: "Оноо нь үнэлгээний үр дүн, хариултын зөвтэй байдал, хугацааны дагуу тооцогдоно.",
    },
    {
      question: "Профайлаа хэрхэн нуух вэ?",
      answer: 'Тохиргоо хэсэгт очиж "Профайл харагдах" сонголтыг унтрааж болно.',
    },
  ]

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
            <h1 className="text-xl font-semibold text-gray-900">Тусламж</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Тусламжийн төв</h2>
            <p className="text-gray-600 mb-6">Та юу хайж байна?</p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Хайх..." className="pl-10" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Сэдвүүд</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {helpTopics.map((topic, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {topic.title}
                      <ChevronRight className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {topic.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>• {article}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Түгээмэл асуултууд</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Илүү тусламж хэрэгтэй юу?</CardTitle>
              <CardDescription>Хэрэв таны асуулт энд байхгүй бол бидэнтэй холбогдоно уу.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Link href="/feedback">
                  <Button>Санал хүсэлт илгээх</Button>
                </Link>
                <Button variant="outline">И-мэйл илгээх</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
