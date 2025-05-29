// Database schema types and utilities
export interface Player {
    id: string
    name: string
    email: string
    position: string
    age: number
    team_id?: string
    profile_image?: string
    stats: PlayerStats
    created_at: string
    updated_at: string
  }
  
  export interface Team {
    id: string
    name: string
    owner_id: string
    description: string
    logo?: string
    founded_year: number
    created_at: string
    updated_at: string
  }
  
  export interface TeamOwner {
    id: string
    name: string
    email: string
    company?: string
    verified: boolean
    created_at: string
    updated_at: string
  }
  
  export interface Contract {
    id: string
    player_id: string
    team_id: string
    owner_id: string
    contract_file_url: string
    salary: number
    duration_months: number
    status: "pending" | "active" | "expired" | "terminated"
    signed_date?: string
    start_date: string
    end_date: string
    created_at: string
    updated_at: string
  }
  
  export interface Donation {
    id: string
    donor_name: string
    donor_email: string
    player_id?: string
    team_id?: string
    amount: number
    message?: string
    payment_status: "pending" | "completed" | "failed"
    payment_id?: string
    created_at: string
  }
  
  export interface PlayerStats {
    games_played: number
    points: number
    assists: number
    rebound: number
    rating: number
    stell: number
  }
  
  // Mock database functions (replace with actual database calls)
  export class Database {
    static async getPlayers(): Promise<Player[]> {
      // Mock data - replace with actual database query
      return [
        {
          id: "1",
          name: "Kdl2k",
          email: "alex@example.com",
          position: "Forward",
          age: 20,
          team_id: "1",
          stats: { games_played: 15, points: 7878, assists: 89, rebound: 13, rating: 9.0, stell: 8.5 },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Chingune",
          email: "chingune@example.com",
          position: "Forward",
          age: 81,
          team_id: "1",
          stats: { games_played: 1999, points: 9, assists: 0, rebound: 13, rating: 7.0, stell: 8.5 },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]
    }
  
    static async getTeams(): Promise<Team[]> {
      return [
        {
          id: "1",
          name: "Thunder Hawks",
          owner_id: "1",
          description: "Professional esports team",
          founded_year: 2020,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]
    }
  
    static async getContracts(): Promise<Contract[]> {
      return [
        {
          id: "1",
          player_id: "1",
          team_id: "1",
          owner_id: "1",
          contract_file_url: "/contracts/contract-1.pdf",
          salary: 50000,
          duration_months: 12,
          status: "active",
          start_date: "2024-01-01",
          end_date: "2024-12-31",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]
    }
  
    static async getDonations(): Promise<Donation[]> {
      return [
        {
          id: "1",
          donor_name: "John Doe",
          donor_email: "john@example.com",
          player_id: "1",
          amount: 100,
          message: "Keep up the great work!",
          payment_status: "completed",
          created_at: new Date().toISOString(),
        },
      ]
    }
  }
  