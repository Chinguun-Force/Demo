import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { Player } from "@/lib/type";

interface PlayerProfileProps {
  player: Player;
  getStatusColor: (status: string) => string;
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({ player, getStatusColor }) => (
  <div className="flex flex-col items-center text-center">
    <Avatar className="h-40 w-40">
      <AvatarImage src={player.profilePicture} alt={player.name} className="object-cover" />
      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <h2 className="mt-4 text-2xl font-bold">{player.name}</h2>
    <div className="mt-1 flex items-center justify-center gap-2">
      <Badge className={getStatusColor(player.status)} variant="outline">
        {player.status}
      </Badge>
      <Badge variant="outline">{player.position}</Badge>
    </div>
    <div className="mt-4 flex items-center justify-center gap-2">
      <Badge variant="secondary" className="text-lg">
        #{player.jerseyNumber}
      </Badge>
    </div>
    <div className="mt-6 grid w-full grid-cols-2 gap-4 text-sm">
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground">Баг</span>
        <span className="font-medium">{player.team}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground">Нас</span>
        <span className="font-medium">{player.age}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground">Өндөр</span>
        <span className="font-medium">{player.height}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-muted-foreground">Жин</span>
        <span className="font-medium">{player.weight}</span>
      </div>
    </div>
    <Separator className="my-6" />
    <div className="flex w-full flex-col gap-4">
      <h3 className="text-lg font-medium">Bio</h3>
      <p className="text-sm text-muted-foreground text-left">{player.bio}</p>
    </div>
    {player.donationEnabled && (
      <>
        <Separator className="my-6" />
        <Button className="w-full">
          <DollarSign className="mr-2 h-4 w-4" />
          Support This Player
        </Button>
      </>
    )}
  </div>
); 