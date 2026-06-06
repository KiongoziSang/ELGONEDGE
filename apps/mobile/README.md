# ElgonOS Mobile MVP1

Universal Expo + React Native tenant/resident app for Android and iOS.

## Tenant app scope

- Login and forgot password support.
- Tenant dashboard using the authenticated tenant, property, unit, balance, and recent activity context.
- Rent balance, payment instructions, invoices, payment history, and receipts.
- Documents for lease agreement, invoices, receipts, notices, and access card records.
- Maintenance request list and create request form.
- Official announcements/notices.
- Controlled Resident Community with approved posts and tenant post/grievance submission.
- Resident Services list with approved provider contact actions.
- Resident Exchange listings and create listing form with pending review status.
- Tenant-facing access and visitor workflow status where enabled by the property.
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
EXPO_PUBLIC_USE_MOCKS=false
```

`EXPO_PUBLIC_API_BASE_URL` is read by the shared API client. With the values above, login requests are sent to:

```text
https://elgonos.elgonedge.com/api/mobile/auth/login
```

Use `EXPO_PUBLIC_USE_MOCKS=false` for real tenant authentication. If this value is `false`, `EXPO_PUBLIC_API_BASE_URL` must be set; otherwise the app shows a configuration error instead of silently using demo data.

Use `EXPO_PUBLIC_USE_MOCKS=true` only for local demo access with:

```text
grace.wanjiku@example.com / password
```

After changing `.env`, fully restart Expo. If Expo keeps old public environment values, stop the dev server and restart with a cleared cache:

```bash
npx expo start -c
```

Set `EXPO_PUBLIC_USE_MOCKS=false` to use real API mode for login, logout, session restore/validation, tenant profile, dashboard summary, lease details, payments, maintenance, announcements, community, services, exchange, documents, and access information. The app does not silently fall back to demo data when this value is `false`.

The previous `EXPO_PUBLIC_ELGONOS_API_URL` and `EXPO_PUBLIC_ELGONOS_MOCK_MODE` names are still read as fallbacks for older local environments.

In real API mode, login stores the access token and optional refresh token in Expo SecureStore. App reload validates the stored session using refresh/session validation where available, falling back to `GET /api/mobile/tenant/me`; invalid sessions are cleared locally.

## Required backend mobile endpoints

- `POST /api/mobile/auth/login`
- `POST /api/mobile/auth/logout`
- `POST /api/mobile/auth/refresh`
- `GET /api/mobile/auth/session`
- `GET /api/mobile/auth/me`
- `POST /api/mobile/auth/forgot-password`
- `GET /api/mobile/tenant/me`
- `GET /api/mobile/tenant/profile`
- `GET /api/mobile/tenant/dashboard`
- `GET /api/mobile/lease`
- `GET /api/mobile/tenant/payments`
- `GET /api/mobile/tenant/documents`
- `GET /api/mobile/tenant/maintenance`
- `POST /api/mobile/tenant/maintenance`
- `GET /api/mobile/tenant/announcements`
- `GET /api/mobile/tenant/community`
- `POST /api/mobile/tenant/community`
- `GET /api/mobile/tenant/services`
- `GET /api/mobile/tenant/exchange`
- `POST /api/mobile/tenant/exchange`
- `GET /api/mobile/tenant/access`

Authenticated endpoints require `Authorization: Bearer <token>` where the token is returned from login. Empty records should return an empty `items` array or empty-state payload, not `404`.

Phase 2 modules use these response groups:

- Payments: `invoices`, `receipts`, `paymentMethods`, and `paymentInstructions`.
- Maintenance: `items` with title, category, description, priority, status, date, and optional latest update.
- Documents, Announcements, Community, Services, and Exchange: `items` arrays with stable mobile-friendly card fields.
- Access: access card status, unit access information, visitor pre-registration status, and gate pass status.

Status display rules:

- `NEW` is derived in the app from recently created or updated dates, currently within the last 7 days.
- `Unread` means the item has not been opened/read by the tenant where the backend provides that state.
- Workflow statuses such as `Approved`, `Pending review`, `Submitted`, `In progress`, `Overdue`, and `Paid` remain separate from `NEW`.

## Expo Go and standalone builds

Expo Go is suitable for development and will show Expo bundling progress, the Expo developer menu, and development overlays. That is expected while testing from the QR code.

Use EAS preview builds when testing an installable APK with production API variables:

```bash
npx eas build --profile preview --platform android
```

Use the production profile for store-ready builds. Preview and production profiles set:

```bash
EXPO_PUBLIC_API_BASE_URL=https://elgonos.elgonedge.com
EXPO_PUBLIC_USE_MOCKS=false
```

## MVP1 known gaps

- Session persistence uses Expo SecureStore where available; backend-issued token refresh and expiry handling remain future work.
- M-PESA STK push, card checkout, proof upload, QR gate pass, push notifications, and admin moderation are placeholders.
- Resident Services onboarding and approvals remain backend/admin-side workflows.
- Resident Exchange payments and dispute flows are out of scope.
