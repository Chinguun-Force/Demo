import Link from "next/link"
import { ArrowLeft, Clock, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TechAssessmentPage() {
  const assessments = [
    {
      id: 1,
      title: "NBA Championship ",
      description: "Test your knowledge of Basketball basics",
      duration: "30 minutes",
      difficulty: "PRO",
      status: "completed",
      score: 85,
    },
    {
      id: 2,
      title: "DEED LEAGUE",
      description: "Advanced React concepts and patterns",
      duration: "45 minutes",
      difficulty: "CS2",
      status: "available",
      score: null,
    },
    {
      id: 3,
      title: "FIBA World Cup",
      description: "BULLshit",
      duration: "60 minutes",
      difficulty: "SUKA",
      status: "locked",
      score: null,
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
            <h1 className="text-xl font-semibold text-gray-900">Tech Assessment</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Assessments</h2>
            <p className="text-gray-600">Test your technical skills and track your progress</p>
          </div>

          <div className="grid gap-6">
            {assessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {assessment.title}
                      {assessment.status === "completed" && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </CardTitle>
                    <Badge
                      variant={
                        assessment.difficulty === "Beginner"
                          ? "secondary"
                          : assessment.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {assessment.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{assessment.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {assessment.duration}
                      </div>
                      {assessment.score && (
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          Score: {assessment.score}%
                        </div>
                      )}
                    </div>
                    <Button
                      disabled={assessment.status === "locked"}
                      variant={assessment.status === "completed" ? "outline" : "default"}
                    >
                      {assessment.status === "completed"
                        ? "Retake"
                        : assessment.status === "locked"
                          ? "Locked"
                          : "Start Assessment"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
