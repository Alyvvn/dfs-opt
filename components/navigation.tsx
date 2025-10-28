"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">DFS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/optimizer" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
              Optimizer
            </Link>
            <Link href="/players" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
              Players
            </Link>
            <Link href="/live" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
              Live
            </Link>
            <Link href="/dashboard" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
              Dashboard
            </Link>
            <Link href="/bankroll" className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
              Bankroll
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm font-medium">
              Sign In
            </Button>
            <Button size="sm" className="text-sm font-medium">
              Start Free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link href="/optimizer" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
              Optimizer
            </Link>
            <Link href="/players" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
              Players
            </Link>
            <Link href="/live" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
              Live
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/bankroll" className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/5 hover:text-primary transition-colors">
              Bankroll
            </Link>
            <div className="pt-2 space-y-2 border-t border-border/30 mt-4">
              <Button variant="ghost" size="sm" className="w-full text-sm">
                Sign In
              </Button>
              <Button size="sm" className="w-full text-sm">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
