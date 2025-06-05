"use client"
import dynamic from 'next/dynamic'
import Spinner from "@/components/ui/spinner"

const MyProfileContent = dynamic(() => import('./components/MyProfileContent'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <Spinner/>
    </div>
  )
})

export default function MyProfile() {
  return <MyProfileContent />
}
