import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface Profile {
    _id?: string;
    userId?: string;
    profilePicture: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    position?: string;
    team?: string;
    jerseyNumber?: number;
    status?: string;
    bio?: string;
    stats?: Record<string, any>;
    careerHistory?: string[];
    achievements?: string[];
    socialLinks?: string[]; // assuming it's meant to be an array of URLs
  }
interface ProfileState {
    profile: Profile | null;
    // setProfile: (profile: Profile) => void;
    setProfile: (profile: Profile | ((prev: Profile) => Profile)) => void;
    clearProfile: () => void;
}
export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set((state) => ({
                profile: typeof profile === 'function' ? profile(state.profile as Profile) : profile,
            })),
            clearProfile: () => set({ profile: null }),
        }),
        {
            name: 'profile-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)