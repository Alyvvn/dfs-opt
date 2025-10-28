# CSV Format Guide for DFS Optimizer

## Required CSV Columns

The optimizer expects your CSV to have these columns:

### **REQUIRED Columns** (must have these)
1. **Name** - Player name
2. **Salary** - Player salary (numeric, no $ symbol)
3. **Position** - Player position (e.g., C, 1B, 2B, 3B, SS, OF, P for MLB)
4. **Projected_DK_Points** - Projected points (numeric)

### **OPTIONAL Columns** (auto-filled if missing)
- **Team** - Team abbreviation
- Any custom columns (will be preserved)

---

## Column Name Variations (All Accepted)

The system automatically maps these column names to standard format:

| Your Column Name | Maps To | Notes |
|------------------|---------|-------|
| Salary | salary | Case-insensitive |
| SALARY | salary | |
| salary | salary | |
| Predicted_DK_Points | projected_points | DraftKings projection |
| predicted_dk_points | projected_points | |
| DK_Points | projected_points | |
| Points | projected_points | Generic points |
| FPPG | projected_points | Fantasy points per game |
| Position | position | Player position |
| position | position | |
| Name | name | Player name |
| name | name | |
| Team | team | Team abbreviation |
| team | team | |

---

## Example CSV Format

### Correct Format ✅
```csv
Name,Position,Team,Salary,Predicted_DK_Points
Aaron Judge,OF,NYY,12000,55.2
Juan Soto,OF,NYM,11500,52.1
Mookie Betts,OF,LAD,11000,51.3
Mike Trout,OF,LAA,10500,50.5
Kyle Schwarber,OF,PHI,10000,48.2
Corey Seager,SS,TEX,9500,47.1
Bryce Harper,OF,PHI,9000,46.0
Jose Altuve,2B,HOU,8500,45.3
```

### With Team Column ✅
```csv
Name,Position,Salary,Predicted_DK_Points,Team
Aaron Judge,OF,12000,55.2,NYY
Juan Soto,OF,11500,52.1,NYM
```

### Alternative Column Names ✅
```csv
name,position,salary,DK_Points,Team
Aaron Judge,OF,12000,55.2,NYY
Juan Soto,OF,11500,52.1,NYM
```

---

## Common Issues & Fixes

### ❌ Issue: "Only picks up names, no other data"

**Cause:** CSV parsing error - likely comma/quote escaping issue

**Fix:**
1. Open CSV in a text editor (NOT Excel)
2. Check for:
   - Extra spaces around column names
   - Unescaped quotes in data
   - Missing commas between columns
   - Text wrapped in quotes: `"Aaron Judge"` should be just `Aaron Judge`

3. **Export correctly from Excel:**
   - File → Save As → Format: **CSV UTF-8 (.csv)**
   - NOT "CSV (Comma delimited)" which adds extra formatting

### ❌ Issue: "API Error 500"

**Possible Causes:**
1. Backend not running on `http://localhost:8000`
2. CSV has missing required columns
3. Salary or Points columns contain non-numeric values
4. Malformed CSV (unmatched quotes, encoding issues)

**Debug Steps:**
1. Check if Python backend is running:
   ```bash
   curl http://localhost:8000/health
   # Should return: {"status":"ok"}
   ```

2. Verify CSV columns:
   - Open CSV in text editor
   - First line should be: `Name,Position,Team,Salary,Predicted_DK_Points`
   - NO extra commas, spaces, or special characters

3. Check data types:
   - Salary must be numeric: `12000` not `$12000` or `12,000`
   - Points must be numeric: `55.2` not `55.2%`
   - Position must be valid: `OF` not `Outfield`

### ❌ Issue: "Infeasible problem" or no lineups generated

**Possible Causes:**
1. Salary constraint too low (min_salary too high)
2. Not enough players in pool
3. All required positions missing

**Fix:**
1. Default min_salary: `$45,000` - increase if too restrictive
2. Default max_salary: `$50,000` - adjust based on contest
3. Ensure you have at least 8+ players

---

## Position Codes by Sport

