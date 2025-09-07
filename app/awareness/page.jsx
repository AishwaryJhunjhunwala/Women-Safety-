"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  Phone,
  ExternalLink,
  Scale,
  Heart,
  AlertCircle,
  Play,
  FileText,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const legalRights = [
  {
    id: "1",
    title: "Right to Safety in Public Spaces",
    description:
      "Every woman has the right to move freely and safely in public spaces without harassment or intimidation.",
    section: "Article 21 - Right to Life and Personal Liberty",
    penalty: "Up to 3 years imprisonment and fine",
  },
  {
    id: "2",
    title: "Protection from Sexual Harassment at Workplace",
    description: "The Sexual Harassment of Women at Workplace Act, 2013 provides protection against sexual harassment.",
    section: "POSH Act 2013",
    penalty: "Disciplinary action and compensation",
  },
  {
    id: "3",
    title: "Right to File FIR",
    description:
      "Police cannot refuse to register an FIR for crimes against women. Zero FIR can be filed at any police station.",
    section: "Section 154 CrPC",
    penalty: "Departmental action against police officer",
  },
  {
    id: "4",
    title: "Protection from Domestic Violence",
    description: "The Domestic Violence Act, 2005 provides protection from physical, emotional, and economic abuse.",
    section: "DV Act 2005",
    penalty: "Up to 1 year imprisonment or fine up to ₹20,000",
  },
]

const helplines = [
  {
    id: "1",
    name: "National Emergency Number",
    number: "112",
    description: "Single emergency number for all emergency services",
    availability: "24/7",
    type: "emergency",
  },
  {
    id: "2",
    name: "Women Helpline",
    number: "1091",
    description: "Dedicated helpline for women in distress",
    availability: "24/7",
    type: "support",
  },
  {
    id: "3",
    name: "Police Emergency",
    number: "100",
    description: "Direct police emergency contact",
    availability: "24/7",
    type: "emergency",
  },
  {
    id: "4",
    name: "Women's Commission Helpline",
    number: "7827170170",
    description: "National Commission for Women helpline",
    availability: "10 AM - 6 PM (Mon-Fri)",
    type: "legal",
  },
  {
    id: "5",
    name: "Domestic Violence Helpline",
    number: "181",
    description: "Support for domestic violence victims",
    availability: "24/7",
    type: "support",
  },
  {
    id: "6",
    name: "Child Helpline",
    number: "1098",
    description: "For children and young women under 18",
    availability: "24/7",
    type: "support",
  },
]

const tutorials = [
  {
    id: "1",
    title: "Basic Self-Defense Techniques for Women",
    type: "video",
    duration: "15 min",
    difficulty: "beginner",
    description: "Learn essential self-defense moves that can help you escape dangerous situations.",
    url: "#",
  },
  {
    id: "2",
    title: "Situational Awareness Guide",
    type: "article",
    difficulty: "beginner",
    description: "How to stay alert and recognize potential threats in your environment.",
    url: "#",
  },
  {
    id: "3",
    title: "Advanced Martial Arts for Women",
    type: "video",
    duration: "30 min",
    difficulty: "advanced",
    description: "Advanced techniques for women who want to learn comprehensive self-defense.",
    url: "#",
  },
  {
    id: "4",
    title: "Digital Safety and Privacy",
    type: "guide",
    difficulty: "intermediate",
    description: "Protect yourself from online harassment and maintain digital privacy.",
    url: "#",
  },
  {
    id: "5",
    title: "Emergency Response Planning",
    type: "article",
    difficulty: "beginner",
    description: "Create a personal safety plan and emergency response strategy.",
    url: "#",
  },
  {
    id: "6",
    title: "Workplace Safety Rights",
    type: "guide",
    difficulty: "intermediate",
    description: "Know your rights and how to report workplace harassment.",
    url: "#",
  },
]

const newsItems = [
  {
    id: "1",
    title: "New Safety App Launched by Government",
    summary: "Government launches comprehensive safety app with GPS tracking and emergency alerts for women's safety.",
    date: "2024-01-10",
    source: "Ministry of Women & Child Development",
    category: "technology",
    url: "#",
  },
  {
    id: "2",
    title: "Enhanced Street Lighting Initiative",
    summary: "City administration announces installation of 10,000 new LED streetlights in identified unsafe areas.",
    date: "2024-01-08",
    source: "Municipal Corporation",
    category: "initiative",
    url: "#",
  },
  {
    id: "3",
    title: "Self-Defense Training in Schools",
    summary: "State government makes self-defense training mandatory for girls in grades 8-12.",
    date: "2024-01-05",
    source: "Education Department",
    category: "policy",
    url: "#",
  },
  {
    id: "4",
    title: "Women Safety Awareness Campaign",
    summary: "NGO launches month-long awareness campaign focusing on workplace safety and legal rights.",
    date: "2024-01-03",
    source: "Women's Rights Foundation",
    category: "awareness",
    url: "#",
  },
]

