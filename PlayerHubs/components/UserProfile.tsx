"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuShortcut } from './ui/dropdown-menu'
import { BarChart3, ChevronDown, ChevronUp, FileText, HelpCircle, LogOut, MessageSquare, Settings, User } from 'lucide-react'

const UserProfile = () => {
    const [open, setOpen] = useState(false)
  return (

        <div className="flex items-center gap-2">
     
      <Avatar>
        <AvatarImage
          src="https://res.cloudinary.com/dl3wkodkk/image/upload/v1743047300/Food-Delivery%20Assets/55bc133b8044d28cf937929f2e9f99ce_cz68dq.png"
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
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="flex items-center gap-2 py-2">
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
            <span>Гарах</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    
  )
}

export default UserProfile