// Sample data

// import { Player, PlayoffMatch, Team } from "./type"

// Re-import necessary types
import { Team, PlayoffMatch } from "./type";

interface Player {
  id: string;
  number: number;
  name: string;
  height: string;
  position: string;
  age: number;
  nationality: string;
  fromYear: number;
  toYear: number;
  formerTeam: string;
  agent: string;
  profileUrl: string;
  stats: PlayerStats;
}

interface PlayerStats {
  gamesPlayed: number;
  minutesPlayed: number;
  fieldGoalsMadeAttempted: string;
  fieldGoalPercentage: number;
  threePointsMadeAttempted: string;
  threePointPercentage: number;
  freeThrowsMadeAttempted: string;
  freeThrowPercentage: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  totalRebounds: number;
  assists: number;
  personalFouls: number;
  steals: number;
  blocks: number;
  turnovers: number;
  points: number;
  rank: number;
}

const player: Player = {
  id: "unique-id", // You can generate or assign a unique ID
  number: 11,
  name: "Pendarvis Williams",
  height: "198 cm",
  position: "G",
  age: 33,
  nationality: "USA",
  fromYear: 2024,
  toYear: 2025,
  formerTeam: "Miners",
  agent: "A.Liatsos",
  profileUrl: "https://basketball.asia-basket.comjavascript:aFP('209706','Williams Pendarvis');",
  stats: {
    gamesPlayed: 30,
    minutesPlayed: 0, // Assuming this is the total minutes played
    fieldGoalsMadeAttempted: "135-253",
    fieldGoalPercentage: 53.4,
    threePointsMadeAttempted: "43-120",
    threePointPercentage: 35.8,
    freeThrowsMadeAttempted: "77-85",
    freeThrowPercentage: 90.6,
    offensiveRebounds: 1.4,
    defensiveRebounds: 6,
    totalRebounds: 7.4,
    assists: 4.6,
    personalFouls: 2.1,
    steals: 2.2,
    blocks: 1.4,
    turnovers: 1.8,
    points: 15.9,
    rank: 20.7,
  },
};

export const players: Player[] = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "Forward",
      team: "Red Dragons", // Changed teamId to team to match Player type
      age: 24,
      height: "6'2\"", 
      nationality: "USA",
      number: 10, // Added required number field
      fromYear: 2020, // Added required fromYear field
      toYear: 2025, // Added required toYear field
      formerTeam: "Blue Eagles", // Added required formerTeam field
      agent: "Unknown", // Added required agent field
      profileUrl: "", // Added required profileUrl field
      jerseyNumber: 10,
      status: "Active",
      bio: "Alex Johnson is a dynamic forward known for his speed and finishing ability. He joined the Red Dragons in 2020 and has quickly become a fan favorite.",
      careerHistory: [
        {
          teamId: "101",
          teamName: "Blue Eagles",
          season: "2018-2019",
          role: "Forward",
          startDate: "2018-08-01",
          endDate: "2020-05-30",
        },
        {
          teamId: "102",
          teamName: "Red Dragons",
          season: "2020-Present",
          role: "Forward",
          startDate: "2020-06-15",
          endDate: null,
        },
      ],
      achievements: [
        {
          id: "a1",
          title: "Rookie of the Year",
          description: "Named the league's best rookie player",
          date: "2019-05-15",
          type: "Award",
        },
        {
          id: "a2",
          title: "Top Scorer",
          description: "Led the league in goals scored",
          date: "2022-05-20",
          type: "Award",
        },
      ],
      stats: {
        gamesPlayed: 128,
        points: 75,
        assists: 32,
        // yellowCards: 15,
        // redCards: 2,
        minutesPlayed: 10240,
        fieldGoalsMadeAttempted: "",
        fieldGoalPercentage: 0,
        threePointsMadeAttempted: "",
        threePointPercentage: 0,
        freeThrowsMadeAttempted: "",
        freeThrowPercentage: 0,
        offensiveRebounds: 0,
        defensiveRebounds: 0,
        totalRebounds: 0,
        personalFouls: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        rank: 0
      },
      socialLinks: {
        twitter: "https://twitter.com/alexjohnson",
        instagram: "https://instagram.com/alexjohnson",
      },
      donationEnabled: true,
    },
    {
      id: "2",
      name: "Carlos Rodriguez",
      position: "Midfielder",
      team: "Blue Eagles",
      age: 27,
      height: "5'10\"",
      weight: "170 lbs",
      nationality: "Spain",
      jerseyNumber: 8,
      status: "Active",
      bio: "Carlos Rodriguez is a creative midfielder with exceptional vision and passing ability. He has been with the Blue Eagles for 5 seasons.",
      careerHistory: [
        {
          teamId: "103",
          teamName: "Madrid Stars",
          season: "2016-2018",
          role: "Midfielder",
          startDate: "2016-07-01",
          endDate: "2018-06-30",
        },
        {
          teamId: "101",
          teamName: "Blue Eagles",
          season: "2018-Present",
          role: "Midfielder",
          startDate: "2018-07-15",
          endDate: null,
        },
      ],
      achievements: [
        {
          id: "a3",
          title: "Midfielder of the Year",
          description: "Named the league's best midfielder",
          date: "2020-05-18",
          type: "Award",
        },
        {
          id: "a4",
          title: "League Champion",
          description: "Won the league championship with Blue Eagles",
          date: "2021-05-22",
          type: "Trophy",
        },
      ],
      stats: {
        gamesPlayed: 180,
        points: 35,
        assists: 82,
        minutesPlayed: 15300,
        fieldGoalsMadeAttempted: "",
        fieldGoalPercentage: 0,
        threePointsMadeAttempted: "",
        threePointPercentage: 0,
        freeThrowsMadeAttempted: "",
        freeThrowPercentage: 0,
        offensiveRebounds: 0,
        defensiveRebounds: 0,
        totalRebounds: 0,
        personalFouls: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        rank: 0
      },
      socialLinks: {
        twitter: "https://twitter.com/carlosrodriguez",
        instagram: "https://instagram.com/carlosrodriguez",
        facebook: "https://facebook.com/carlosrodriguez",
      },
      donationEnabled: true,
    },
  ]
