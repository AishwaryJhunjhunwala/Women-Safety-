

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, AlertTriangle, Shield, Users, BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [voiceActivated, setVoiceActivated] = useState(false)
  const [safetyTimer, setSafetyTimer] = useState(15)
  const [timerActive, setTimerActive] = useState(false)
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="animate-pulse mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center neon-glow animate-pulse">
                <span className="text-2xl sm:text-4xl font-bold text-white">SOS</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">Emergency Activated</h1>
              <p className="text-sm sm:text-base text-white/70">Help is on the way</p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl sm:text-6xl font-bold text-primary neon-glow">{countdown}</div>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/80">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button className="glass-card border-white/20 text-white hover:bg-white/10 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
                <Button className="glass-card border-white/20 text-white hover:bg-white/10 text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Contact
                </Button>
              </div>

              <Button
                onClick={() => setEmergencyActive(false)}
                variant="outline"
                className="mt-4 sm:mt-6 glass-card border-white/30 text-white hover:bg-white/10 text-sm"
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
      <nav className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent rounded-lg flex items-center justify-center neon-glow-purple">
              <img
                src="https://res.cloudinary.com/dswk9scro/image/upload/v1757175356/women_1_rkzovy.png"
                alt="SAHAS logo"
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-wider text-white">SAHAS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="#" className="text-white hover:text-primary font-medium transition-colors text-sm xl:text-base">
              Home
            </a>
            <Link href="/safety-map" className="text-white/70 hover:text-primary transition-colors text-sm xl:text-base">
              Safety Map
            </Link>
            <Link href="/community" className="text-white/70 hover:text-primary transition-colors text-sm xl:text-base">
              Community
            </Link>
            <Link href="/awareness" className="text-white/70 hover:text-primary transition-colors text-sm xl:text-base">
              Awareness
            </Link>
            <Link href="/profile" className="text-white/70 hover:text-primary transition-colors text-sm xl:text-base">
              Profile
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card border-t border-white/10 py-4">
            <div className="flex flex-col space-y-3 px-4">
              <a href="#" className="text-white hover:text-primary font-medium transition-colors py-2">
                Home
              </a>
              <Link href="/safety-map" className="text-white/70 hover:text-primary transition-colors py-2">
                Safety Map
              </Link>
              <Link href="/community" className="text-white/70 hover:text-primary transition-colors py-2">
                Community
              </Link>
              <Link href="/awareness" className="text-white/70 hover:text-primary transition-colors py-2">
                Awareness
              </Link>
              <Link href="/profile" className="text-white/70 hover:text-primary transition-colors py-2">
                Profile
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="relative overflow-hidden">
        <section className="min-h-screen flex items-center justify-center relative px-4 py-8 sm:py-12">
          <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-primary/10 rounded-full blur-3xl neon-glow"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-32 h-32 sm:w-60 sm:h-60 bg-accent/10 rounded-full blur-2xl neon-glow-purple"></div>

          <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12 relative z-10">
            <div className="space-y-4 sm:space-y-6">
              {/* background image */}
              <img
                src="https://res.cloudinary.com/dswk9scro/image/upload/v1757176269/defence_1_qqpfud.png"
                alt="SAHAS background"
                className="absolute inset-0 mx-auto w-[280px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] opacity-38 object-contain -z-10"
              />
              {/* foreground content */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight">
                  Safer Streets,
                  <br />
                  Stronger Women.
                </h1>
                <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-pretty mt-4 sm:mt-6 px-4 sm:px-0">
                  Empowering women with instant emergency response, community support, and safety resources at your
                  fingertips.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
              <Card className="glass-card border-white/10 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:neon-glow-purple transition-all">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm">Trusted Contacts</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:neon-glow-purple transition-all">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm">Resources</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:neon-glow transition-all">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm">SOS</h3>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:neon-glow-purple transition-all">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm">Live Tracking</h3>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse neon-glow"></div>
                <Button
                  onClick={handleSOSClick}
                  size="lg"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-primary hover:bg-primary/90 text-white text-xl sm:text-2xl md:text-3xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 neon-glow border-4 border-primary/50"
                >
                  SOS
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
              <Button
                onClick={() => handleQuickAction("location")}
                className="glass-card border-white/20 text-white hover:bg-white/10 h-12 sm:h-14 text-sm sm:text-base"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Share Location
              </Button>
              <Button
                onClick={() => handleQuickAction("fake-call")}
                className="glass-card border-white/20 text-white hover:bg-white/10 h-12 sm:h-14 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Call Emergency Contact
              </Button>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center text-center mt-4 sm:mt-6 gap-3 sm:gap-4 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold neon-glow-purple">
            Who are we?
          </h2>
          <p className="text-white/80 max-w-4xl leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-2 sm:px-4">
            SAHAS is a social impact website working towards Building Responsive, 
            Inclusive, Safe and Equitable Urban Systems. We collaborate with 
            government and non-government stakeholders in using big data to 
            improve infrastructure and services in cities.
          </p>
        </div>

        {/* NEXT PART */}
        <section className="px-4 py-8 sm:py-12 glass-card border-t border-white/10 mt-8 sm:mt-12">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-full flex items-center justify-center neon-glow-purple">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm sm:text-base">Safety Timer</h3>
                      <p className="text-xs sm:text-sm text-white/70">Set a check-in reminder</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <select
                      value={safetyTimer}
                      onChange={(e) => setSafetyTimer(Number(e.target.value))}
                      className="glass-card border-white/20 rounded-lg px-2 sm:px-3 py-2 text-white text-sm flex-1 sm:flex-none"
                    >
                      <option value={15}>15 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={60}>1 hour</option>
                      <option value={120}>2 hours</option>
                    </select>
                    <Button 
                      onClick={startSafetyTimer} 
                      className="bg-primary hover:bg-primary/90 neon-glow text-sm px-3 sm:px-4"
                      size="sm"
                    >
                      {timerActive ? "Active" : "Set Timer"}
                    </Button>
                  </div>
                </div>
                {timerActive && (
                  <Badge className="mt-3 bg-accent/20 text-accent border-accent/30 text-xs sm:text-sm">
                    Timer active - Check in required in {safetyTimer} minutes
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold mb-4 text-white flex items-center gap-2 text-sm sm:text-base">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Emergency Helplines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div className="flex justify-between items-center p-3 glass-card border-primary/20 rounded-lg">
                    <span className="text-white text-xs sm:text-sm">Police Emergency</span>
                    <a href="tel:100" className="text-primary font-bold text-base sm:text-lg neon-glow">
                      100
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card border-accent/20 rounded-lg">
                    <span className="text-white text-xs sm:text-sm">Women Helpline</span>
                    <a href="tel:1091" className="text-accent font-bold text-base sm:text-lg neon-glow-purple">
                      1091
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-card border-accent/20 rounded-lg sm:col-span-2 lg:col-span-1">
                    <span className="text-white text-xs sm:text-sm">Ambulance</span>
                    <a href="tel:108" className="text-accent font-bold text-base sm:text-lg neon-glow-purple">
                      108
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Link href="/safety-map">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:neon-glow-purple transition-all">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white text-sm sm:text-base">Safety Map</h3>
                    <p className="text-xs sm:text-sm text-white/70">Find safe routes and locations near you</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/community">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:neon-glow-purple transition-all">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white text-sm sm:text-base">Community</h3>
                    <p className="text-xs sm:text-sm text-white/70">Connect with others and share safety reports</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/awareness">
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 glass-card border-white/10 group hover:border-accent/30 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:neon-glow-purple transition-all">
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2 text-white text-sm sm:text-base">Awareness</h3>
                    <p className="text-xs sm:text-sm text-white/70">Learn about safety laws and self-defense</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
          <p className="items-center text-center mt-4 sm:mt-6 gap-4 px-4 text-sm sm:text-base md:text-lg lg:text-xl">
            Architected with ♥ by Team SAHAS
          </p>
        </section>
      </main>
    </div>
  )
}