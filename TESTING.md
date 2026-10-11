# Testing Guide - Phase 1 Design System Update

**Branch:** `feature/phase1-design-system-update`  
**Date:** October 10, 2026

---

## ✅ Issue Fixed: Header Not Showing

### Problem
The public header was not displaying on the homepage (`/`) due to conditional rendering in the layout file.

### Solution
Removed the conditional check `{!isHomePage && <PublicHeader />}` and now the header displays on all public pages consistently.

### Commits
- `76f183a` - fix: Show public header on homepage - Remove conditional rendering
- Latest - chore: Remove unused usePathname import

---

## 🧪 Manual Testing Checklist

### 1. Visual Testing

Start the dev server manually (npm permissions are restricted):
```bash
npm run dev
```

Then visit these pages and verify the header is visible with new colors:

#### Homepage (`http://localhost:3000`)
- [ ] Header visible at top
- [ ] Top contact bar: Deep Forest Green (#1B3B1B)
- [ ] Logo displays correctly
- [ ] Navigation links visible
- [ ] Link hover states: Vibrant Leaf Green (#7BC62D)
- [ ] "Start Learning" button: Vibrant Leaf Green
- [ ] Mobile hamburger menu works

#### About Page (`http://localhost:3000/about`)
- [ ] Header visible and consistent with homepage
- [ ] All navigation links work
- [ ] Active link highlight works

#### Courses Page (`http://localhost:3000/courses`)
- [ ] Header visible
- [ ] Mega menu opens on "Courses" hover
- [ ] Course categories organized properly
- [ ] Programme codes visible in menu

#### Other Pages
- [ ] `/contact` - Header visible
- [ ] `/verify` - Header visible
- [ ] `/posts` - Header visible

### 2. Color Verification

Check these specific elements have new brand colors:

| Element | Old Color | New Color | Location |
|---------|-----------|-----------|----------|
| Top bar background | #006600 | #1B3B1B | Header top |
| Link hover | #84ba3f | #7BC62D | All nav links |
| CTA button | #84ba3f | #7BC62D | "Start Learning" |
| Button hover | #6ea032 | #5FA020 | Button hover state |

### 3. Mobile Testing

Resize browser to mobile width (<768px) and test:
- [ ] Hamburger menu appears
- [ ] Contact bar hidden on mobile
- [ ] Mobile menu slides open
- [ ] Accordion dropdowns work
- [ ] Links tappable (44px min)
- [ ] Colors consistent with desktop

### 4. Browser Testing

Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)

### 5. Accessibility Testing

#### Color Contrast
Check with browser DevTools or [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
- [ ] White text on #1B3B1B (top bar): Should pass AA
- [ ] #7BC62D links on white background: Should pass AA
- [ ] Button text on #7BC62D: Should pass AA

#### Keyboard Navigation
- [ ] Tab through all links
- [ ] Dropdowns accessible via keyboard
- [ ] Focus indicators visible

### 6. Font Verification

Check that Inter font is loading:
- [ ] Open DevTools → Network tab
- [ ] Filter for "font"
- [ ] Confirm Inter font files loading
- [ ] Text looks modern (not Arial)

---

## 🐛 Known Issues to Monitor

### Current Status
- [x] Header not showing - FIXED
- [ ] Homepage hero section still has old colors (next task)
- [ ] Course cards still have old button colors (next task)
- [ ] Footer needs color update (next task)

### Potential Issues
1. **Font Loading Flash**: Users might briefly see Arial before Inter loads
   - Solution: Font is set to `display: swap` which is correct

2. **Tailwind Classes Not Recognized**: If custom brand classes don't work
   - Check: Tailwind config is properly formatted
   - Check: Dev server restarted after config change
   - Solution: Clear `.next` folder and rebuild

3. **Dark Mode Issues**: Dark mode colors might need adjustment
   - Check: Dark mode toggle (if implemented)
   - Verify: Dark mode variants work correctly

---

## 📸 Screenshots to Capture

Take screenshots of:
1. Homepage with header visible (desktop)
2. Homepage header on mobile
3. Mega menu dropdown (Courses)
4. Header color details (use color picker to verify hex codes)

---

## ⚡ Quick Verification Commands

```bash
# Check if old colors still exist
grep -r "#006600" src/app/(public)/ src/components/layout/public-header.tsx
grep -r "#84ba3f" src/app/(public)/ src/components/layout/public-header.tsx

# Should return: No matches (for public header - other files will be updated later)

# Check build succeeds
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## ✅ Sign-Off Checklist

Before moving to next phase:
- [ ] All header colors verified visually
- [ ] Header shows on all public pages
- [ ] Mobile navigation works
- [ ] No console errors
- [ ] Build succeeds
- [ ] Contrast ratios meet WCAG AA
- [ ] Font loads correctly

---

## 📝 Testing Notes

**Tester Name:**  
**Date:**  
**Environment:** Local Development

**Issues Found:**


**Screenshots Attached:**


**Overall Status:** ⬜ Pass  ⬜ Fail  ⬜ Needs Review

---

## Next Testing Phase

After homepage and component updates, repeat this testing for:
- Hero section colors
- CTA buttons
- Course cards
- Footer
- About page
- Courses listing page

