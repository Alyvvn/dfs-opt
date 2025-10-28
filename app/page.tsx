import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, TrendingUp, Zap, DollarSign, Target, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-10 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Professional DFS Optimization Platform</span>
              <div className="flex items-center gap-1 ml-2">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span className="text-xs">MLB Active</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Build Winning<br />Lineups with<br /><span className="text-primary">Data</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professional DFS lineup optimizer with advanced projections, correlation analysis, and real-time tracking. Maximize your edge with AI-powered insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="text-base font-semibold group" asChild>
                <Link href="/optimizer">
                  Start Optimizing
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="container mx-auto px-4 py-16 border-y border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/optimizer" className="group">
            <Card className="p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Build Lineup</h3>
              <p className="text-sm text-muted-foreground">Optimize with AI</p>
            </Card>
          </Link>
          
          <Link href="/players" className="group">
            <Card className="p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 border-border/50 hover:border-secondary/30 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Player Research</h3>
              <p className="text-sm text-muted-foreground">Deep analytics</p>
            </Card>
          </Link>
          
          <Link href="/live" className="group">
            <Card className="p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Live Contests</h3>
              <p className="text-sm text-muted-foreground">Real-time tracking</p>
            </Card>
          </Link>
          
          <Link href="/bankroll" className="group">
            <Card className="p-6 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 border-border/50 hover:border-secondary/30 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Bankroll</h3>
              <p className="text-sm text-muted-foreground">Track performance</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Data-Driven Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "98.7%", label: "Projection Accuracy", icon: "📊" },
              { value: "$2.4M+", label: "Won by Users", icon: "💰" },
              { value: "15K+", label: "Active Players", icon: "👥" },
              { value: "24/7", label: "Live Support", icon: "📞" },
            ].map((stat, i) => (
              <Card key={i} className="p-8 text-center border-border/50 bg-gradient-to-br from-card/50 to-card/25 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything for Serious Players</h2>
            <p className="text-xl text-muted-foreground">Professional tools backed by data science</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Advanced Optimizer",
                description: "Multi-lineup generation with correlation analysis",
                features: ["Stack optimization", "Exposure limits", "Variance control"],
                color: "primary",
                href: "/optimizer"
              },
              {
                icon: BarChart3,
                title: "Player Analytics",
                description: "Deep dive into stats, matchups and trends",
                features: ["Advanced metrics", "Matchup analysis", "Historical data"],
                color: "secondary",
                href: "/players"
              },
              {
                icon: Zap,
                title: "Live Tracking",
                description: "Monitor lineups with real-time scoring",
                features: ["Live updates", "Rank tracking", "Win probability"],
                color: "primary",
                href: "/live"
              },
              {
                icon: DollarSign,
                title: "Bankroll Manager",
                description: "Track performance and analyze ROI",
                features: ["Performance tracking", "ROI analysis", "P&L reports"],
                color: "secondary",
                href: "/bankroll"
              },
              {
                icon: Target,
                title: "Betting Insights",
                description: "Integrate odds and public percentages",
                features: ["Live odds", "Public %", "Line alerts"],
                color: "primary",
                href: "/dashboard"
              },
              {
                icon: Shield,
                title: "Parlay Builder",
                description: "Optimized parlays with EV calculations",
                features: ["EV calculator", "Correlation matrix", "Risk tools"],
                color: "secondary",
                href: "/dashboard"
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              const isPrimary = feature.color === "primary"
              return (
                <Link key={i} href={feature.href} className="group">
                  <Card className="p-8 h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-gradient-to-br from-card/50 to-card/25 backdrop-blur-sm"
                    style={{
                      borderColor: isPrimary ? "rgb(var(--primary) / 0.2)" : "rgb(var(--secondary) / 0.2)"
                    }}
                  >
                    <div className={`w-14 h-14 ${isPrimary ? 'bg-primary/10' : 'bg-secondary/10'} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${isPrimary ? 'text-primary' : 'text-secondary'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((f, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-secondary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 md:p-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5 border-primary/30 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Your Edge?</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of players using data science to dominate DFS and sports betting.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base font-semibold group" asChild>
                <Link href="/optimizer">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-semibold" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/optimizer" className="hover:text-primary transition-colors">Optimizer</Link></li>
                <li><Link href="/players" className="hover:text-primary transition-colors">Player Analytics</Link></li>
                <li><Link href="/live" className="hover:text-primary transition-colors">Live Tracking</Link></li>
                <li><Link href="/bankroll" className="hover:text-primary transition-colors">Bankroll</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sports</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>⚾ MLB (Active)</li>
                <li>🏀 NBA (Soon)</li>
                <li>🏈 NFL (Soon)</li>
                <li>🏒 NHL (Soon)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 DFS Optimizer. Built for data-driven players.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
