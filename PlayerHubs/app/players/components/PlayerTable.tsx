import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { Table, Badge, Link, ChevronDown } from 'lucide-react'
import React from 'react'
import { Button } from 'react-day-picker'

const PlayerTable = () => {
  return (
    <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Байрлал</TableHead>
                  <TableHead>Баг</TableHead>
                  <TableHead>Нас</TableHead>
                  <TableHead>Улс</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              {}
            </Table>
  )
}

export default PlayerTable