export const teams: Team[] = [
  {
    id: "101",
    name: "Blue Eagles",
    logo: "/placeholder.svg?height=100&width=100",
    founded: "1985",
    homeVenue: "Eagle Stadium",
    coach: "Frank Miller",
    players: ["2", "7", "9", "12"],
    achievements: [
      {
        id: "t1",
        title: "League Champions",
        description: "Won the league championship",
        date: "2021-05-22",
        type: "Trophy",
      },
      {
        id: "t2",
        title: "Cup Winners",
        description: "Won the national cup",
        date: "2019-04-15",
        type: "Trophy",
      },
    ],
    stats: {
      wins: 18,
      losses: 5,
      draws: 7,
      goalsScored: 62,
      goalsConceded: 28,
      leaguePosition: 2,
    },
  },
  {
    id: "102",
    name: "Red Dragons",
    logo: "/placeholder.svg?height=100&width=100",
    founded: "1992",
    homeVenue: "Dragon Arena",
    coach: "Sarah Johnson",
    players: ["1", "4", "8", "11"],
    achievements: [
      {
        id: "t3",
        title: "League Champions",
        description: "Won the league championship",
        date: "2022-05-20",
        type: "Trophy",
      },
    ],
    stats: {
      wins: 22,
      losses: 3,
      draws: 5,
      goalsScored: 78,
      goalsConceded: 22,
      leaguePosition: 1,
    },
  },
]

export const playoffMatches: PlayoffMatch[] = [
  {
    id: "m0",
    homeTeam: "Хасын хүлэгүүд",
    awayTeam: "Darkhan United",
    homeScore: 4,
    awayScore: 1,
    date: "2025-03-10 ",
    stage: "Плей-офф",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHBFXxYJrhw/",
  },
  {
    id: "m1",
    homeTeam: "Бишрэлт Металл",
    awayTeam: "Завхан Бродерс",
    homeScore: 4,
    awayScore: 0,
    date: "2025-03-09",
    stage: "Плей-офф",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHEAVlHp9ow/",
  },
  {
    id: "m2",
    homeTeam: "Эрдэнэт Майнерс",
    awayTeam: "SG APES",
    homeScore: 2,
    awayScore: 4,
    date: "2025-03-09",
    stage: "Плей-офф",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHJIStOJuff/",
  },
  {
    id: "m3",
    homeTeam: "BCH Knights",
    awayTeam: "Сэлэнгэ Бодонс",
    homeScore: 1,
    awayScore: 4,
    date: "2025-03-10",
    stage: "Плей-офф",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHGfV88yBjs/",
  },
  {
    id: "m4",
    homeTeam: "Хасын хүлэгүүд",
    awayTeam: "Сэлэнгэ Бодонс",
    homeScore: 4,
    awayScore: 3,
    date: "2025-03-21 ",
    stage: "хагас финал",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHdlYzhoIeN/",
  },
  {
    id: "m5",
    homeTeam: "Бишрэлт Металл",
    awayTeam: "SG APES",
    homeScore: 4,
    awayScore: 3,
    date: "2025-03-28",
    stage: "хагас финал",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DHvirJ5paRT/",
  },
  {
    id: "m6",
    homeTeam: "Хасын хүлэгүүд",
    awayTeam: "Бишрэлт Металл",
    homeScore: 4,
    awayScore: 2,
    date: "2025-04-21",
    stage: "Аварга финал",
    status: "Completed",
    highlights: "https://www.instagram.com/reel/DIhOXCPyQ08/"
  },
]
