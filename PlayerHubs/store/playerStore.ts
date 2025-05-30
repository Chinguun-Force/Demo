import { create } from 'zustand';

interface Player {
  _id: string;
  userId: string;
  profilePicture?: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  position?: string;
  team?: string;
  jerseyNumber?: number;
  status: "Active" | "Injured" | "Suspended" | "Inactive";
  bio?: string;
  careerHistory?: string[];
  achievements?: string[];
  stats?: string;
  socialLinks?: string;
  donationEnabled?: boolean;
}
interface PlayerState {
  player: Player | null;
  setPlayer: (player: Player | ((prev: Player) => Player)) => void;
  clearPlayer: () => void;
}