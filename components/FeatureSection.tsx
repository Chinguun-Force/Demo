import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, BarChart3, Users } from "lucide-react"
const data = [
    {
        title: "For Team Owners",
        description: "Manage your team and analyze performance",
        icon: <Users className="h-6 w-6 text-primary" />,
        features: [
            "Team roster management",
            "Performance analytics",
            "Player statistics tracking",
            "Team history and achievements",
        ],
    },
    {
        title: "For Players",
        description: "Track your career and achievements",
        icon: <Award className="h-6 w-6 text-primary" />,
        features: [
            "Career history timeline",
            "Performance statistics",
            "Achievement showcase",
            "Fan engagement tools",
        ],
    },
    {
        title: "For Fans",
        description: "Follow and support your favorite players",
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        features: [
            "Browse player profiles",
            "View team rosters and stats",
            "Follow playoff statistics",
            "Donate to support players",
        ],
    }
]
export function FeatureSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need in One Platform
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform serves team owners, players, and fans with specialized features for each user type.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {
                data.map((item, index) => (
                    <Card key={index} className="border-primary/20">
                        <CardHeader className="pb-2">
                            {item.icon}
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="grid gap-2 text-sm">
                                {item.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
      </div>
    </section>
  )
}
