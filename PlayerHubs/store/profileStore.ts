import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface Profile {
    profilePicture: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    position: string;
    team: string;
    jerseyNumber: number;
    status: 'ACTIVE' | 'INACTIVE' | 'INJURED' | 'SUSPENDED';
    bio: string;
}
interface ProfileState {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
    clearProfile: () => void;
}
export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: null,
            setProfile: (profile) => set({ profile }),
            clearProfile: () => set({ profile: null }),
        }),
        {
            name: 'profile-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)