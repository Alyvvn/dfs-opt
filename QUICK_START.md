# ⚡ Quick Start - Multi-Sport DFS Optimizer

## 🚀 Get Running in 2 Minutes

### Terminal 1: Start Backend
```bash
cd /Users/alyan/Downloads/dfs-optimizer/draftkings_startup
source .venv/bin/activate
uvicorn api:app --host 0.0.0.0 --port 8000 --reload
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Terminal 2: Start Frontend
```bash
cd /Users/alyan/Downloads/dfs-optimizer
npm run dev
```

**Expected output:**
```
▲ Next.js 15.x.x
Local: http://localhost:3000
```

### Terminal 3: Test the System
```bash
# Fetch MLB players
curl http://localhost:8000/players/MLB | jq '.count'

# Or open browser
# http://localhost:3000/players
```

---

## 🎯 Use Cases

### Scenario 1: Browse MLB Players
1. Open http://localhost:3000/players
2. Sport selector already set to **MLB**
3. See 500 MLB players with:
   - Salary, Projection, Season Avg
   - Green/Red trend arrows
   - Value ratio

### Scenario 2: Switch to NBA
1. Click sport dropdown on Players page
2. Select **NBA**
3. Instantly loads 500 NBA players
4. Positions update: PG, SG, SF, PF, C
5. Teams update: LAL, BOS, etc.

### Scenario 3: Generate NFL Lineups
1. Go to http://localhost:3000/optimizer
2. Select **NFL** sport
3. Title updates to "Advanced NFL DFS Optimizer"
4. Upload NFL player CSV
5. Generate lineups

---

## 📊 What You See

### Players Page
```
Sport Selector: [MLB ▼] [NBA] [NFL]
                 
┌─────────────────────────────────────┐
│ Shohei Ohtani         LAD • OF       │ ↑ (green)
├─────────────────────────────────────┤
│ Salary: $11,500                     │
│ Projection: 48.5 pts                │
│ Season Avg: 47.2 pts                │
│ Diff: +1.3 pts (Projection higher)  │
│ Value: 4.22x                        │
└─────────────────────────────────────┘
```

---

## ✅ Quick Verification

### Check Backend is Running
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

### Check Players Endpoint
```bash
curl http://localhost:8000/players/MLB | jq '.count'
# Should return: 500
```

### Check Frontend
```bash
curl http://localhost:3000/players | grep "Player Insights"
# Should find the page
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check Python venv activated: `source .venv/bin/activate` |
| Frontend won't load | Check Node running: `npm run dev` in correct directory |
| Players not loading | Check backend on 8000: `curl http://localhost:8000/health` |
| Wrong sport shows | Clear browser cache: Ctrl+Shift+Delete |
| Trends not visible | Refresh page or check browser console |

---

## 📝 File Locations

```
/Users/alyan/Downloads/dfs-optimizer/
├── draftkings_startup/
│   ├── api.py              ← Backend API
│   ├── sports_data.py      ← Player data generators
│   └── .venv/              ← Python environment
├── app/
│   ├── players/page.tsx    ← Players page (updated)
│   ├── optimizer/page.tsx  ← Optimizer page (updated)
│   └── api/optimize/route.ts ← API proxy (updated)
├── MULTI_SPORT_SETUP.md    ← Full documentation
└── IMPLEMENTATION_SUMMARY.md ← What was built
```

---

## 🎮 Try These

### Test 1: View MLB Players
```
1. Open http://localhost:3000/players
2. See 500 MLB players
3. Try search: "Aaron Judge"
4. Try position filter: "OF"
5. Try team filter: "NYY"
```

### Test 2: Switch to NBA
```
1. Click sport dropdown
2. Select NBA
3. See positions change (PG, SG, SF, PF, C)
4. See different players
5. Try search: "LeBron"
```

### Test 3: Check Optimizer
```
1. Go to http://localhost:3000/optimizer
2. Notice title is "Advanced MLB DFS Optimizer"
3. Switch sport to NFL
4. Notice title changes to "Advanced NFL DFS Optimizer"
```

---

## 🎓 Learn More

- **Setup Details**: `MULTI_SPORT_SETUP.md`
- **Implementation**: `IMPLEMENTATION_SUMMARY.md`
- **API Docs**: http://localhost:8000/docs

---

## 💡 Tips

- 🔄 Sport switching is instant - no page refresh needed
- 📊 All player data updates automatically
- 🎯 Trends are based on projection vs. average
- 💰 Value = Points / ($1k salary)
- 🟢 Green = Projection higher than average
- 🔴 Red = Projection lower than average

---

## 🎉 You're Ready!

The multi-sport DFS optimizer is fully functional with:
- ✅ MLB, NBA, NFL support
- ✅ 500+ players per sport
- ✅ Real-time data loading
- ✅ Dynamic filtering
- ✅ Accurate trends & values

**Start exploring at http://localhost:3000/players** 🚀
