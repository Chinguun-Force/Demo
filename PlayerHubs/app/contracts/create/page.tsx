"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Save, Upload } from 'lucide-react';
import { useTeamStore, Team } from '@/store/teamStore';

interface Player {
  _id: string;
  name: string;
}

export default function CreateContractPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [salary, setSalary] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPlayers, setIsFetchingPlayers] = useState(true);

  const { teams, fetchTeams } = useTeamStore((state) => ({ teams: state.teams, fetchTeams: state.fetchTeams }));
  const { toast } = useToast();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchTeams();
    const fetchPlayers = async () => {
      setIsFetchingPlayers(true);
      try {
        const response = await fetch(`${baseUrl}/api/v1/players`);
        if (!response.ok) throw new Error('Failed to fetch players');
        const data = await response.json();
        setPlayers(data.players || []);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching players',
          description: error instanceof Error ? error.message : 'Could not load players for selection.',
        });
      } finally {
        setIsFetchingPlayers(false);
      }
    };
    fetchPlayers();
  }, [fetchTeams, baseUrl, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const contractData = {
        playerId: selectedPlayer,
        teamId: selectedTeam,
        salary: parseFloat(salary),
        duration_months: parseInt(duration, 10),
        startDate,
        endDate,
        status: 'pending', // Default status
    };

    try {
      // NOTE: File upload logic is complex and backend-dependent.
      // This example will submit the data without the file.
      // A real implementation would require a multipart/form-data request
      // or a separate upload to a service like S3.

      const response = await fetch(`${baseUrl}/api/v1/contracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create contract');
      }

      toast({
        title: 'Contract Created',
        description: 'The new contract has been added successfully.',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to create contract',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Contract</CardTitle>
            <CardDescription>Fill in the details to create a new contract.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="player">Player</Label>
                  <Select onValueChange={setSelectedPlayer} value={selectedPlayer} disabled={isFetchingPlayers}>
                    <SelectTrigger id="player">
                      <SelectValue placeholder={isFetchingPlayers ? "Loading players..." : "Select a player"} />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map((player) => (
                        <SelectItem key={player._id} value={player._id}>
                          {player.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Team</Label>
                  <Select onValueChange={setSelectedTeam} value={selectedTeam}>
                    <SelectTrigger id="team">
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team._id} value={team._id}>
                          {team.teamName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary ($)</Label>
                <Input id="salary" type="number" placeholder="e.g., 5000" value={salary} onChange={(e) => setSalary(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (Months)</Label>
                <Input id="duration" type="number" placeholder="e.g., 12" value={duration} onChange={(e) => setDuration(e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="contract-file">Contract Document</Label>
                  <div className="flex items-center gap-3">
                      <Input id="contract-file" type="file" onChange={(e) => setContractFile(e.target.files ? e.target.files[0] : null)} className="flex-1" />
                      <Button type="button" variant="outline" size="icon" disabled>
                          <Upload className="h-4 w-4" />
                      </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">File upload is not yet implemented. This is a visual placeholder.</p>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...</> : <><Save className="mr-2 h-4 w-4" /> Save Contract</>}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 