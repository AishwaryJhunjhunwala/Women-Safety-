
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  MessageCircle,
  ThumbsUp,
  MapPin,
  Calendar,
  Clock,
  Plus,
  Shield,
  Megaphone,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

const mockReports = [
  {
    id: "1",
    title: "Poor lighting in Central Park area",
    location: "Central Park, Sector 15",
    description:
      "The street lights have been broken for weeks. Very dark after 7 PM, making it unsafe for women walking alone.",
    category: "poor-lighting",
    reportedBy: "Neha M.",
    reportedAt: "2 hours ago",
    likes: 12,
    comments: [
      {
        id: "1",
        author: "Priya K.",
        content: "I've noticed this too. Reported to local authorities but no response yet.",
        timestamp: "1 hour ago",
      },
      {
        id: "2",
        author: "Anonymous",
        content: "Same issue near the bus stop. We should collectively report this.",
        timestamp: "45 minutes ago",
      },
    ],
    verified: false,
    severity: "high",
  },
  {
    id: "2",
    title: "Suspicious activity near Metro Station",
    location: "Green Line Metro Station",
    description: "Group of men loitering and making inappropriate comments to women passengers during evening hours.",
    category: "suspicious-activity",
    reportedBy: "Anonymous User",
    reportedAt: "5 hours ago",
    likes: 8,
    comments: [
      {
        id: "3",
        author: "Meera S.",
        content: "I experienced this yesterday. Security should be increased.",
        timestamp: "3 hours ago",
      },
    ],
    verified: true,
    severity: "high",
  },
  {
    id: "3",
    title: "Safe route recommendation",
    location: "Market Street to University",
    description: "Well-lit path with good foot traffic and security cameras. Recommended for evening commute.",
    category: "other",
    reportedBy: "Anjali R.",
    reportedAt: "1 day ago",
    likes: 25,
    comments: [],
    verified: true,
    severity: "low",
  },
]

