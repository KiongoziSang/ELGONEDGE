# ElgonOS Mobile MVP1 Manual QA Checklist

Use this checklist for Expo Go manual QA before backend integration. Record device model, OS version, Expo Go version, date, tester, result, and notes for each pass.

## 1. App Launch

- [ ] App starts successfully in Expo Go.
- [ ] No red screen errors appear.
- [ ] No console errors appear during normal use.
- [ ] App works after reload.

## 2. Authentication

- [ ] Login with email works: `grace.wanjiku@example.com` / `password`.
- [ ] Login with international phone works: `+254712345678` / `password`.
- [ ] Login with local phone works: `0712345678` / `password`.
- [ ] Wrong login shows a clear error.
- [ ] Forgot password placeholder opens and is clear.
- [ ] Session restores after app reload.
- [ ] Logout clears session and returns to login.

## 3. Dashboard

- [ ] Tenant name displays correctly.
- [ ] Property name displays correctly.
- [ ] Unit number displays correctly.
- [ ] Rent balance displays correctly.
- [ ] Lease status displays correctly.
- [ ] Recent announcement displays.
- [ ] Recent maintenance status displays.
- [ ] All quick actions open the correct screens.

## 4. Payments

- [ ] Rent balance displays correctly.
- [ ] Payment instructions display correctly.
- [ ] M-PESA PayBill placeholder displays.
- [ ] Till placeholder displays.
- [ ] Bank transfer placeholder displays.
- [ ] Card placeholder displays.
- [ ] Payment history displays.
- [ ] Receipts are accessible.

## 5. Documents

- [ ] Documents list displays.
- [ ] Lease agreement placeholder displays.
- [ ] Invoice documents display.
- [ ] Receipt documents display.
- [ ] Notices display.
- [ ] Empty states are usable.
- [ ] Error states are usable.

## 6. Maintenance

- [ ] Maintenance list displays.
- [ ] Create maintenance request opens.
- [ ] Category selector works.
- [ ] Priority selector works.
- [ ] Description field works.
- [ ] Submit shows success feedback.
- [ ] Empty states are usable.
- [ ] Error states are usable.

## 7. Announcements

- [ ] Announcements list displays.
- [ ] Announcement detail or full message opens if implemented.
- [ ] Read/unread state works if implemented.

## 8. Resident Community

- [ ] Approved posts display.
- [ ] Official notices display.
- [ ] Private grievance or post submission works, or the placeholder is clear.
- [ ] Pending review status displays correctly.

## 9. Resident Services

- [ ] Approved service providers display.
- [ ] Phone action handles supported devices.
- [ ] Phone action handles unsupported devices.
- [ ] WhatsApp action handles supported devices.
- [ ] WhatsApp action handles unsupported devices.
- [ ] Empty states are usable.
- [ ] Error states are usable.

## 10. Resident Exchange

- [ ] Listings display.
- [ ] Listing status displays.
- [ ] Create listing placeholder or form works.
- [ ] No payment flow is exposed in MVP1.

## 11. Access / Gate Placeholder

- [ ] Access card status displays.
- [ ] Visitor pre-registration placeholder displays.
- [ ] Gate pass placeholder displays.
- [ ] No broken QR workflow is exposed.
- [ ] No guard workflow is exposed.

## 12. Profile

- [ ] Tenant details display.
- [ ] Lease start date displays.
- [ ] Lease end date displays.
- [ ] Lease status displays.
- [ ] Logout works.

## 13. Mobile UX

- [ ] Tested on a small Android phone.
- [ ] Tested on a larger Android phone.
- [ ] Tested on an iPhone with notch or Dynamic Island.
- [ ] Tested on an iPhone without notch, if available.
- [ ] Header does not overlap the status bar.
- [ ] Logo is below phone system icons.
- [ ] Bottom tab respects safe area.
- [ ] Long screens scroll correctly.
- [ ] Bottom buttons are not hidden.
- [ ] Text is readable.
- [ ] Cards and buttons have consistent spacing.

## 14. Branding

- [ ] Colors match ElgonOS branding.
- [ ] Buttons are consistent.
- [ ] Headers are consistent.
- [ ] Cards are consistent.
- [ ] Status badges are consistent.

## 15. Regression

- [ ] Mobile typecheck passes: `npm run typecheck` from `apps/mobile`.
- [ ] Expo dependency check passes: `npx expo install --check` from `apps/mobile`.
- [ ] Root lint passes: `npm run lint` from repository root.
- [ ] Root TypeScript check passes: `npx tsc --noEmit` from repository root.
- [ ] Expo starts and Metro reaches ready state: `npm run start -- --localhost` from `apps/mobile`.
