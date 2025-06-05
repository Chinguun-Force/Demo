import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign } from "lucide-react"
 
interface Donation {
  donor: string
  amount: string
  message: string
  date: string
}
 
interface DonationsTabProps {
  donations: Donation[]
}
 
export function DonationsTab({ donations }: DonationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Recent Donations
        </CardTitle>
        <CardDescription>Support from your fans and community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation, index) => (
            <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{donation.donor}</span>
                  <Badge variant="outline" className="text-green-600">
                    {donation.amount}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{donation.message}</p>
                <p className="text-xs text-muted-foreground">{donation.date}</p>
              </div>
            </div>
          ))}
        </div>
 
        <Separator className="my-4" />
 
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">250,000₮</div>
            <p className="text-sm text-muted-foreground">Энэ сар</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">1,240,000₮</div>
            <p className="text-sm text-muted-foreground">Нийт Donations</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">47</div>
            <p className="text-sm text-muted-foreground">Total Supporters</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}