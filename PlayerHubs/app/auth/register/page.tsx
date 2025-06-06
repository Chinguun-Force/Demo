"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("FAN")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const handleTestClick = () => {
    setName("Test User");
    // Using Date.now() to ensure the email is unique for each test run
    setEmail(`test@gmail.com`);
    setPassword("Shine2025*");
    setConfirmPassword("Shine2025*");
    setRole("PLAYER");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
      })
      return
    }

    setIsLoading(true)

    try {
      await fetch(`${baseUrl}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role}),
      })

      toast({
        title: "Registration successful",
        description: "Welcome to the Player Management System",
      })

      router.push("/auth/login")
    } catch (error){
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please check your credentials and try again",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to create your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>I am a:</Label>
            <RadioGroup
              defaultValue="fan"
              value={role}
              onValueChange={setRole}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FAN" id="fan" />
                <Label htmlFor="fan" className="font-normal">
                  Fan
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PLAYER" id="player" />
                <Label htmlFor="player" className="font-normal">
                  Player
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="OWNER" id="team-owner" />
                <Label htmlFor="team-owner" className="font-normal">
                  Team Owner
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="button" variant="outline" className="w-full" onClick={handleTestClick}>
            Fill with Test Data
          </Button>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
