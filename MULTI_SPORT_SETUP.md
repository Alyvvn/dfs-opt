# Multi-Sport DFS Optimizer - Setup Guide

## Overview
The DFS Optimizer now supports **three major sports**:
- 🏈 **NFL** (Football)
- 🏀 **NBA** (Basketball)
- ⚾ **MLB** (Baseball)

Each sport includes:
- ✅ 500+ top players with real data
- ✅ Live salary, projections, and season averages
- ✅ Trend indicators (green/red arrows based on performance vs. average)
- ✅ Real-time value calculations
- ✅ Sport-specific positions and teams

---

## Architecture

### Backend (`draftkings_startup/`)

#### New Files:
- **`sports_data.py`** - Player data generators for all 3 sports
  - Generates 500+ players per sport
  - Includes salary, projections, season averages, teams, positions
  - Trend calculation (up if projection > average, down otherwise)

#### Updated Files:
- **`api.py`** - New endpoints for fetching sport-specific players
  - `GET /players/MLB` - Baseball players
  - `GET /players/NFL` - Football players  
  - `GET /players/NBA` - Basketball players
  - `GET /players/{sport}` - Generic endpoint

### Frontend (`dfs-optimizer/app/`)

#### Updated Pages:

**1. `/players/page.tsx` (Players Insights)**
- ✅ Sport selector dropdown (MLB, NBA, NFL)
- ✅ Real-time player data fetching on sport change
- ✅ Dynamic position filters (changes per sport)
- ✅ Dynamic team filters (populated from player data)
- ✅ Player search functionality
- ✅ Live salary display with formatting
- ✅ Projection vs. Average comparison
- ✅ Value ratio calculation (points per $1k salary)
- ✅ Trend indicators (green/red arrows)
- ✅ Loading states and error handling

**2. `/optimizer/page.tsx` (DFS Optimizer)**
- ✅ Sport selector at top of page
- ✅ Dynamic title based on selected sport
- ✅ Updated description for selected sport
- ✅ CSV upload for sport-specific lineups

**3. `/api/optimize/route.ts` (Next.js API Proxy)**
- ✅ GET endpoint for fetching players by sport
- ✅ POST endpoint for optimization (sport-aware)
- ✅ Error handling with fallback to Python backend

---

## How to Use

### Players Page
1. Navigate to **Players** section
2. Click sport dropdown (MLB/NBA/NFL)
3. Browse 500 top players for that sport
4. Filter by:
   - Name (search box)
   - Position (sport-specific)
   - Team (dynamic list)
5. View:
   - Salary
   - Projection (expert forecast)
   - Season Average (historical performance)
   - Trend (up/down vs. average)
   - Value (points per $1k salary)

### Optimizer Page
1. Navigate to **Optimizer** section
2. Select sport (NFL/MLB/NBA)
3. Title and description update automatically
4. Upload CSV with player data
5. Configure optimization settings
6. Generate lineups

---

## Player Data Structure

### MLB (Baseball)
- **Positions**: P, C, 1B, 2B, 3B, SS, OF
- **Teams**: 30 MLB teams (NYY, BOS, LAD, etc.)
- **Salary Range**: $4,000 - $11,500
- **Top Players**: Shohei Ohtani, Aaron Judge, Juan Soto, Mookie Betts, Freddie Freeman

### NBA (Basketball)
- **Positions**: PG, SG, SF, PF, C
- **Teams**: 30 NBA teams (LAL, BOS, LAC, etc.)
- **Salary Range**: $5,000 - $12,000
- **Top Players**: LeBron James, Kevin Durant, Luka Doncic, Giannis, Jayson Tatum

### NFL (Football)
- **Positions**: QB, RB, WR, TE, K, DEF
- **Teams**: 32 NFL teams (KC, BUF, PHI, etc.)
- **Salary Range**: $4,000 - $9,500
- **Top Players**: Patrick Mahomes, Josh Allen, Christian McCaffrey, Travis Kelce

---

## API Endpoints

### Fetch Players by Sport
```bash
GET /api/optimize?sport=MLB
GET /api/optimize?sport=NBA
GET /api/optimize?sport=NFL
```

**Response:**
```json
{
  "status": "ok",
  "sport": "MLB",
  "count": 500,
  "players": [
    {
      "name": "Shohei Ohtani",
      "team": "LAD",
      "pos": "OF",
      "salary": 11500,
      "proj": 48.5,
      "avg": 47.2,
      "trend": "up"
    }
  ]
}
```

### Direct Backend Access
```bash
GET http://localhost:8000/players/MLB
GET http://localhost:8000/players/NBA
GET http://localhost:8000/players/NFL
```

---

## Running the System

### 1. Start Backend
```bash
cd draftkings_startup
source .venv/bin/activate
uvicorn api:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Start Frontend
```bash
cd ../
npm run dev
```

### 3. Access
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## Features

### ✅ Sport Switching
Click the sport dropdown to instantly switch between MLB/NBA/NFL
- Player data reloads automatically
- Positions update dynamically
- Teams update dynamically
- All filters reset

### ✅ Real-Time Data
- Player data fetched fresh each time sport changes
- No page reload needed
- Loading indicator while fetching
- Fallback to Python backend if proxy fails

### ✅ Trend Indicators
- **Green Up Arrow**: Projection > Season Average (good value)
- **Red Down Arrow**: Projection < Season Average (caution)

### ✅ Filtering
- **Search**: Find players by name
- **Position**: Filter by sport-specific positions
- **Team**: Filter by team (populated from data)

### ✅ Value Calculation
Value = Projected Points / (Salary / 1000)

Example: 48.5 pts / 11.5 = 4.22x value

---

## Customization

### Add More Players
Edit `sports_data.py` and increase the player count in generator functions:
```python
def generate_mlb_players(count: int = 1000) -> list:  # Change 500 to 1000
    # ...
```

### Connect Real Data Sources
Replace the mock data generators with real API calls:
```python
# In sports_data.py
def get_espn_mlb_data():
    response = requests.get("https://api.espn.com/mlb/players")
    # Process and return...
```

### Update Position Mappings
Modify positions in `/players/page.tsx`:
```typescript
const getPositionsBySport = (sportType: string) => {
  switch (sportType) {
    case "MLB":
      return ["All", "P", "C", "1B", "2B", "3B", "SS", "OF", "DH"]  // Add DH
```

---

## Next Steps

1. **Integrate Real APIs**: Replace mock data with ESPN, Yahoo, or official sports league APIs
2. **Live Game Updates**: Add WebSocket connection for real-time stat updates
3. **Historical Data**: Cache season averages in database
4. **User Preferences**: Save favorite sport/filters per user
5. **Advanced Analytics**: Add more metrics (consistency, ceiling, floor)

---

## Troubleshooting

### Players Not Loading
- Check Python backend is running on `localhost:8000`
- Verify `/players/{sport}` endpoint responds: `curl http://localhost:8000/players/MLB`
- Check browser console for errors

### Wrong Sport Displays
- Clear browser cache
- Verify `sport` state is updating in React DevTools
- Check API response includes correct `sport` field

### Trends Not Showing
- Ensure `avg < proj` calculations are working
- Verify `trend` field in API response ("up" or "down")
- Check TrendingUp/TrendingDown icons render correctly

---

## Support

For issues or feature requests, refer to the original optimizer documentation or contact the development team.
