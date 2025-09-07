"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Search,
  Navigation,
  Shield,
  AlertTriangle,
  Hospital,
  Coffee,
  Car,
  ArrowLeft,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

const mockLocations = [
  {
    id: "1",
    name: "Central Police Station",
    type: "police",
    coordinates: { lat: 28.6139, lng: 77.209 },
    description: "24/7 police station with women's help desk",
    verified: true,
  },
  {
    id: "2",
    name: "City Hospital",
    type: "hospital",
    coordinates: { lat: 28.6129, lng: 77.2295 },
    description: "Emergency medical services available",
    verified: true,
  },
  {
    id: "3",
    name: "Safe Haven Cafe",
    type: "cafe",
    coordinates: { lat: 28.6169, lng: 77.209 },
    description: "Well-lit cafe, safe space for women",
    verified: true,
  },
  {
    id: "4",
    name: "Park Area - Poorly Lit",
    type: "unsafe",
    coordinates: { lat: 28.61, lng: 77.22 },
    description: "Reported as poorly lit area, avoid after dark",
    reportedBy: "Anonymous User",
    reportedAt: "2 days ago",
  },
  {
    id: "5",
    name: "Metro Station Plaza",
    type: "safe",
    coordinates: { lat: 28.618, lng: 77.215 },
    description: "Well-lit area with security cameras",
    verified: true,
  },
]

export default function SafetyMapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState(null)

  const filteredLocations = mockLocations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || location.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getLocationIcon = (type) => {
    switch (type) {
      case "police":
        return <Shield className="w-4 h-4 text-accent" />
      case "hospital":
        return <Hospital className="w-4 h-4 text-primary" />
      case "cafe":
        return <Coffee className="w-4 h-4 text-green-400" />
      case "safe":
        return <MapPin className="w-4 h-4 text-green-400" />
      case "unsafe":
        return <AlertTriangle className="w-4 h-4 text-primary" />
      default:
        return <MapPin className="w-4 h-4 text-white" />
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary neon-glow" />
            <h1 className="font-bold text-lg text-white">Safety Map</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              placeholder="Find safe route to... or search locations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
              className={
                selectedFilter === "all"
                  ? "bg-primary hover:bg-primary/90 text-white neon-glow"
                  : "glass-card border-white/20 text-white hover:bg-white/10"
              }
            >
              All Locations
            </Button>
            <Button
              variant={selectedFilter === "safe" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("safe")}
              className={`whitespace-nowrap ${
                selectedFilter === "safe"
                  ? "bg-primary hover:bg-primary/90 text-white neon-glow"
                  : "glass-card border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Safe Spots
            </Button>
            <Button
              variant={selectedFilter === "unsafe" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("unsafe")}
              className={`whitespace-nowrap ${
                selectedFilter === "unsafe"
                  ? "bg-primary hover:bg-primary/90 text-white neon-glow"
                  : "glass-card border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Unsafe Areas
            </Button>
            <Button
              variant={selectedFilter === "police" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("police")}
              className={`whitespace-nowrap ${
                selectedFilter === "police"
                  ? "bg-primary hover:bg-primary/90 text-white neon-glow"
                  : "glass-card border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <Shield className="w-4 h-4 mr-1" />
              Police Stations
            </Button>
            <Button
              variant={selectedFilter === "hospital" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("hospital")}
              className={`whitespace-nowrap ${
                selectedFilter === "hospital"
                  ? "bg-primary hover:bg-primary/90 text-white neon-glow"
                  : "glass-card border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <Hospital className="w-4 h-4 mr-1" />
              Hospitals
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/10">
              <CardContent className="p-0">
                {/* Placeholder Map */}
                <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-background/50 to-card/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4 neon-glow" />
                      <h3 className="font-semibold text-lg mb-2 text-white">Interactive Safety Map</h3>
                      <p className="text-white/70 text-sm max-w-xs">
                        Map integration would show real locations with interactive markers
                      </p>
                    </div>
                  </div>

                  {/* Mock Map Markers */}
                  <div className="absolute top-20 left-20 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg neon-glow-purple">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute top-32 right-24 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg neon-glow">
                    <Hospital className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute bottom-32 left-32 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Coffee className="w-3 h-3 text-white" />
                  </div>
                  <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg neon-glow">
                    <AlertTriangle className="w-3 h-3 text-white" />
                  </div>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="shadow-lg glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="shadow-lg glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple"
                    >
                      <Car className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="shadow-lg glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple"
                    >
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Route Suggestions */}
            <Card className="mt-4 glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Suggested Safe Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">Main Street Route</p>
                        <p className="text-sm text-white/70">Well-lit, high traffic</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                      Safest
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">Park Avenue Route</p>
                        <p className="text-sm text-white/70">Moderate traffic, some dark areas</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-300">
                      Caution
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Locations List */}
          <div className="space-y-4">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Nearby Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`p-3 glass-card border-white/10 rounded-lg cursor-pointer transition-all hover:bg-white/5 hover:border-accent/30 ${
                      selectedLocation?.id === location.id ? "ring-2 ring-primary neon-glow" : ""
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-start gap-3">
                      {getLocationIcon(location.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-white">{location.name}</h4>
                        <p className="text-xs text-white/70 mt-1">{location.description}</p>
                        {location.reportedBy && (
                          <p className="text-xs text-white/50 mt-1">
                            Reported by {location.reportedBy} • {location.reportedAt}
                          </p>
                        )}
                        {location.verified && (
                          <Badge
                            variant="secondary"
                            className="mt-2 text-xs bg-green-500/20 text-green-300 border-green-500/30"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Police Stations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Hospital className="w-4 h-4 text-primary" />
                  <span>Hospitals</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Coffee className="w-4 h-4 text-green-400" />
                  <span>Safe Cafes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Safe Areas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  <span>Unsafe Areas</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-white/10">
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white neon-glow" size="sm">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Unsafe Spot
                </Button>
                <Button
                  variant="outline"
                  className="w-full glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple bg-transparent"
                  size="sm"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
       <p className="items-center text-center mt-6 gap-4 px-4 text-xl">Architected with ♥ by Team SAHAS</p>
    </div>
  )
}
