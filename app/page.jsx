"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, AlertTriangle, Shield, Users, BookOpen, Menu } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [voiceActivated, setVoiceActivated] = useState(false)
  const [safetyTimer, setSafetyTimer] = useState(15)
  const [timerActive, setTimerActive] = useState(false)
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Emergency countdown effect
  useEffect(() => {
    if (emergencyActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [emergencyActive, countdown])

  const handleSOSClick = () => {
    setEmergencyActive(true)
    setCountdown(10)
    setIsRecording(true)
    console.log("🚨 EMERGENCY ACTIVATED - Sending location and alerts")
  }

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`)
    switch (action) {
      case "location":
        break
      case "recording":
        setIsRecording(!isRecording)
        break
      case "fake-call":
        break
      case "voice":
        setVoiceActivated(!voiceActivated)
        break
    }
  }

  const startSafetyTimer = () => {
    setTimerActive(true)
    console.log(`Safety timer set for ${safetyTimer} minutes`)
  }

  if (emergencyActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-background to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card border-primary/30 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse mb-6">
              <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center neon-glow animate-pulse">
                <span className="text-4xl font-bold text-white">SOS</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Emergency Activated</h1>
              <p className="text-white/70">Help is on the way</p>
            </div>

            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary neon-glow">{countdown}</div>
              <div className="space-y-3 text-sm text-white/80">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Location sent to emergency contacts
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Recording started and uploading
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Alert sent to local authorities
                </p>
                {isRecording && (
                  <p className="flex items-center justify-center gap-2 text-primary">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Live recording in progress
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <Button className="glass-card border-white/20 text-white hover:bg-white/10">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button className="glass-card border-white/20 text-white hover:bg-white/10">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Contact
                </Button>
              </div>

              <Button
                onClick={() => setEmergencyActive(false)}
                variant="outline"
                className="mt-6 glass-card border-white/30 text-white hover:bg-white/10"
              >
                Cancel Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center neon-glow-purple">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-wider text-white">SAHAS</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white hover:text-primary font-medium transition-colors">
              Home
            </a>
            <Link href="/safety-map" className="text-white/70 hover:text-primary transition-colors">
              Safety Map
            </Link>
            <Link href="/community" className="text-white/70 hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/awareness" className="text-white/70 hover:text-primary transition-colors">
              Awareness
            </Link>
            <Link href="/profile" className="text-white/70 hover:text-primary transition-colors">
              Profile
            </Link>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        <section className="min-h-screen flex items-center justify-center relative px-4 py-12">
          <div className="absolute top-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl neon-glow"></div>
          <div className="absolute bottom-20 left-10 w-60 h-60 bg-accent/10 rounded-full blur-2xl neon-glow-purple"></div>

          <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-balance leading-tight">
                Safer Streets,
                <br />
                Stronger Women.
              </h1>
              <p className="text-white/70 text-xl max-w-2xl mx-auto text-pretty">
                Empowering women with instant emergency response, community support, and safety resources at your
                fingertips.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="glass-card border-white/10 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:neon-glow-purple transition-all">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Trusted Contacts</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:neon-glow-purple transition-all">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Resources</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:neon-glow transition-all">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">SOS</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:neon-glow-purple transition-all">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">Live Tracking</h3>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse neon-glow"></div>
                <Button
                  onClick={handleSOSClick}
                  size="lg"
                  className="relative w-48 h-48 rounded-full bg-primary hover:bg-primary/90 text-white text-3xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 neon-glow border-4 border-primary/50"
                >
                  SOS
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button
                onClick={() => handleQuickAction("location")}
                className="glass-card border-white/20 text-white hover:bg-white/10 h-14"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Share Location
              </Button>
              <Button
                onClick={() => handleQuickAction("fake-call")}
                className="glass-card border-white/20 text-white hover:bg-white/10 h-14"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Contact
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 glass-card border-t border-white/10">
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center neon-glow-purple">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Safety Timer</h3>
                      <p className="text-sm text-white/70">Set a check-in reminder</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={safetyTimer}
                      onChange={(e) => setSafetyTimer(Number(e.target.value))}
                      className="glass-card border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value={15}>15 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                    <Button onClick={startSafetyTimer} className="bg-primary hover:bg-primary/90 neon-glow">
                      {timerActive ? "Active" : "Set Timer"}
                    </Button>
                  </div>
                </div>
                {timerActive && (
                  <Badge className="mt-3 bg-accent/20 text-accent border-accent/30">
                    Timer active - Check in required in {safetyTimer} minutes
                  </Badge>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Emergency Helplines
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between items-center p-3 glass-card border-primary/20 rounded-lg">
                    <span className="text-white">Police Emergency</span>
                    <a href="tel:100" className="text-primary font-bold text-lg neon-glow">
                      100
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card border-accent/20 rounded-lg">
                    <span className="text-white">Women Helpline</span>
                    <a href="tel:1091" className="text-accent font-bold text-lg neon-glow-purple">
                      1091
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card border-accent/20 rounded-lg">
                    <span className="text-white">Ambulance</span>
                    <a href="tel:108" className="text-accent font-bold text-lg neon-glow-purple">
                      108
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/safety-map">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:neon-glow-purple transition-all">
                      <MapPin className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Safety Map</h3>
                    <p className="text-sm text-white/70">Find safe routes and locations near you</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:neon-glow-purple transition-all">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Community</h3>
                    <p className="text-sm text-white/70">Connect with others and share safety reports</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/awareness">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:neon-glow-purple transition-all">
                      <BookOpen className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Awareness</h3>
                    <p className="text-sm text-white/70">Learn about safety laws and self-defense</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
