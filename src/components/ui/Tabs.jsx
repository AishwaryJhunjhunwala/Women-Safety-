"use client"

import React, { useState } from "react"

export const Tabs = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={className}>
      {React.Children.map(children, (child) => React.cloneElement(child, { activeTab, setActiveTab }))}
    </div>
  )
}

export const TabsList = ({ children, className = "", activeTab, setActiveTab }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
  >
    {React.Children.map(children, (child) => React.cloneElement(child, { activeTab, setActiveTab }))}
  </div>
)

export const TabsTrigger = ({ children, value, className = "", activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? "bg-background text-foreground shadow-sm" : ""
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
)

export const TabsContent = ({ children, value, className = "", activeTab }) => {
  if (activeTab !== value) return null
  return <div className={className}>{children}</div>
}