### MLB ⚾
- **C** - Catcher
- **1B** - First Base
- **2B** - Second Base
- **3B** - Third Base
- **SS** - Shortstop
- **OF** - Outfield (any)
- **DH** - Designated Hitter
- **P** - Pitcher
- **UTIL** - Utility (any)

### NBA 🏀
- **PG** - Point Guard
- **SG** - Shooting Guard
- **SF** - Small Forward
- **PF** - Power Forward
- **C** - Center
- **UTIL** - Utility (any)

### NFL 🏈
- **QB** - Quarterback
- **RB** - Running Back
- **WR** - Wide Receiver
- **TE** - Tight End
- **K** - Kicker
- **DEF** - Defense/Special Teams
- **UTIL** - Utility (any)

---

## How to Export from DraftKings Contest

1. Go to your contest on DraftKings
2. Click "Export Player List" or similar button
3. Select CSV format
4. This will have all required columns correctly formatted
5. Upload to optimizer

---

## Formatting CSV Correctly

### Using Python (Recommended)
```python
import pandas as pd

# Read CSV
df = pd.read_csv('players.csv')

# Ensure columns
df.columns = ['Name', 'Position', 'Team', 'Salary', 'Predicted_DK_Points']

# Ensure numeric types
df['Salary'] = df['Salary'].astype(int)
df['Predicted_DK_Points'] = df['Predicted_DK_Points'].astype(float)

# Save correctly
df.to_csv('players_formatted.csv', index=False)
```

### Using Excel (Carefully!)
1. Open Excel
2. Enter data in columns:
   - Column A: Name
   - Column B: Position
   - Column C: Team
   - Column D: Salary (no $ or commas)
   - Column E: Predicted_DK_Points

3. Save As:
   - Format: **CSV UTF-8 (.csv)**
   - NOT comma delimited

---

## Data Validation Checklist

Before uploading CSV, verify:

- [ ] First row is header row with column names
- [ ] All rows have same number of columns as header
- [ ] No extra blank rows at end
- [ ] Salary values are numeric only (e.g., `12000` not `$12,000`)
- [ ] Points values are numeric (e.g., `55.2` not `55.2%`)
- [ ] Position codes match your sport
- [ ] No quotes around data unless needed for escaping
- [ ] File is UTF-8 encoded
- [ ] File extension is `.csv`
- [ ] At least 8+ players in pool

---

## Backend Requirements

The Python backend at `http://localhost:8000` must:

1. Have `/optimize-batch` endpoint
2. Accept multipart form data with `file` parameter
3. Handle CSV normalization (column name mapping)
4. Return JSON with lineups

### Starting Backend
```bash
cd draftkings_startup
python -m uvicorn api:app --host 0.0.0.0 --port 8000
```

### Testing Backend
```bash
curl http://localhost:8000/health
# Should return: {"status":"ok"}
```

---

## Troubleshooting Checklist

1. ✅ Is Python backend running?
   ```bash
   curl http://localhost:8000/health
   ```

2. ✅ CSV has required columns?
   - Name, Position, Team, Salary, Predicted_DK_Points

3. ✅ Numeric columns are actually numeric?
   - No $ signs or commas in salary
   - No % symbols in points

4. ✅ File is saved as UTF-8 CSV?
   - NOT Excel format, NOT TSV

5. ✅ No extra blank rows or columns?
   - Open in text editor to verify

6. ✅ At least 8 players in CSV?
   - Optimizer needs minimum roster size

---

## Support

**If you still get "API Error 500":**

1. Check server logs:
   ```bash
   # Terminal where backend is running
   # Look for error messages
   ```

2. Try test CSV (copy example above)

3. Check PYTHON_API_BASE environment variable:
   ```bash
   echo $PYTHON_API_BASE
   # Should be: http://localhost:8000 or blank
   ```

4. Verify backend endpoint:
   ```bash
   curl -X POST http://localhost:8000/optimize-batch \
     -F "file=@players.csv"
   ```

---

**Last Updated**: October 26, 2025  
**Status**: Production Ready ✅
