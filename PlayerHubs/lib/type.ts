export type UserRole = "fan" | "player" | "team-owner"

export type Player = {
  _id: string
  userId: string
  profilePicture: string
  name: string
  age: number
  height: string
  weight: string
  position: string
  team: string
  jerseyNumber: number
  status: "Active" | "Injured" | "Suspended" | "Inactive"
  bio: string
  careerHistory: CareerEntry[]
  achievements: Achievement[]
  stats: PlayerStats
  socialLinks: SocialLinks
  donationEnabled: boolean
  teamId: string
}

export type CareerEntry = {
  teamId: string
  teamName: string
  season: string
  role: string
  startDate: string
  endDate: string | null
}

export type Achievement = {
  id: string
  title: string
  description: string
  date: string
  type: "Award" | "Trophy" | "Record" | "Milestone"
}

export type PlayerStats = {
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

export type SocialLinks = {
  twitter?: string
  instagram?: string
  facebook?: string
  website?: string
}

export type Team = {
  id: string
  name: string
  logo: string
  founded: string
  homeVenue: string
  coach: string
  players: string[] // Player IDs
  achievements: Achievement[]
  stats: TeamStats
}

export type TeamStats = {
  wins: number
  losses: number
  draws: number
  goalsScored: number
  goalsConceded: number
  leaguePosition: number
}

export type PlayoffMatch = {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  stage: string
  status: "Scheduled" | "Live" | "Completed" | "Postponed"
  highlights?: string
}