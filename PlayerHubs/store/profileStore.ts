import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PlayerStats {
  gamesPlayed: number;
  minutes: number;
  fieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  threePoints: {
    made: number;
    attempted: number;
    percentage: number;
  };
  freeThrows: {
    made: number;
    attempted: number;
    percentage: number;
  };
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  assists: number;
  personalFouls: number;
  steals: number;
  blocks: number;
  turnovers: number;
  points: number;
  rank: number;
}

export interface PlayerProfile {
  id: string;
  name: string;
  profilePicture: string;
  position: string;
  teamId: string;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  jerseyNumber: number;
  status: string;
  bio: string;
  careerHistory: Array<any>;
  achievements: Array<any>;
  stats?: PlayerStats;
  socialLinks: string[];
  donationEnabled: boolean;
}

interface ProfileState {
  profile: PlayerProfile | null;
  setProfile: (profile: PlayerProfile | ((prev: PlayerProfile) => PlayerProfile)) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) =>
        set((state) => ({
          profile:
            typeof profile === 'function'
              ? profile(state.profile as PlayerProfile)
              : profile,
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
