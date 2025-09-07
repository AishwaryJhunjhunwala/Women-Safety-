"use client"

import { useState } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
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

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
}

const center = {
  lat: 22.2531, // NIT Rourkela latitude
  lng: 84.9012, // NIT Rourkela longitude
}

// You might also want to update some mock locations near NIT Rourkela
const mockLocations = [
  {
    id: "1",
    name: "NIT Rourkela Police Outpost",
    type: "police",
    coordinates: { lat: 22.2531, lng: 84.9012 },
    description: "24/7 campus police outpost",
    verified: true,
  },
  {
    id: "2",
    name: "NITR Health Centre",
    type: "hospital",
    coordinates: { lat: 22.2525, lng: 84.9015 },
    description: "Campus medical services available",
    verified: true,
  },
  {
    id: "3",
    name: "CCD NIT Rourkela",
    type: "cafe",
    coordinates: { lat: 22.2520, lng: 84.9010 },
    description: "Well-lit cafe, safe space within campus",
    verified: true,
  },
  {
    id: "4",
    name: "Back Gate Area",
    type: "unsafe",
    coordinates: { lat: 22.2510, lng: 84.9020 },
    description: "Limited lighting after dark",
    reportedBy: "Anonymous User",
    reportedAt: "2 days ago",
  },
  {
    id: "5",
    name: "Main Gate Plaza",
    type: "safe",
    coordinates: { lat: 22.2540, lng: 84.9005 },
    description: "Well-lit area with 24/7 security",
    verified: true,
  },
]

export default function SafetyMapPage() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })
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

  const getMarkerIcon = (type) => {
    switch (type) {
      case "police":
        return "/police-marker.png"
      case "hospital":
        return "/hospital-marker.png"
      case "cafe":
        return "/cafe-marker.png"
      case "safe":
        return "/safe-marker.png"
      case "unsafe":
        return "/unsafe-marker.png"
      default:
        return null
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/10">
              <CardContent className="p-0">
                <div className="relative h-[360px] sm:h-96 lg:h-[600px] rounded-lg overflow-hidden">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={14}
                      options={{
                        styles: [
                          // Add custom map styles here if needed
                          // Dark theme example:
                          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        ],
                        disableDefaultUI: true,
                        zoomControl: true,
                      }}
                    >
                      {filteredLocations.map((location) => (
                        <Marker
                          key={location.id}
                          position={location.coordinates}
                          icon={getMarkerIcon(location.type)}
                          onClick={() => setSelectedLocation(location)}
                          animation={google.maps.Animation.DROP}
                        />
                      ))}
                    </GoogleMap>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background/50 to-card/50">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-primary mx-auto mb-4 neon-glow" />
                        <h3 className="font-semibold text-lg mb-2 text-white">Loading map...</h3>
                      </div>
                    </div>
                  )}

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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">Main Street Route</p>
                        <p className="text-sm text-white/70">Well-lit, high traffic</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 self-start sm:self-auto">
                      Safest
                    </Badge>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-white">Park Avenue Route</p>
                        <p className="text-sm text-white/70">Moderate traffic, some dark areas</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 self-start sm:self-auto">
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
