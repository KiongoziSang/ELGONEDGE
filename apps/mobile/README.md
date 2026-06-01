# ElgonOS Mobile

Expo + React Native client for the first ElgonOS mobile companion app.

## Current scope

- Tenant view for rent visibility, M-PESA workflow entry points, maintenance, gate passes, resident services, documents, Resident Community, and Resident Exchange.
- Guard view for visitor queues, gate pass validation, service provider checks, entry logs, and access exceptions.
- Manager view for lightweight approvals across Resident Community, services, construction reservations, and access exceptions.
- Typed mock data and a small API config seam ready for backend wiring.

## Run locally

```bash
npm install
npm run start
```

Then scan the Expo QR code with Expo Go.

## Useful scripts

```bash
npm run typecheck
npm run android
npm run ios
npm run web
```

`npm run ios` requires macOS for simulator builds. Expo Go can still be used for iPhone testing from the QR code.

## Backend wiring

Set `EXPO_PUBLIC_ELGONOS_API_URL` in a local `.env` when the ElgonOS API contract is ready. The current app keeps the URL in `src/config.ts` as the integration seam.
