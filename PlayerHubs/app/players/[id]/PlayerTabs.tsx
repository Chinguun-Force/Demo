import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats } from "../components/PlayerStats";
import { PlayerCareerHistory } from "../components/PlayerCareer";
import { PlayerAchievements } from "../components/PlayerAchievement";
import { PlayerDonation } from "../components/PlayerDonation";
import { Player } from "@/lib/type";

interface PlayerTabsProps {
  player: Player;
}

export const PlayerTabs: React.FC<PlayerTabsProps> = ({ player }) => (
  <Tabs defaultValue="stats">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="stats">Statistics</TabsTrigger>
      <TabsTrigger value="career">Career History</TabsTrigger>
      <TabsTrigger value="achievements">Achievements</TabsTrigger>
      <TabsTrigger value="support">Support</TabsTrigger>
    </TabsList>
    <TabsContent value="stats" className="mt-6">
      <PlayerStats player={player} />
    </TabsContent>
    <TabsContent value="career" className="mt-6">
      <PlayerCareerHistory player={player} />
    </TabsContent>
    <TabsContent value="achievements" className="mt-6">
      <PlayerAchievements player={player} />
    </TabsContent>
    <TabsContent value="support" className="mt-6">
      <PlayerDonation player={player} />
    </TabsContent>
  </Tabs>
); 