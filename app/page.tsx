import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, TrendingUp, Zap, DollarSign, Target, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>Now supporting MLB with more sports coming soon</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Build winning lineups with <span className="text-primary">data-driven</span> optimization
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Professional DFS lineup optimizer and sports betting analytics platform. Maximize your edge with advanced
            projections, correlation analysis, and live tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base" asChild>
              <Link href="/optimizer">
                Start Optimizing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-primary/20">
            <p className="text-4xl font-bold text-primary mb-2">98.7%</p>
            <p className="text-sm text-muted-foreground">Projection Accuracy</p>
          </Card>
          <Card className="p-6 text-center border-secondary/20">
            <p className="text-4xl font-bold text-secondary mb-2">$2.4M+</p>
            <p className="text-sm text-muted-foreground">Won by Users</p>
          </Card>
          <Card className="p-6 text-center border-primary/20">
            <p className="text-4xl font-bold text-primary mb-2">15K+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </Card>
          <Card className="p-6 text-center border-secondary/20">
            <p className="text-4xl font-bold text-secondary mb-2">24/7</p>
            <p className="text-sm text-muted-foreground">Live Support</p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to dominate</h2>
          <p className="text-xl text-muted-foreground">Professional tools for serious players</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Advanced Optimizer</h3>
            <p className="text-muted-foreground mb-4">
              Build optimal lineups with correlation analysis, ownership projections, and variance control.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Multi-lineup generation</li>
              <li>• Stack optimization</li>
              <li>• Exposure limits</li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Player Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Deep dive into player stats, matchups, and trends with interactive visualizations.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Advanced metrics</li>
              <li>• Matchup analysis</li>
              <li>• Historical trends</li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
            <p className="text-muted-foreground mb-4">
              Monitor your lineups in real-time with live scoring and contest rank updates.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real-time scoring</li>
              <li>• Rank tracking</li>
              <li>• Win probability</li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bankroll Manager</h3>
            <p className="text-muted-foreground mb-4">
              Track your performance, manage your bankroll, and analyze ROI across all contests.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Performance tracking</li>
              <li>• ROI analysis</li>
              <li>• Profit/loss reports</li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Betting Insights</h3>
            <p className="text-muted-foreground mb-4">
              Integrate betting odds, public percentages, and sharp money indicators.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Live odds feed</li>
              <li>• Public betting %</li>
              <li>• Line movement alerts</li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Parlay Builder</h3>
            <p className="text-muted-foreground mb-4">
              Build optimized parlays with correlation analysis and expected value calculations.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• EV calculator</li>
              <li>• Correlation matrix</li>
              <li>• Risk assessment</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-primary/20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Ready to start winning?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of players using data to gain an edge in DFS and sports betting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/optimizer">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">View Demo</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No credit card required • 7-day free trial • Cancel anytime</p>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/optimizer" className="hover:text-primary transition-colors">
                    Optimizer
                  </Link>
                </li>
                <li>
                  <Link href="/players" className="hover:text-primary transition-colors">
                    Player Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/live" className="hover:text-primary transition-colors">
                    Live Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/bankroll" className="hover:text-primary transition-colors">
                    Bankroll
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Sports</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>MLB (Active)</li>
                <li>NFL (Coming Soon)</li>
                <li>NBA (Coming Soon)</li>
                <li>NHL (Coming Soon)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 DFS Optimizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
