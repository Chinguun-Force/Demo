import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText } from "lucide-react"
import { useProfileStore } from "@/store/profileStore"


interface ContractData {
  team: string
  salary: string
  startDate: string
  endDate: string
  status: string
  bonuses: Array<{
    type: string
    amount: string
  }>
}

interface ContractTabProps {
  contractData: ContractData
}

export function ContractTab({ contractData }: ContractTabProps) {
  const profile = useProfileStore.getState().profile

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contract Details
        </CardTitle>
        <CardDescription>Current contract information and terms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Team</Label>
              <p className="text-lg">{profile?.team || contractData.team}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Salary</Label>
              <p className="text-lg font-semibold text-green-600">{contractData.salary}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <Badge className="ml-2" variant="default">
                {contractData.status}
              </Badge>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Contract Start</Label>
              <p className="text-lg">{contractData.startDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Contract End</Label>
              <p className="text-lg">{contractData.endDate}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-sm font-medium mb-3 block">Performance Bonuses</Label>
          <div className="space-y-2">
            {contractData.bonuses.map((bonus, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span>{bonus.type}</span>
                <span className="font-semibold text-green-600">{bonus.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
