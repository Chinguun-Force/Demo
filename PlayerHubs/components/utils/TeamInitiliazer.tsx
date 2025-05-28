'use client';

import { useTeamStore } from '@/store/teamStore';
import { useEffect } from 'react';

export const TeamStoreInitializer = () => {
  const fetchTeams = useTeamStore((s) => s.fetchTeams);
  const teams = useTeamStore((s) => s.teams);

  useEffect(() => {
    if (teams.length === 0) fetchTeams();
  }, [teams.length, fetchTeams]);

  return null; // no UI, just side-effect
};