export default function AwarenessPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredNews = newsItems.filter((item) => selectedCategory === "all" || item.category === selectedCategory)

  const getHelplineIcon = (type) => {
    switch (type) {
      case "emergency":
        return <AlertCircle className="w-5 h-5 text-primary neon-glow" />
      case "support":
        return <Heart className="w-5 h-5 text-accent neon-glow-purple" />
      case "legal":
        return <Scale className="w-5 h-5 text-accent neon-glow-purple" />
      default:
        return <Phone className="w-5 h-5 text-white" />
    }
  }

  const getTutorialIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4 text-primary" />
      case "article":
        return <FileText className="w-4 h-4 text-accent" />
      case "guide":
        return <BookOpen className="w-4 h-4 text-accent" />
      default:
        return <BookOpen className="w-4 h-4 text-white" />
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "advanced":
        return "bg-primary/20 text-primary border-primary/30"
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
            <BookOpen className="w-6 h-6 text-primary neon-glow" />
            <h1 className="font-bold text-lg text-white">Awareness & Resources</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="rights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass-card border border-white/10">
            <TabsTrigger
              value="rights"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Legal Rights
            </TabsTrigger>
            <TabsTrigger
              value="helplines"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Helplines
            </TabsTrigger>
            <TabsTrigger
              value="tutorials"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Tutorials
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Latest News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rights" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Know Your Rights</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Understanding your legal rights is the first step towards ensuring your safety and seeking justice.
              </p>
            </div>

            <div className="grid gap-6">
              {legalRights.map((right) => (
                <Card key={right.id} className="glass-card border-white/10 hover:border-accent/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Scale className="w-6 h-6 text-primary neon-glow" />
                        <CardTitle className="text-lg text-white">{right.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {right.section}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 text-white/80">{right.description}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                      <div className="text-white/70">
                        <strong className="text-white">Penalty for violation:</strong> {right.penalty}
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-accent">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="helplines" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Emergency Helplines</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Keep these numbers handy. Don't hesitate to call for help when you need it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {helplines.map((helpline) => (
                <Card key={helpline.id} className="glass-card border-white/10 hover:border-accent/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {getHelplineIcon(helpline.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-white">{helpline.name}</h3>
                          <Badge variant="secondary" className="capitalize bg-white/10 text-white border-white/20">
                            {helpline.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{helpline.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white/50">{helpline.availability}</div>
                          <a href={`tel:${helpline.number}`}>
                            <Button size="sm" className="font-mono bg-primary hover:bg-primary/90 text-white neon-glow">
                              <Phone className="w-4 h-4 mr-1" />
                              {helpline.number}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Self-Defense & Safety Tutorials</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Learn practical skills and knowledge to protect yourself and stay safe.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tutorials.map((tutorial) => (
                <Card
                  key={tutorial.id}
                  className="cursor-pointer glass-card border-white/10 hover:border-accent/30 hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      {getTutorialIcon(tutorial.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1 text-white">{tutorial.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs capitalize border-white/20 text-white">
                            {tutorial.type}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                            {tutorial.difficulty}
                          </Badge>
                          {tutorial.duration && <span className="text-xs text-white/50">{tutorial.duration}</span>}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 mb-4">{tutorial.description}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple bg-transparent"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">Latest Safety News</h2>
                <p className="text-white/70">Stay updated with the latest women's safety initiatives and policies.</p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={
                    selectedCategory === "all"
                      ? "bg-primary text-white neon-glow"
                      : "glass-card border-white/20 text-white hover:bg-white/10"
                  }
                >
                  All News
                </Button>
                <Button
                  variant={selectedCategory === "policy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("policy")}
                  className={`whitespace-nowrap ${
                    selectedCategory === "policy"
                      ? "bg-primary text-white neon-glow"
                      : "glass-card border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Policy
                </Button>
                <Button
                  variant={selectedCategory === "initiative" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("initiative")}
                  className={`whitespace-nowrap ${
                    selectedCategory === "initiative"
                      ? "bg-primary text-white neon-glow"
                      : "glass-card border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Initiatives
                </Button>
                <Button
                  variant={selectedCategory === "technology" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("technology")}
                  className={`whitespace-nowrap ${
                    selectedCategory === "technology"
                      ? "bg-primary text-white neon-glow"
                      : "glass-card border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  Technology
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNews.map((news) => (
                <Card
                  key={news.id}
                  className="cursor-pointer glass-card border-white/10 hover:border-accent/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="capitalize bg-accent/20 text-accent border-accent/30">
                            {news.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-white/50">
                            <Calendar className="w-3 h-3" />
                            {news.date}
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2 text-white">{news.title}</h3>
                        <p className="text-sm text-white/70 mb-3">{news.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">Source: {news.source}</span>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-accent">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <p className="items-center text-center mt-6 gap-4 px-4 text-xl">Architected with ♥ by Team SAHAS</p>

    </div>
  )
}
