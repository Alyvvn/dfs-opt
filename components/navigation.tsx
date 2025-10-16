"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Zap, DollarSign, Menu } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">DFS Optimizer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/optimizer"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Optimizer
            </Link>
            <Link
              href="/players"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Players
            </Link>
            <Link
              href="/live"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Live
            </Link>
            <Link
              href="/bankroll"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Bankroll
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Start Free Trial</Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <Link href="/dashboard" className="block text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/optimizer" className="block text-sm font-medium hover:text-primary transition-colors">
              Optimizer
            </Link>
            <Link href="/players" className="block text-sm font-medium hover:text-primary transition-colors">
              Players
            </Link>
            <Link href="/live" className="block text-sm font-medium hover:text-primary transition-colors">
              Live
            </Link>
            <Link href="/bankroll" className="block text-sm font-medium hover:text-primary transition-colors">
              Bankroll
            </Link>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" size="sm" className="w-full">
                Sign In
              </Button>
              <Button size="sm" className="w-full">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
