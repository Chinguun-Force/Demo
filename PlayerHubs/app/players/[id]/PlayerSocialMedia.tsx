import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Player } from "@/lib/type";

interface PlayerSocialMediaProps {
  player: Player;
}

export const PlayerSocialMedia: React.FC<PlayerSocialMediaProps> = ({ player }) => (
  <div className="flex w-full flex-col gap-4">
    <h3 className="text-lg font-medium">Social Media</h3>
    <div className="flex justify-center gap-4">
      {player.socialLinks.twitter && (
        <Link href={player.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Button>
        </Link>
      )}
      {player.socialLinks.instagram && (
        <Link href={player.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
        </Link>
      )}
      {player.socialLinks.facebook && (
        <Link href={player.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Button>
        </Link>
      )}
    </div>
  </div>
); 