# Troubleshooting Guide

## Issues & Solutions

### 1. ❌ "API Error 500" when clicking "Run Contest Sim"

**Root Cause:** Python backend is not running or not reachable

**Solution:**

Check if backend is running:
```bash
curl http://localhost:8000/health
```

If you get `curl: (7) Failed to connect` or similar:

1. Start the Python backend:
```bash
cd draftkings_startup
python -m uvicorn api:app --host 0.0.0.0 --port 8000
```

2. You should see:
```
INFO:     Application startup complete
INFO:     Uvicorn running on http://0.0.0.0:8000
```

3. Test again:
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

**Alternative:** Backend is on different port or host

Check environment variable:
```bash
echo $PYTHON_API_BASE
# If empty, defaults to http://localhost:8000
# If different, update to correct location
```

---

### 2. ❌ "Only picks up player names, no other data"

**Root Cause:** CSV parsing error - columns not being read correctly

**Symptoms:**
- Players load in table but all columns show "undefined" or "0"
- Only Name column has data

**Solution:**

1. **Check CSV Column Names** (exact match required):
   ```
   ✅ Correct:
   Name,Position,Team,Salary,Predicted_DK_Points
   
   ❌ Wrong:
   Player,Pos,Team,Salary,Points
   name,position,team,salary,predicted_dk_points
   ```

2. **Use the sample CSV:**
   - Copy `sample_players.csv` 
   - Use that format exactly
   - Only change the data rows, not headers

3. **Check for hidden characters:**
   - Open CSV in text editor (NOT Excel)
   - Look for extra spaces, quotes, tabs
   - First line should start with `Name,` exactly

4. **Export correctly from Excel:**
   - File → Save As
   - Format: **CSV UTF-8 (.csv)** ← IMPORTANT
   - NOT "CSV (Comma delimited)"

---

### 3. ❌ "API Error: 500" with error details

**New feature:** API now shows detailed error messages

**What to do:**
1. Look at the error message in the alert box
2. Common errors:
   - `"Column 'salary' not found"` → Add "Salary" column to CSV
   - `"Column 'name' not found"` → Add "Name" column to CSV
   - `"Could not convert string to float"` → Check salary/points are numeric
   - `"Connection refused"` → Backend not running (see #1)

---

### 4. ❌ "Infeasible problem" or no lineups generated

**Root Cause:** Optimizer constraints are too restrictive

**Solution:**

1. **Check salary constraints:**
   - Default min: $45,000
   - Default max: $50,000
   - For MLB 9-man lineup max should be ~50000

2. **Adjust settings:**
   - Decrease "Min Salary" to $40,000 or lower
   - Increase "Max Salary" to $52,000 or higher
   - Reduce "Min Unique" from 3 to 1

3. **Check player pool:**
   - Need at least 8-10 players minimum
   - Ensure you have enough pitchers (P)
   - Ensure you have enough position players

4. **Try with sample CSV:**
   - Use `sample_players.csv` provided
   - If that works, your CSV format is the issue
   - If that fails, backend issue (see #1)

---

### 5. ⚠️ Frontend shows "Players loaded: 20" but API fails

**Root Cause:** CSV parses fine on frontend but fails on backend

**Solution:**

1. Check column name mappings:
   - Backend expects: `name`, `salary`, `projected_points`, `position`
   - Your columns must match (case-insensitive)

2. Verify numeric columns:
   ```
   ✅ Salary: 12000, 11500, 10000
   ❌ Salary: $12000, 12,000, 12K
   
   ✅ Points: 55.2, 52.1, 50.5
   ❌ Points: 55.2%, 55 1/2, 55 points
   ```

3. Open your CSV in text editor and check:
   - No extra spaces
   - No embedded quotes
   - Salary only has digits
   - Points only have digits and decimal point

---

### 6. ⚠️ Position codes not recognized

**Symptom:** Players show "UTIL" instead of actual position

**Solution:**

Verify position codes by sport:

**MLB:**
- C, 1B, 2B, 3B, SS, OF, P, DH, UTIL

**NBA:**
- PG, SG, SF, PF, C, UTIL

**NFL:**
- QB, RB, WR, TE, K, DEF, UTIL

Make sure CSV uses exact codes (case-sensitive):
```
✅ OF, 1B, SS
❌ OF, firstbase, shortstop
```

---

## Quick Debug Checklist

### Before Running Optimizer:

- [ ] Python backend running? `curl http://localhost:8000/health`
- [ ] CSV has exactly these columns: Name, Position, Team, Salary, Predicted_DK_Points
- [ ] Column names have NO extra spaces
- [ ] Salary is numeric only (no $ or commas)
- [ ] Points are numeric only (no %)
- [ ] Position codes valid for sport (C, 1B, 2B, etc. for MLB)
- [ ] CSV saved as UTF-8 (.csv), not Excel format
- [ ] At least 10 players in CSV
- [ ] Min salary is 40000 or less
- [ ] Max salary is 52000 or more

### If Still Failing:

1. Check server logs (where backend is running)
2. Try `sample_players.csv` 
3. Copy-paste exact column format from guide
4. Check file is actually .csv (not .xlsx or .txt)

---

## Common CSV Export Issues

### ❌ Excel adds extra formatting

When you save from Excel as CSV:
- It adds quotes around everything
- Adds BOM (Byte Order Mark)
- Uses wrong delimiter (semicolon in some regions)

**Fix:** Use "CSV UTF-8" format explicitly

### ❌ Google Sheets different encoding

Google Sheets default may be different encoding

**Fix:** Download as CSV UTF-8 explicitly
- File → Download → CSV (.csv)

### ❌ Data gets corrupted

If salary shows as "12,000" or "12000.00" after export

**Fix:** Format cells before export
1. Select salary column
2. Format → Number → Decimal Places: 0
3. Export as CSV

---

## System Requirements

- Python 3.8+
- FastAPI installed in Python
- uvicorn running on port 8000
- Node.js/Next.js for frontend (already running)

Check versions:
```bash
python --version
python -m pip show fastapi uvicorn
```

---

## Error Messages Explained

| Error | Meaning | Fix |
|-------|---------|-----|
| API error: 500 | Backend error or not running | Start backend on port 8000 |
| Column 'salary' not found | CSV missing Salary column | Add Salary column to CSV |
| Could not convert string to float | Salary/Points not numeric | Remove $ and commas from numbers |
| Connection refused | Backend not reachable | Check backend is running and accessible |
| Infeasible problem | Optimizer can't build lineup | Adjust salary constraints |
| status: "error" | Generic error | Check CSV format and backend logs |

---

## Getting Help

1. **Check error message details** - now includes backend URL and helpful hints
2. **Test CSV format** - use sample_players.csv as reference
3. **Check backend logs** - see actual error from Python
4. **Verify connections** - curl backend health endpoint
5. **Try test data** - confirm problem is with your CSV or backend

---

**Updated**: October 26, 2025
**Backend Logging**: Enhanced ✅
**Error Messages**: Improved ✅
