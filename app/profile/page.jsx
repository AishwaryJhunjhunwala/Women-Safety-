"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Phone, Plus, Edit, Trash2, Shield, Eye, MapPin, Bell, Lock, Users, Mic } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Ananya Pandey",
    email: "ananya.pandey@email.com",
    phone: "+91 82958 67XXX",
    emergencyMessage: "I need help! Please check on me immediately.",
  })

  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: "1",
      name: "Mom",
      phone: "+91 94160 71XXX",
      relationship: "Mother",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Rohan Patel",
      phone: "+91 75678 90XXX",
      relationship: "Partner",
      isPrimary: false,
    },
  ])

  const [trustedCircle, setTrustedCircle] = useState([
    {
      id: "1",
      name: "Mom",
      phone: "+91 94160 71XXX",
      email: "mom@email.com",
      relationship: "Mother",
      canTrackLocation: true,
      canReceiveAlerts: true,
    },
    {
      id: "2",
      name: "Best Friend",
      phone: "+91 70504 56XXX",
      email: "friend@email.com",
      relationship: "Friend",
      canTrackLocation: false,
      canReceiveAlerts: true,
    },
  ])

  const [safetySettings, setSafetySettings] = useState({
    codeWord: "safeguard",
    defaultTimer: 30,
    autoRecording: true,
    locationSharing: true,
    voiceActivation: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareLocationWithTrusted: true,
    allowDataCollection: false,
    receiveNotifications: true,
    shareReportsAnonymously: true,
    enableEmergencyBroadcast: true,
  })

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  })

  const [newTrustedMember, setNewTrustedMember] = useState({
    name: "",
    phone: "",
    email: "",
    relationship: "",
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now().toString(),
        ...newContact,
        isPrimary: emergencyContacts.length === 0,
      }
      setEmergencyContacts([...emergencyContacts, contact])
      setNewContact({ name: "", phone: "", relationship: "" })
    }
  }

  const handleRemoveContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter((contact) => contact.id !== id))
  }

  const handleAddTrustedMember = () => {
    if (newTrustedMember.name && newTrustedMember.phone) {
      const member = {
        id: Date.now().toString(),
        ...newTrustedMember,
        canTrackLocation: false,
        canReceiveAlerts: true,
      }
      setTrustedCircle([...trustedCircle, member])
      setNewTrustedMember({ name: "", phone: "", email: "", relationship: "" })
    }
  }

  const handleRemoveTrustedMember = (id) => {
    setTrustedCircle(trustedCircle.filter((member) => member.id !== id))
  }

  const updateTrustedMemberPermission = (id, permission, value) => {
    setTrustedCircle(trustedCircle.map((member) => (member.id === id ? { ...member, [permission]: value } : member)))
  }
  const openEditContact = (contact) => {
  setEditingContact(contact);
  };

  const openEditTrustedMember = (member) => {
  setEditingTrustedMember(member);
  };
  const saveEditedContact = () => {
  setEmergencyContacts(
    emergencyContacts.map((contact) =>
      contact.id === editingContact.id ? editingContact : contact
    )
  );
  setEditingContact(null); // close modal
  };

  const saveEditedTrustedMember = () => {
  setTrustedCircle(
    trustedCircle.map((member) =>
      member.id === editingTrustedMember.id ? editingTrustedMember : member
    )
  );
  setEditingTrustedMember(null); // close modal
  };


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
            <User className="w-6 h-6 text-primary neon-glow" />
            <h1 className="font-bold text-lg text-white">Profile & Settings</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-card border border-white/10">
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Emergency Contacts
            </TabsTrigger>
            <TabsTrigger
              value="safety"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Safety Settings
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:neon-glow"
            >
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Information */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 ring-2 ring-primary/30">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg bg-primary/20 text-primary">AP</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Change Photo
                    </Button>
                    <p className="text-xs text-white/50">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-message" className="text-white">
                    Emergency Message
                  </Label>
                  <Textarea
                    id="emergency-message"
                    placeholder="This message will be sent to your emergency contacts"
                    value={profile.emergencyMessage}
                    onChange={(e) => setProfile({ ...profile, emergencyMessage: e.target.value })}
                    rows={3}
                    className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                  />
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white neon-glow">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Emergency Contacts</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white neon-glow">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-white">Add Emergency Contact</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name" className="text-white">
                            Name
                          </Label>
                          <Input
                            id="contact-name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                            className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone" className="text-white">
                            Phone Number
                          </Label>
                          <Input
                            id="contact-phone"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                            className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-relationship" className="text-white">
                            Relationship
                          </Label>
                          <Select
                            value={newContact.relationship}
                            onValueChange={(value) => setNewContact({ ...newContact, relationship: value })}
                          >
                            <SelectTrigger className="glass-card border-white/20 text-white">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent className="glass-card border-white/10">
                              <SelectItem value="Mother" className="text-white hover:bg-white/10">
                                Mother
                              </SelectItem>
                              <SelectItem value="Father" className="text-white hover:bg-white/10">
                                Father
                              </SelectItem>
                              <SelectItem value="Partner" className="text-white hover:bg-white/10">
                                Partner
                              </SelectItem>
                              <SelectItem value="Sibling" className="text-white hover:bg-white/10">
                                Sibling
                              </SelectItem>
                              <SelectItem value="Friend" className="text-white hover:bg-white/10">
                                Friend
                              </SelectItem>
                              <SelectItem value="Other" className="text-white hover:bg-white/10">
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={handleAddContact}
                          className="w-full bg-primary hover:bg-primary/90 text-white neon-glow"
                        >
                          Add Contact
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-white/50" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{contact.name}</span>
                            {contact.isPrimary && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-primary/20 text-primary border-primary/30"
                              >
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/70">{contact.phone}</p>
                          <p className="text-xs text-white/50">{contact.relationship}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button  variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-accent">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="text-white hover:bg-white/10 hover:text-primary"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trusted Circle */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Trusted Circle</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-card border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-white">Add Trusted Circle Member</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="member-name" className="text-white">
                            Name
                          </Label>
                          <Input
                            id="member-name"
                            value={newTrustedMember.name}
                            onChange={(e) => setNewTrustedMember({ ...newTrustedMember, name: e.target.value })}
                            className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-phone" className="text-white">
                            Phone Number
                          </Label>
                          <Input
                            id="member-phone"
                            value={newTrustedMember.phone}
                            onChange={(e) => setNewTrustedMember({ ...newTrustedMember, phone: e.target.value })}
                            className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-email" className="text-white">
                            Email (Optional)
                          </Label>
                          <Input
                            id="member-email"
                            type="email"
                            value={newTrustedMember.email}
                            onChange={(e) => setNewTrustedMember({ ...newTrustedMember, email: e.target.value })}
                            className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-relationship" className="text-white">
                            Relationship
                          </Label>
                          <Select
                            value={newTrustedMember.relationship}
                            onValueChange={(value) => setNewTrustedMember({ ...newTrustedMember, relationship: value })}
                          >
                            <SelectTrigger className="glass-card border-white/20 text-white">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent className="glass-card border-white/10">
                              <SelectItem value="Family" className="text-white hover:bg-white/10">
                                Family
                              </SelectItem>
                              <SelectItem value="Friend" className="text-white hover:bg-white/10">
                                Friend
                              </SelectItem>
                              <SelectItem value="Colleague" className="text-white hover:bg-white/10">
                                Colleague
                              </SelectItem>
                              <SelectItem value="Neighbor" className="text-white hover:bg-white/10">
                                Neighbor
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          onClick={handleAddTrustedMember}
                          className="w-full bg-primary hover:bg-primary/90 text-white neon-glow"
                        >
                          Add Member
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trustedCircle.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 glass-card border-white/10 rounded-lg hover:border-accent/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-white/50" />
                          <div>
                            <span className="font-medium text-white">{member.name}</span>
                            <p className="text-sm text-white/70">{member.phone}</p>
                            <p className="text-xs text-white/50">{member.relationship}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTrustedMember(member.id)}
                          className="text-white hover:bg-white/10 hover:text-primary"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Can track my location</span>
                          <Switch
                            checked={member.canTrackLocation}
                            onCheckedChange={(checked) =>
                              updateTrustedMemberPermission(member.id, "canTrackLocation", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Receive emergency alerts</span>
                          <Switch
                            checked={member.canReceiveAlerts}
                            onCheckedChange={(checked) =>
                              updateTrustedMemberPermission(member.id, "canReceiveAlerts", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            {/* Safety Settings */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Safety Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code-word" className="text-white">
                    Safety Code Word
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="code-word"
                      value={safetySettings.codeWord}
                      onChange={(e) => setSafetySettings({ ...safetySettings, codeWord: e.target.value })}
                      placeholder="Enter a secret word for voice activation"
                      className="glass-card border-white/20 text-white placeholder:text-white/50 focus:border-primary/50"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="glass-card border-white/20 text-white hover:bg-white/10 hover:neon-glow-purple bg-transparent"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/50">
                    This word will trigger emergency mode when spoken during voice activation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-timer" className="text-white">
                    Default Safety Timer (minutes)
                  </Label>
                  <Select
                    value={safetySettings.defaultTimer.toString()}
                    onValueChange={(value) =>
                      setSafetySettings({ ...safetySettings, defaultTimer: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger className="glass-card border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/10">
                      <SelectItem value="15" className="text-white hover:bg-white/10">
                        15 minutes
                      </SelectItem>
                      <SelectItem value="30" className="text-white hover:bg-white/10">
                        30 minutes
                      </SelectItem>
                      <SelectItem value="60" className="text-white hover:bg-white/10">
                        1 hour
                      </SelectItem>
                      <SelectItem value="120" className="text-white hover:bg-white/10">
                        2 hours
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium text-white">Auto-start recording in emergency</span>
                      </div>
                      <p className="text-sm text-white/70">Automatically start recording when SOS is activated</p>
                    </div>
                    <Switch
                      checked={safetySettings.autoRecording}
                      onCheckedChange={(checked) => setSafetySettings({ ...safetySettings, autoRecording: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium text-white">Share location in emergency</span>
                      </div>
                      <p className="text-sm text-white/70">Send live location to emergency contacts and authorities</p>
                    </div>
                    <Switch
                      checked={safetySettings.locationSharing}
                      onCheckedChange={(checked) => setSafetySettings({ ...safetySettings, locationSharing: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Voice activation</span>
                      </div>
                      <p className="text-sm text-white/70">Enable voice commands for hands-free emergency activation</p>
                    </div>
                    <Switch
                      checked={safetySettings.voiceActivation}
                      onCheckedChange={(checked) => setSafetySettings({ ...safetySettings, voiceActivation: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Privacy & Data Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Share location with trusted circle</span>
                      </div>
                      <p className="text-sm text-white/70">Allow trusted contacts to see your location</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareLocationWithTrusted}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, shareLocationWithTrusted: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Allow anonymous data collection</span>
                      </div>
                      <p className="text-sm text-white/70">
                        Help improve safety features by sharing anonymous usage data
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.allowDataCollection}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, allowDataCollection: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Receive safety notifications</span>
                      </div>
                      <p className="text-sm text-white/70">Get alerts about safety issues in your area</p>
                    </div>
                    <Switch
                      checked={privacySettings.receiveNotifications}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, receiveNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-accent" />
                        <span className="font-medium text-white">Share community reports anonymously</span>
                      </div>
                      <p className="text-sm text-white/70">
                        Your safety reports will be shared without personal information
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.shareReportsAnonymously}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, shareReportsAnonymously: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium text-white">Enable emergency broadcast</span>
                      </div>
                      <p className="text-sm text-white/70">Send emergency alerts to nearby app users</p>
                    </div>
                    <Switch
                      checked={privacySettings.enableEmergencyBroadcast}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, enableEmergencyBroadcast: checked })
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white neon-glow"
                  >
                    Delete Account
                  </Button>
                  <p className="text-xs text-white/50 mt-2">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <p className="items-center text-center mt-6 gap-4 px-4 text-xl">Architected with ♥ by Team SAHAS</p>

    </div>
  )
}
