"use client"
import React, {useEffect, useState} from 'react';
import {ChevronLeft} from "lucide-react"
import Link from "next/link"
import TeamHeader from './components/TeamHeader';
import TeamInfo from './components/TeamInfo';
import TeamStats from './components/TeamStats';
import RecentResults from './components/RecentResults';
import TopPlayers from './components/TopPlayers';
import TeamRankings from './components/TeamRankings';
import TeamAchievements from './components/TeamAchievements';
import Spinner from '@/components/ui/spinner';
import { useThemeStore } from '@/store/themeStore';
import DarkModeToggle from '@/components/DarkModeToggle';

interface Team {
    teamNameEn: string;
    teamName: string;
    teamLogo: string;
    teamDescription: string;
    teamMembers: string[];
    teamAchievements: string[];
    teamStats: {
        pointsPerGame: string;
        twoFGP: string;
        threeFGP: string;
        freeThrowPercentage: string;
        offRebounds: string;
        defRebounds: string;
        totalRebounds: string;
        assistsPerGame: string;
        turnoversPerGame: string;
        stealsPerGame: string;
        blocksPerGame: string;
        pointsPerGameOfOpponent: string;
        opponentTwoFGP: string;
        opponentThreeFGP: string;
    };
    teamSocialLinks: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    games: {
        date: string;
        league: string;
        round: number;
        opponent: string;
        result: string;
        _id: string;
    }[];
    teamMembersDetails: {
        _id: string;
        userId: string;
        profilePicture: string;
        name: string;
        age: number;
        height: number;
        weight: number;
        position: string;
        jerseyNumber: number;
        status: string;
        bio: string;
        stats: {
            pointsPerGame: number;
            assistsPerGame: number;
            reboundsPerGame: number;
            stealsPerGame: number;
        };
        careerHistory: string[];
        achievements: string[];
        socialLinks: string[];
        __v: number;
        teamId: string;
    }[];
    ownerDetails: any[];
}

export default function TeamDetails() {
    const [team, setTeam] = useState<Team | null>(null);
    const darkMode = useThemeStore((state) => state.darkMode);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const pathSegments = window.location.pathname.split('/');
                const teamId = pathSegments[pathSegments.length - 1];
                const response = await fetch(`${baseUrl}/api/v1/teams/${teamId}`);
                const data = await response.json();
                setTeam(data.success ? data.team : null);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchData();
    }, []);

    if (!team) return <Spinner />;

    const statsMapping: { [key: string]: string } = {
        pointsPerGame: "Нэг тоглолтонд авсан дундаж оноо",
        twoFGP: "Дундын зайн довтолгооны хувь",
        threeFGP: "Холын зайн довтолгооны хувь",
        freeThrowPercentage: "Чөлөөт шидэлтийн гүйцэтгэлийн хувь",
        offRebounds: "Довтолгооны самбар",
        defRebounds: "Хамгаалалтын самбар",
        totalRebounds: "Нийт самбар",
        assistsPerGame: "Оновчтой дамжуулалт",
        turnoversPerGame: "Бөмбөг алдалт",
        stealsPerGame: "Бөмбөг таслалт",
        blocksPerGame: "Хаалт",
        pointsPerGameOfOpponent: "Алдсан оноо",
        opponentTwoFGP: "Өрсөлдөгч багийн дундын зайн довтолгооны хувь",
        opponentThreeFGP: "Өрсөлдөгч багийн холын зайн довтолгооны хувь"
    };

    const transformedStats = Object.entries(team.teamStats).map(([key, value]) => ({
        name: statsMapping[key] || key,
        value
    }));
    console.log(team.teamMembersDetails)
  return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/teams" className="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Багууд</span>
          </Link>
        </div>
      </header>

            <TeamHeader
                name={team.teamName}
                fullName={team.teamNameEn}
                logo={team.teamLogo}
                currentRank={parseFloat(team.teamStats.pointsPerGame)}
            />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
                        <TeamInfo
                            founded={parseInt(team.createdAt)}
                            homeArena={team.teamDescription}
                            coach={team.isActive ? "Active" : "Inactive"}
                            championships={team.teamAchievements.length}
                        />
                        <TeamStats stats={transformedStats} />
                        <RecentResults results={team.games.map(game => {
                            const [opponentScore, teamScore] = game.result.split('-').map(score => parseInt(score));
                            const outcome = teamScore > opponentScore ? "Ялалт" : "Ялагдал";
                            return {
                                opponent: game.opponent,
                                result: outcome,
                                score: game.result
                            };
                        })} />
          </div>

          {/* Right Column */}
                    <div>
                        <TopPlayers players={team.teamMembersDetails.map(member => ({
                            profilePicture: member.profilePicture,
                            number: member.jerseyNumber,
                            name: member.name,
                            position: member.position,
                            height: `${member.height} cm`,
                            nationality: "Unknown",
                            stats: {
                                pts: member.stats?.pointsPerGame || 0,
                                reb: member.stats?.reboundsPerGame || 0,
                                ast: member.stats?.assistsPerGame || 0
                            }
                        }))} />
                        <TeamRankings />
                        <TeamAchievements achievements={team.teamAchievements} />
              </div>
            </div>
          </div>
        </div>
    );
}
