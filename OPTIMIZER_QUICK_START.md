# Optimizer Quick Start Guide

## Step-by-Step: Getting Your First Lineup

### Step 1: Prepare Your CSV File

Your CSV must have these exact columns:
```
Name,Position,Team,Salary,Predicted_DK_Points
```

Example:
```csv
Name,Position,Team,Salary,Predicted_DK_Points
Aaron Judge,OF,NYY,12000,55.2
Juan Soto,OF,NYM,11500,52.1
Mike Trout,OF,LAA,10500,50.5
Kyle Schwarber,OF,PHI,10000,48.2
Corey Seager,SS,TEX,9500,47.1
Bryce Harper,OF,PHI,9000,46.0
Jose Altuve,2B,HOU,8500,45.3
Salvador Perez,C,KC,5500,39.1
Gerrit Cole,P,NYY,9500,45.1
```

**Requirements:**
- At least 8-10 players
- Salary must be numeric (no $ or commas)
- Points must be numeric (no % symbols)
- Position codes must be valid (see below)

### Step 2: Start Python Backend

```bash
cd draftkings_startup
python -m uvicorn api:app --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Application startup complete
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Open Optimizer Page

Go to: http://localhost:3000/optimizer

### Step 4: Load CSV

1. Click **"Load CSV"** button in Settings panel
2. Select your CSV file
3. You should see: "Loaded X players"

### Step 5: Adjust Settings (Optional)

**Quick Settings:**
- **Min Unique**: How many unique players between lineups (default: 3)
- **Number of Lineups**: How many to generate (default: 100)
- **Min/Max Salary**: Total lineup salary range

**For MLB 9-man lineups:**
- Min Salary: $40,000 - $45,000
- Max Salary: $50,000 - $52,000

### Step 6: Run Optimization

Click **"Run Contest Sim"** button

Wait for generation... (usually 5-30 seconds)

### Step 7: View Results

Your generated lineups appear below with:
- Player names
- Positions
- Salaries
- Projected points

Use **← Prev / Next →** to browse lineups

### Step 8: Export Lineups

Click **"Export CSV"** to download the selected lineup as CSV

---

## Position Codes

### MLB ⚾
| Code | Position |
|------|----------|
| C | Catcher |
| 1B | First Base |
| 2B | Second Base |
| 3B | Third Base |
| SS | Shortstop |
| OF | Outfield |
| P | Pitcher |
| DH | Designated Hitter |
| UTIL | Utility |

### NBA 🏀
| Code | Position |
|------|----------|
| PG | Point Guard |
| SG | Shooting Guard |
| SF | Small Forward |
| PF | Power Forward |
| C | Center |
| UTIL | Utility |

### NFL 🏈
| Code | Position |
|------|----------|
| QB | Quarterback |
| RB | Running Back |
| WR | Wide Receiver |
| TE | Tight End |
| K | Kicker |
| DEF | Defense |
| UTIL | Utility |

---

## Optimal Settings by Contest Type

### Cash Games (50/50, Double-ups)
- **Min Salary**: $44,000
- **Max Salary**: $50,500
- **Min Unique**: 2-3
- **Number of Lineups**: 5-10

### Tournament/GPP
- **Min Salary**: $42,000
- **Max Salary**: $51,000
- **Min Unique**: 4-6
- **Number of Lineups**: 50-150

### Head-to-Head
- **Min Salary**: $44,000
- **Max Salary**: $50,000
- **Min Unique**: 1-2
- **Number of Lineups**: 1-3

---

## Stack Types Explained

(In Stacks tab)

- **No Stacks**: Spread players across teams
- **4|2**: 4 players from one team, 2 from another
- **5|2**: 5 players from one team, 2 from another
- **3|3**: 3 players from two teams
- **3|3|2**: 3 from two teams, 2 from another
- **4|2|2**: 4 from one team, 2 from two others

---

## Exposure Settings

(In Exposure tab)

- **Team Exposure**: % of lineups a team can appear in
- **Player Exposure**: % of lineups a player can appear in

Example: 50% player exposure = player in 50 of 100 lineups

---

## Troubleshooting

### ❌ "API Error 500"
- Check if Python backend is running
- Try: `curl http://localhost:8000/health`
- Should return: `{"status":"ok"}`

### ❌ "Only names show, no other data"
- CSV columns wrong
- Make sure exactly: `Name,Position,Team,Salary,Predicted_DK_Points`
- No extra spaces!

### ❌ "Infeasible problem"
- Salary constraints too tight
- Lower Min Salary to $40,000
- Raise Max Salary to $52,000
- Or reduce Min Unique to 1

### ❌ No lineups generated
- Check player pool (need 8+)
- Verify position coverage (P, C, SS, etc.)
- Check constraint settings
- Try sample CSV first

See **TROUBLESHOOTING.md** for more details

---

## Advanced Tips

### Better Projections
- Use DraftKings' own projections if available
- Blend multiple projection models
- Adjust for weather, injuries

### Stack Optimization
- Stack QB with receivers/RB
- Stack pitcher with hitters when favorable
- Avoid stacking pitchers with opposite team batters

### Exposure Management
- Reduce exposure on high-correlation stacks
- Increase exposure on high-EV plays
- Randomize to reduce predictability

### Bankroll Management
- Never play more than 5% of bankroll per contest
- Use conservative projections
- Track results to calibrate edge

---

## Files You Need

1. **sample_players.csv** - Test file (use this first!)
2. **CSV_FORMAT_GUIDE.md** - Detailed column info
3. **TROUBLESHOOTING.md** - Problem solutions
4. **QUICK_REFERENCE.md** - Quick lookup

---

## Common Workflow

```
1. Export players from DraftKings or contest site
2. Verify CSV has all columns: Name, Position, Team, Salary, Predicted_DK_Points
3. Start Python backend: python -m uvicorn api:app --port 8000
4. Open optimizer: localhost:3000/optimizer
5. Load CSV
6. Adjust settings if needed
7. Click "Run Contest Sim"
8. Browse/select lineups
9. Export CSV
10. Submit to DraftKings!
```

---

**Created**: October 26, 2025
**Status**: Production Ready ✅
