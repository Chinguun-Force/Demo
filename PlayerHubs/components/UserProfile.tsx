"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator} from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { BarChart3, ChevronDown, ChevronUp, FileText, HelpCircle, LogOut, MessageSquare, Settings, Trophy, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useProfileStore } from '@/store/profileStore'
import { useRouter } from 'next/navigation'

const UserProfile = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    useAuthStore((state) => state.user)

    const handleLogout = () => {
      useAuthStore.getState().logout()
      useProfileStore.getState().clearProfile()
      router.push('/auth/login')
    }

    return (
        <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage
          src={useProfileStore.getState().profile?.profilePicture || 'github.com/PlayerHubs/player-hubs/assets/placeholder.png'}
          alt="User"
        />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-gray-50 shadow-lg rounded-md p-2">
          <Link href="/players/myprofile">
            <DropdownMenuItem className="flex items-center gap-2 py-2 hover:bg-gray-200 duration-300 rounded-xl cursor-pointer">
              <span>{useProfileStore.getState().profile?.name}</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/players/myprofile">
          <DropdownMenuItem className="flex items-center gap-2 py-2 hover:bg-gray-200 duration-300 rounded-xl cursor-pointer">
            <User className="h-4 w-4" />
            <span>My Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <FileText className="h-4 w-4" />
            <span>Tech Assessment</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <BarChart3 className="h-4 w-4" />
            <span>Leaderboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <Settings className="h-4 w-4" />
            <span>Тохиргоо</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <MessageSquare className="h-4 w-4" />
            <span>Санал хүсэлт</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <HelpCircle className="h-4 w-4" />
            <span>Тусламж</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 py-2">
            <LogOut className="h-4 w-4" />
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Гарах
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  )
}

export default UserProfile