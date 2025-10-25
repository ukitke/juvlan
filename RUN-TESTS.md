# 🧪 JUVLAN - Quick Test Guide

## Run Tests in 5 Minutes

### Step 1: Automated Tests (2 minutes)

1. **Open the test page**:
   ```
   Open test-game.html in your browser
   ```

2. **Run all tests**:
   - Click the "Run All Tests" button
   - Wait for tests to complete
   - Check that all tests show ✅ (green checkmarks)

3. **Expected Results**:
   - ✅ Question bank: 100 questions
   - ✅ All questions have valid structure
   - ✅ No duplicate IDs
   - ✅ Random selection works
   - ✅ AudioManager functional
   - ✅ All methods exist

### Step 2: Quick Manual Test (3 minutes)

1. **Open the game**:
   ```
   Open index.html in your browser
   ```

2. **Test Quiz Phase**:
   - Click "Inizia l'Infiltrazione"
   - Answer 2-3 questions
   - Verify:
     - ✅ Questions display correctly
     - ✅ Answer buttons work
     - ✅ Feedback appears
     - ✅ Score updates

3. **Test Bomberman Phase**:
   - Get 5/10 correct to advance (or modify code temporarily)
   - Test controls:
     - ✅ Arrow keys move player
     - ✅ Space places bombs
     - ✅ Bombs explode after 3 seconds
     - ✅ Audio plays (if enabled)

4. **Test Mobile Controls** (if on mobile or using DevTools):
   - Open Chrome DevTools (F12)
   - Click device toolbar (Ctrl+Shift+M)
   - Select a mobile device
   - Test:
     - ✅ Virtual joystick appears
     - ✅ Bomb button appears
     - ✅ Touch controls work

---

## Full Testing (Optional)

### For Comprehensive Testing

1. **Read Documentation**:
   - `TESTING-SUMMARY.md` - Overview of all tests
   - `TEST-RESULTS.md` - Detailed test results
   - `MOBILE-TEST-GUIDE.md` - Mobile device testing

2. **Deploy to Test Server**:
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx http-server
   
   # Option 3: GitHub Pages
   git push origin main
   ```

3. **Test on Real Devices**:
   - Follow `MOBILE-TEST-GUIDE.md`
   - Test on iOS and Android
   - Document results in `TEST-RESULTS.md`

---

## Test Status

### ✅ Automated Tests
- Question bank structure
- Audio system setup
- Code diagnostics

### ⏳ Manual Tests (User Action Required)
- Gameplay flow
- Mobile device testing
- Cross-browser testing
- Performance profiling

---

## Quick Checklist

Before deploying to production:

- [ ] Automated tests pass (test-game.html)
- [ ] Quiz phase works (10 questions)
- [ ] Bomberman phase works (5 levels)
- [ ] Mobile controls work (joystick + bomb)
- [ ] Audio plays (sounds + speech)
- [ ] Works on mobile device
- [ ] Works in different browsers
- [ ] PWA installs correctly

---

## Need Help?

- **Automated tests failing?** Check browser console for errors
- **Game not loading?** Make sure you're running from a server (not file://)
- **Audio not working?** Check browser audio permissions
- **Mobile controls not showing?** Make sure you're in Phase 2 (Bomberman)

---

## Files Reference

- `test-game.html` - Automated test suite
- `TEST-RESULTS.md` - Detailed test documentation
- `MOBILE-TEST-GUIDE.md` - Mobile testing checklist
- `TESTING-SUMMARY.md` - Test status overview
- `README.md` - Project documentation

---

**Quick Start**: Just open `test-game.html` and click "Run All Tests"! 🚀