const mockCampaigns = [
  {
    id: "1",
    title: "Self-Defense Workshop for Women",
    organizer: "Women Safety Foundation",
    date: "2024-01-15",
    time: "10:00 AM - 2:00 PM",
    location: "Community Center, Block A",
    type: "workshop",
    description: "Learn basic self-defense techniques and safety awareness. Free workshop for all women.",
    participants: 45,
  },
  {
    id: "2",
    title: "Safety Awareness Campaign",
    organizer: "Local Police Department",
    date: "2024-01-20",
    time: "6:00 PM - 8:00 PM",
    location: "City Mall, Main Auditorium",
    type: "awareness",
    description: "Interactive session on women's rights, safety laws, and emergency procedures.",
    participants: 120,
  },
  {
    id: "3",
    title: "Night Safety Patrol Training",
    organizer: "Volunteer Safety Group",
    date: "2024-01-25",
    time: "7:00 PM - 9:00 PM",
    location: "Police Station Conference Room",
    type: "training",
    description: "Training for community volunteers to conduct safety patrols in residential areas.",
    participants: 28,
  },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newReport, setNewReport] = useState({
    title: "",
    location: "",
    description: "",
    category: "",
    severity: "medium",
  })
  const [reports, setReports] = useState(mockReports)
  const [newComment, setNewComment] = useState("")
  const [selectedReport, setSelectedReport] = useState(null)

  const filteredReports = reports.filter((report) => selectedCategory === "all" || report.category === selectedCategory)

  const handleLikeReport = (reportId) => {
    setReports(reports.map((report) => (report.id === reportId ? { ...report, likes: report.likes + 1 } : report)))
  }

  const handleSubmitReport = () => {
    if (newReport.title && newReport.location && newReport.description) {
      const report = {
        id: Date.now().toString(),
        ...newReport,
        category: newReport.category,
        severity: newReport.severity,
        reportedBy: "You",
        reportedAt: "Just now",
        likes: 0,
        comments: [],
        verified: false,
      }
      setReports([report, ...reports])
      setNewReport({ title: "", location: "", description: "", category: "", severity: "medium" })
    }
  }

  const handleAddComment = (reportId) => {
    if (newComment.trim()) {
      setReports(
        reports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                comments: [
                  ...report.comments,
                  {
                    id: Date.now().toString(),
                    author: "You",
                    content: newComment,
                    timestamp: "Just now",
                  },
                ],
              }
            : report,
        ),
      )
      setNewComment("")
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "harassment":
        return <AlertTriangle className="w-4 h-4 text-primary" />
      case "poor-lighting":
        return <Shield className="w-4 h-4 text-yellow-400" />
      case "suspicious-activity":
        return <AlertTriangle className="w-4 h-4 text-orange-400" />
      case "unsafe-area":
        return <MapPin className="w-4 h-4 text-primary" />
      default:
        return <MessageCircle className="w-4 h-4 text-accent" />
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-primary/20 text-primary border-primary/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
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
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary neon-glow" />
            <h1 className="font-bold text-base sm:text-lg text-white">Community</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-3 sm:p-4">
        <Tabs defaultValue="reports" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 glass-card border border-white/10">
            <TabsTrigger
              value="reports"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow text-sm sm:text-base py-2"
            >
              Safety Reports
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow text-sm sm:text-base py-2"
            >
              Awareness Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-4 sm:space-y-6">
            {/* Filters and New Report */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={`text-xs whitespace-nowrap ${
                    selectedCategory === "all"
                      ? "bg-primary text-white neon-glow"
                      : "glass-card border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  All Reports
                </Button>
                <Button
                  variant={selectedCategory === "harassment" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("harassment")}
                  className={`whitespace-nowrap text-xs ${selectedCategory === "harassment" ? "bg-primary text-white neon-glow" : "glass-card border-white/20 text-white hover:bg-white/10"}`}
                >
                  Harassment
                </Button>
                <Button
                  variant={selectedCategory === "poor-lighting" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("poor-lighting")}
                  className={`whitespace-nowrap text-xs ${selectedCategory === "poor-lighting" ? "bg-primary text-white neon-glow" : "glass-card border-white/20 text-white hover:bg-white/10"}`}
                >
                  Poor Lighting
                </Button>
                <Button
                  variant={selectedCategory === "suspicious-activity" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("suspicious-activity")}
                  className={`whitespace-nowrap text-xs ${selectedCategory === "suspicious-activity" ? "bg-primary text-white neon-glow" : "glass-card border-white/20 text-white hover:bg-white/10"}`}
                >
                  Suspicious Activity
                </Button>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-white neon-glow w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    New Report
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md glass-card border-white/10 mx-4">
                  <DialogHeader>
                    <DialogTitle className="text-white">Submit Safety Report</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                      <Label htmlFor="title" className="text-white">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={newReport.title}
                        onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                        className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-white">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Where did this happen?"
                        value={newReport.location}
                        onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                        className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-white">
                        Category
                      </Label>
                      <Select
                        value={newReport.category}
                        onValueChange={(value) => setNewReport({ ...newReport, category: value })}
                      >
                        <SelectTrigger className="glass-card border-white/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-white/10">
                          <SelectItem value="harassment" className="text-white hover:bg-white/10">
                            Harassment
                          </SelectItem>
                          <SelectItem value="poor-lighting" className="text-white hover:bg-white/10">
                            Poor Lighting
                          </SelectItem>
                          <SelectItem value="suspicious-activity" className="text-white hover:bg-white/10">
                            Suspicious Activity
                          </SelectItem>
                          <SelectItem value="unsafe-area" className="text-white hover:bg-white/10">
                            Unsafe Area
                          </SelectItem>
                          <SelectItem value="other" className="text-white hover:bg-white/10">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="severity" className="text-white">
                        Severity
                      </Label>
                      <Select
                        value={newReport.severity}
                        onValueChange={(value) => setNewReport({ ...newReport, severity: value })}
                      >
                        <SelectTrigger className="glass-card border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card border-white/10">
                          <SelectItem value="low" className="text-white hover:bg-white/10">
                            Low
                          </SelectItem>
                          <SelectItem value="medium" className="text-white hover:bg-white/10">
                            Medium
                          </SelectItem>
                          <SelectItem value="high" className="text-white hover:bg-white/10">
                            High
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the incident"
                        value={newReport.description}
                        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                        rows={3}
                        className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 resize-none"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitReport}
                      className="w-full bg-primary hover:bg-primary/90 text-white neon-glow"
                    >
                      Submit Report
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Reports List */}
            <div className="space-y-3 sm:space-y-4">
              {filteredReports.map((report) => (
                <Card key={report.id} className="glass-card border-white/10 hover:border-accent/30 transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {/* Report Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {getCategoryIcon(report.category)}
                            <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">{report.title}</h3>
                            {report.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-500/20 text-green-300 border-green-500/30"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="break-words">{report.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {report.reportedAt}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getSeverityColor(report.severity)} text-xs self-start`}>
                          {report.severity} priority
                        </Badge>
                      </div>

                      {/* Report Content */}
                      <p className="text-sm text-white/80 leading-relaxed">{report.description}</p>

                      {/* Report Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikeReport(report.id)}
                            className="flex items-center gap-1 text-white hover:bg-white/10 hover:text-primary p-1 h-auto"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{report.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                            className="flex items-center gap-1 text-white hover:bg-white/10 hover:text-accent p-1 h-auto"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{report.comments.length}</span>
                          </Button>
                        </div>
                        <div className="text-xs text-white/50">Reported by {report.reportedBy}</div>
                      </div>

                      {/* Comments Section */}
                      {selectedReport === report.id && (
                        <div className="space-y-3 pt-4 border-t border-white/10">
                          {report.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="w-6 h-6 flex-shrink-0">
                                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                                  {comment.author.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                  <span className="text-sm font-medium text-white">{comment.author}</span>
                                  <span className="text-xs text-white/50">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-white/80 leading-relaxed break-words">{comment.content}</p>
                              </div>
                            </div>
                          ))}

                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyPress={(e) => e.key === "Enter" && handleAddComment(report.id)}
                              className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50 text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddComment(report.id)}
                              className="bg-primary hover:bg-primary/90 text-white neon-glow text-sm px-3 flex-shrink-0"
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4 sm:space-y-6">
            <div className="grid gap-3 sm:gap-4">
              {mockCampaigns.map((campaign) => (
                <Card key={campaign.id} className="glass-card border-white/10 hover:border-accent/30 transition-colors">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {campaign.type === "workshop" && <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary neon-glow" />}
                          {campaign.type === "awareness" && <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary neon-glow" />}
                          {campaign.type === "training" && <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary neon-glow" />}
                          <h3 className="font-semibold text-base sm:text-lg text-white leading-tight">{campaign.title}</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">Organized by {campaign.organizer}</p>
                      </div>
                      <Badge variant="outline" className="capitalize border-white/20 text-white text-xs self-start">
                        {campaign.type}
                      </Badge>
                    </div>

                    <p className="text-sm mb-4 text-white/80 leading-relaxed">{campaign.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Calendar className="w-4 h-4 text-white/50 flex-shrink-0" />
                        <span className="break-words">{campaign.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Clock className="w-4 h-4 text-white/50 flex-shrink-0" />
                        <span className="break-words">{campaign.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70 sm:col-span-2 lg:col-span-1">
                        <MapPin className="w-4 h-4 text-white/50 flex-shrink-0" />
                        <span className="break-words">{campaign.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-sm text-white/50">{campaign.participants} participants registered</div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white neon-glow w-full sm:w-auto">
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <p className="items-center text-center mt-4 sm:mt-6 gap-4 px-4 text-sm sm:text-base md:text-lg lg:text-xl">
        Architected with ♥ by Team SAHAS
      </p>
    </div>
  )
}
