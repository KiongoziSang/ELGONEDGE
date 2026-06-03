# ElgonOS Mobile MVP1

Universal Expo + React Native tenant/resident app for Android and iOS.

## MVP1 scope

- Login and forgot password placeholder.
- Tenant dashboard for Grace Wanjiku at Elgon Heights Apartments, Unit B-204.
- Rent balance, payment instructions, invoices, payment history, and receipts.
- Documents for lease agreement, invoices, receipts, notices, and access card records.
- Maintenance request list and create request form.
- Official announcements/notices.
- Controlled Resident Community with approved posts and tenant post/grievance submission.
- Resident Services list with approved provider contact actions.
- Resident Exchange listings and create listing form with pending review status.
- Tenant-facing access/gate pass placeholder.
- Tenant profile, lease details, emergency contact placeholder, and logout.

## Run locally

```bash
npm install
npm run start
```

Scan the Expo QR code with Expo Go. If port `8081` is already in use, accept Expo's prompt to use another port.

## Mock login

MVP1 uses mock authentication through `src/services/api/auth.ts`.

- Email: `grace.wanjiku@example.com`
- Phone alternatives: `+254712345678` or `0712345678`
- Password: `password`

Any other credentials show a failed login message. Session data is stored with Expo SecureStore where the platform supports it and is cleared on logout.

## Useful scripts

```bash
npm run typecheck
npm run android
npm run ios
npm run web
```

`npm run ios` requires macOS for simulator builds. Expo Go can still be used for iPhone testing from the QR code.

## QA and integration planning

- [MVP1 manual QA checklist](docs/MVP1_QA_CHECKLIST.md)
- [MVP1 backend API contract draft](docs/MVP1_API_CONTRACT.md)

## Mock mode and API wiring

The app currently uses mock mode through the service layer in `src/services/api`. Screens call API service modules rather than calling backend endpoints or importing domain records directly.

Copy `.env.example` to `.env` when wiring real APIs:

```bash
EXPO_PUBLIC_API_BASE_URL=https://elgonos.elgonedge.com
EXPO_PUBLIC_USE_MOCKS=true
```

Mock mode is enabled by default. `EXPO_PUBLIC_API_BASE_URL` is read by the shared API client, and `EXPO_PUBLIC_USE_MOCKS=true` keeps the existing Grace Wanjiku mock flow active.

Set `EXPO_PUBLIC_USE_MOCKS=false` to use the Phase 1B real API wiring for login, logout, session restore/validation, tenant profile, dashboard summary, and lease details. Other MVP1 modules remain mock-backed until later integration phases.

The previous `EXPO_PUBLIC_ELGONOS_API_URL` and `EXPO_PUBLIC_ELGONOS_MOCK_MODE` names are still read as fallbacks for older local environments.

In real API mode, login stores the access token and optional refresh token in Expo SecureStore. App reload validates the stored session using refresh/session validation where available, falling back to `GET /api/mobile/tenant/me`; invalid sessions are cleared locally.

## Expected backend endpoints later

- `POST /api/mobile/auth/login`
- `POST /api/mobile/auth/logout`
- `POST /api/mobile/auth/refresh`
- `GET /api/mobile/auth/session`
- `POST /api/mobile/auth/forgot-password`
- `GET /api/mobile/tenant/me`
- `GET /api/mobile/tenant/dashboard`
- `GET /api/mobile/lease`
- `GET /api/mobile/payments/invoices`
- `GET /api/mobile/payments/receipts`
- `GET /api/mobile/payments/instructions`
- `GET /api/mobile/documents`
- `GET /api/mobile/maintenance`
- `POST /api/mobile/maintenance`
- `GET /api/mobile/announcements`
- `GET /api/mobile/community`
- `POST /api/mobile/community`
- `GET /api/mobile/services`
- `GET /api/mobile/exchange`
- `POST /api/mobile/exchange`
- `GET /api/mobile/access`

## MVP1 known gaps

- Session persistence uses Expo SecureStore where available; backend-issued token refresh and expiry handling remain future work.
- M-PESA STK push, card checkout, proof upload, QR gate pass, push notifications, and admin moderation are placeholders.
- Resident Services onboarding and approvals remain backend/admin-side workflows.
- Resident Exchange payments and dispute flows are out of scope.
