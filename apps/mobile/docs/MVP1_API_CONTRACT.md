# ElgonOS Mobile MVP1 API Contract Draft

This draft defines the expected REST API shape for wiring ElgonOS Mobile MVP1 to the backend. It is a planning contract, not an implementation requirement for this pass.

## Common Conventions

- Base path: `/api/mobile`
- Mobile environment variables:
  - `EXPO_PUBLIC_API_BASE_URL` sets the backend origin, for example `https://elgonos.elgonedge.com`.
  - `EXPO_PUBLIC_USE_MOCKS=true` keeps the Expo app on local mock handlers.
  - `EXPO_PUBLIC_USE_MOCKS=false` should be used only after a service module is intentionally wired to real endpoints.
- Request and response format: JSON, unless a document download URL is returned.
- Auth: authenticated endpoints require `Authorization: Bearer <accessToken>`.
- Dates: ISO 8601 strings.
- Money: numeric amount plus explicit currency where needed.
- Errors: return a clear code and message.

## Phase 1A Mobile Integration Approach

Phase 1A prepares the mobile foundation without connecting screens to the backend yet. The shared API client owns base URL resolution, JSON request/response handling, bearer token injection, timeout handling, mock mode detection, and consistent API errors. Existing screen-facing service modules remain mock-backed until Phase 1B explicitly wires one endpoint group at a time.

## Phase 1B Mobile Integration Scope

Phase 1B now wires authentication, session restore/validation, logout, tenant profile, dashboard summary, lease details, payments, maintenance, announcements, community, services, exchange, documents, and access information. In mock mode, the Grace Wanjiku mock flow remains fully usable without a backend. In real API mode, the app uses `EXPO_PUBLIC_API_BASE_URL`, stores access and optional refresh tokens in Expo SecureStore, validates stored sessions on reload, clears invalid sessions locally, and does not silently fall back to demo data.

Integrated Phase 1B endpoints:

- `POST /api/mobile/auth/login`
- `POST /api/mobile/auth/logout`
- `POST /api/mobile/auth/refresh`
- `GET /api/mobile/auth/session`
- `GET /api/mobile/tenant/me`
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

Backend assumptions:

- Login returns `accessToken`, optional `refreshToken`, optional expiry metadata, and a tenant summary.
- Authenticated endpoints accept `Authorization: Bearer <accessToken>`.
- If refresh is unavailable, `GET /api/mobile/auth/session` or `GET /api/mobile/tenant/me` can validate an existing token.
- Mobile service modules may map backend DTOs into the app's existing view models.

Example error:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Session expired. Please log in again."
  }
}
```

## Authentication

### Login

- Method: `POST`
- Path: `/api/mobile/auth/login`
- Purpose: Authenticate a tenant by email or phone.
- Auth required: No
- Request body:

```json
{
  "identifier": "grace.wanjiku@example.com",
  "password": "password"
}
```

- Response body:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "tenant": {
    "id": "tenant_001",
    "fullName": "Grace Wanjiku",
    "phone": "+254712345678",
    "email": "grace.wanjiku@example.com"
  }
}
```

- Notes/assumptions: `identifier` accepts email, `+254` phone, or local `07` phone format.

### Logout

- Method: `POST`
- Path: `/api/mobile/auth/logout`
- Purpose: Invalidate the current session or refresh token.
- Auth required: Yes
- Request body:

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

- Response body:

```json
{
  "success": true
}
```

- Notes/assumptions: Client also clears local SecureStore session state.

### Forgot Password

- Method: `POST`
- Path: `/api/mobile/auth/forgot-password`
- Purpose: Start a password reset flow or record a support request.
- Auth required: No
- Request body:

```json
{
  "identifier": "grace.wanjiku@example.com"
}
```

- Response body:

```json
{
  "success": true,
  "message": "If the account exists, reset instructions will be sent."
}
```

- Notes/assumptions: MVP1 may show this as a placeholder until reset delivery is finalized.

### Refresh Token / Session Validation

- Method: `POST`
- Path: `/api/mobile/auth/refresh`
- Purpose: Refresh access token and validate stored session.
- Auth required: No
- Request body:

```json
{
  "refreshToken": "jwt-refresh-token"
}
```

- Response body:

```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token",
  "expiresIn": 3600
}
```

- Notes/assumptions: Backend may rotate refresh tokens.

## Tenant Dashboard

### Get Current Tenant Profile

- Method: `GET`
- Path: `/api/mobile/tenant/me`
- Purpose: Return the logged-in tenant and unit context.
- Auth required: Yes
- Response body:

```json
{
  "id": "tenant_001",
  "fullName": "Grace Wanjiku",
  "email": "grace.wanjiku@example.com",
  "phone": "+254712345678",
  "propertyName": "Elgon Heights Apartments",
  "unitNumber": "B-204"
}
```

- Notes/assumptions: This endpoint should reflect the active lease context.

### Get Current Tenant Dashboard Summary

- Method: `GET`
- Path: `/api/mobile/tenant/dashboard`
- Purpose: Return summary data for the Home screen.
- Auth required: Yes
- Response body:

```json
{
  "rentBalance": 18500,
  "currency": "KES",
  "nextDueDate": "2026-06-05",
  "paymentStatus": "Pending",
  "leaseStatus": "Active",
  "recentAnnouncement": {
    "id": "ann_001",
    "title": "Water maintenance notice",
    "message": "Scheduled water maintenance will happen this weekend.",
    "read": false
  },
  "recentMaintenance": {
    "id": "mnt_001",
    "title": "Kitchen sink repair",
    "status": "In Progress",
    "description": "Technician assigned."
  }
}
```

- Notes/assumptions: Keep payload optimized for first dashboard render.

## Payments

### Get Rent Balance

- Method: `GET`
- Path: `/api/mobile/payments/balance`
- Purpose: Return current rent balance and next due date.
- Auth required: Yes
- Response body:

```json
{
  "amount": 18500,
  "currency": "KES",
  "nextDueDate": "2026-06-05",
  "status": "Pending"
}
```

- Notes/assumptions: This should match dashboard balance.

### Get Invoices

- Method: `GET`
- Path: `/api/mobile/payments/invoices`
- Purpose: Return tenant invoices.
- Auth required: Yes
- Response body:

```json
{
  "invoices": [
    {
      "id": "inv_001",
      "invoiceNumber": "INV-2026-06",
      "amount": 18500,
      "currency": "KES",
      "dueDate": "2026-06-05",
      "status": "Pending"
    }
  ]
}
```

- Notes/assumptions: Sort newest first unless the client requests otherwise later.

### Get Payment Instructions

- Method: `GET`
- Path: `/api/mobile/payments/instructions`
- Purpose: Return available payment channels and placeholders.
- Auth required: Yes
- Response body:

```json
{
  "instructions": [
    {
      "type": "mpesa_paybill",
      "label": "M-PESA PayBill",
      "accountNumber": "B204",
      "paybill": "000000",
      "enabled": false
    },
    {
      "type": "bank_transfer",
      "label": "Bank Transfer",
      "enabled": false
    }
  ]
}
```

- Notes/assumptions: MVP1 exposes instructions/placeholders only, not checkout.

### Get Payment History

- Method: `GET`
- Path: `/api/mobile/payments/history`
- Purpose: Return confirmed and pending payment records.
- Auth required: Yes
- Response body:

```json
{
  "payments": [
    {
      "id": "pay_001",
      "amount": 18500,
      "currency": "KES",
      "paidAt": "2026-05-04T09:30:00Z",
      "method": "M-PESA",
      "status": "Confirmed",
      "reference": "QF12ABC345"
    }
  ]
}
```

- Notes/assumptions: Backend owns payment verification status.

### Get Receipts

- Method: `GET`
- Path: `/api/mobile/payments/receipts`
- Purpose: Return receipt summaries.
- Auth required: Yes
- Response body:

```json
{
  "receipts": [
    {
      "id": "rcp_001",
      "receiptNumber": "RCP-2026-05",
      "amount": 18500,
      "currency": "KES",
      "issuedAt": "2026-05-04T09:35:00Z",
      "viewUrl": "https://example.com/receipts/rcp_001"
    }
  ]
}
```

- Notes/assumptions: Receipt URLs may be short-lived signed URLs.

## Documents

### Get Tenant Documents

- Method: `GET`
- Path: `/api/mobile/documents`
- Purpose: Return lease, invoice, receipt, notice, and access documents.
- Auth required: Yes
- Response body:

```json
{
  "documents": [
    {
      "id": "doc_001",
      "title": "Lease Agreement",
      "type": "lease",
      "issuedAt": "2026-01-01T00:00:00Z",
      "status": "Available"
    }
  ]
}
```

- Notes/assumptions: Document metadata loads separately from file URLs.

### Get Document Download / View URL

- Method: `GET`
- Path: `/api/mobile/documents/{documentId}/url`
- Purpose: Return a secure URL for viewing or downloading a document.
- Auth required: Yes
- Response body:

```json
{
  "documentId": "doc_001",
  "url": "https://example.com/documents/doc_001?signed=true",
  "expiresAt": "2026-06-03T12:00:00Z"
}
```

- Notes/assumptions: URL should expire and be tenant-scoped.

## Maintenance

### Get Maintenance Requests

- Method: `GET`
- Path: `/api/mobile/maintenance/requests`
- Purpose: Return tenant maintenance requests.
- Auth required: Yes
- Response body:

```json
{
  "requests": [
    {
      "id": "mnt_001",
      "title": "Kitchen sink repair",
      "category": "Plumbing",
      "priority": "Medium",
      "status": "In Progress",
      "createdAt": "2026-06-01T08:00:00Z"
    }
  ]
}
```

- Notes/assumptions: Only current tenant requests are returned.

### Create Maintenance Request

- Method: `POST`
- Path: `/api/mobile/maintenance/requests`
- Purpose: Submit a new maintenance request.
- Auth required: Yes
- Request body:

```json
{
  "category": "Plumbing",
  "priority": "Medium",
  "description": "Kitchen sink is leaking under the cabinet."
}
```

- Response body:

```json
{
  "id": "mnt_002",
  "status": "Submitted",
  "message": "Maintenance request submitted."
}
```

- Notes/assumptions: Assignment and SLA tracking are backend/admin concerns.

### Get Maintenance Request Detail

- Method: `GET`
- Path: `/api/mobile/maintenance/requests/{requestId}`
- Purpose: Return full maintenance request detail.
- Auth required: Yes
- Response body:

```json
{
  "id": "mnt_001",
  "category": "Plumbing",
  "priority": "Medium",
  "description": "Kitchen sink is leaking under the cabinet.",
  "status": "In Progress",
  "updates": [
    {
      "message": "Technician assigned.",
      "createdAt": "2026-06-01T10:00:00Z"
    }
  ]
}
```

- Notes/assumptions: Detail screen may be added after MVP1 if not currently implemented.

### Upload Attachment Placeholder

- Method: `POST`
- Path: `/api/mobile/maintenance/requests/{requestId}/attachments`
- Purpose: Reserve the future attachment upload contract.
- Auth required: Yes
- Request body:

```json
{
  "fileName": "sink.jpg",
  "contentType": "image/jpeg"
}
```

- Response body:

```json
{
  "uploadUrl": "https://example.com/uploads/mnt_001?signed=true",
  "attachmentId": "att_001"
}
```

- Notes/assumptions: Not required for MVP1 unless attachment upload is enabled.

## Announcements

### Get Announcements

- Method: `GET`
- Path: `/api/mobile/announcements`
- Purpose: Return official property announcements.
- Auth required: Yes
- Response body:

```json
{
  "announcements": [
    {
      "id": "ann_001",
      "title": "Water maintenance notice",
      "message": "Scheduled water maintenance will happen this weekend.",
      "publishedAt": "2026-06-02T07:00:00Z",
      "read": false
    }
  ]
}
```

- Notes/assumptions: Backend filters by property and tenant eligibility.

### Get Announcement Detail

- Method: `GET`
- Path: `/api/mobile/announcements/{announcementId}`
- Purpose: Return a full announcement message.
- Auth required: Yes
- Response body:

```json
{
  "id": "ann_001",
  "title": "Water maintenance notice",
  "message": "Scheduled water maintenance will happen this weekend.",
  "publishedAt": "2026-06-02T07:00:00Z",
  "read": false
}
```

- Notes/assumptions: May reuse list payload if messages are already complete.

### Mark Announcement as Read

- Method: `POST`
- Path: `/api/mobile/announcements/{announcementId}/read`
- Purpose: Mark an announcement read for the current tenant.
- Auth required: Yes
- Response body:

```json
{
  "success": true,
  "read": true
}
```

- Notes/assumptions: Only needed if read tracking remains in scope.

## Resident Community

### Get Approved Posts / Notices

- Method: `GET`
- Path: `/api/mobile/community/posts`
- Purpose: Return approved resident posts and official community notices.
- Auth required: Yes
- Response body:

```json
{
  "posts": [
    {
      "id": "post_001",
      "type": "notice",
      "title": "Lift service update",
      "body": "Lift B will be serviced today.",
      "status": "Approved",
      "createdAt": "2026-06-01T12:00:00Z"
    }
  ]
}
```

- Notes/assumptions: Pending or rejected posts are not shown in the public feed.

### Submit Post / Grievance

- Method: `POST`
- Path: `/api/mobile/community/posts`
- Purpose: Submit a resident post or private grievance for review.
- Auth required: Yes
- Request body:

```json
{
  "type": "grievance",
  "title": "Noise concern",
  "body": "Noise from common area after quiet hours.",
  "visibility": "private"
}
```

- Response body:

```json
{
  "id": "post_002",
  "status": "Pending Review",
  "message": "Submission received for moderation."
}
```

- Notes/assumptions: Moderation is backend/admin-side.

### Get Submitted Post Status

- Method: `GET`
- Path: `/api/mobile/community/posts/{postId}/status`
- Purpose: Return moderation status for the tenant's submitted post.
- Auth required: Yes
- Response body:

```json
{
  "id": "post_002",
  "status": "Pending Review",
  "updatedAt": "2026-06-03T08:00:00Z"
}
```

- Notes/assumptions: Only author or authorized staff can view private submissions.

## Resident Services

### Get Approved Service Providers

- Method: `GET`
- Path: `/api/mobile/services/providers`
- Purpose: Return approved service providers available to residents.
- Auth required: Yes
- Response body:

```json
{
  "providers": [
    {
      "id": "svc_001",
      "name": "Safisha Homes",
      "category": "Cleaning",
      "phone": "+254700000000",
      "whatsapp": "+254700000000",
      "status": "Approved"
    }
  ]
}
```

- Notes/assumptions: The app should handle unsupported phone or WhatsApp actions gracefully.

## Resident Exchange

### Get Approved Listings

- Method: `GET`
- Path: `/api/mobile/exchange/listings`
- Purpose: Return approved resident exchange listings.
- Auth required: Yes
- Response body:

```json
{
  "listings": [
    {
      "id": "lst_001",
      "title": "Study desk",
      "description": "Lightly used desk.",
      "price": 3500,
      "currency": "KES",
      "status": "Available",
      "createdAt": "2026-06-01T09:00:00Z"
    }
  ]
}
```

- Notes/assumptions: No payment, escrow, or dispute flow is exposed in MVP1.

### Create Listing

- Method: `POST`
- Path: `/api/mobile/exchange/listings`
- Purpose: Submit a new listing for moderation.
- Auth required: Yes
- Request body:

```json
{
  "title": "Study desk",
  "description": "Lightly used desk.",
  "price": 3500,
  "currency": "KES"
}
```

- Response body:

```json
{
  "id": "lst_002",
  "status": "Pending Review",
  "message": "Listing submitted for review."
}
```

- Notes/assumptions: Listing images are out of MVP1 unless later approved.

### Mark Listing as Closed / Sold

- Method: `POST`
- Path: `/api/mobile/exchange/listings/{listingId}/close`
- Purpose: Let a resident close their listing if applicable.
- Auth required: Yes
- Request body:

```json
{
  "status": "Closed"
}
```

- Response body:

```json
{
  "id": "lst_001",
  "status": "Closed"
}
```

- Notes/assumptions: Only the listing owner can close a listing.

## Access / Gate

### Get Access Status

- Method: `GET`
- Path: `/api/mobile/access/status`
- Purpose: Return tenant-facing access status.
- Auth required: Yes
- Response body:

```json
{
  "status": "Active",
  "message": "Access card active for Unit B-204."
}
```

- Notes/assumptions: Guard workflows and QR validation are not exposed in MVP1.

### Get Access Cards

- Method: `GET`
- Path: `/api/mobile/access/cards`
- Purpose: Return tenant access card summaries.
- Auth required: Yes
- Response body:

```json
{
  "cards": [
    {
      "id": "card_001",
      "label": "Main access card",
      "status": "Active",
      "issuedAt": "2026-01-01T00:00:00Z"
    }
  ]
}
```

- Notes/assumptions: Do not expose broken QR or guard-only workflows.

### Submit Visitor Pre-Registration Placeholder

- Method: `POST`
- Path: `/api/mobile/access/visitors`
- Purpose: Reserve future visitor pre-registration workflow.
- Auth required: Yes
- Request body:

```json
{
  "visitorName": "Jane Doe",
  "visitDate": "2026-06-10",
  "notes": "Expected afternoon visit."
}
```

- Response body:

```json
{
  "id": "visit_001",
  "status": "Pending",
  "message": "Visitor pre-registration submitted."
}
```

- Notes/assumptions: MVP1 may keep this as a clear placeholder.

## Profile / Lease

### Get Profile

- Method: `GET`
- Path: `/api/mobile/profile`
- Purpose: Return tenant profile details.
- Auth required: Yes
- Response body:

```json
{
  "id": "tenant_001",
  "fullName": "Grace Wanjiku",
  "email": "grace.wanjiku@example.com",
  "phone": "+254712345678",
  "emergencyContact": {
    "name": "Pending",
    "phone": null
  }
}
```

- Notes/assumptions: Sensitive identity fields should be scoped to mobile needs.

### Get Lease Details

- Method: `GET`
- Path: `/api/mobile/lease`
- Purpose: Return active lease summary.
- Auth required: Yes
- Response body:

```json
{
  "id": "lease_001",
  "propertyName": "Elgon Heights Apartments",
  "unitNumber": "B-204",
  "startDate": "2026-01-01",
  "endDate": "2026-12-31",
  "status": "Active"
}
```

- Notes/assumptions: Lease documents still use the Documents API.

### Update Profile Placeholder

- Method: `PATCH`
- Path: `/api/mobile/profile`
- Purpose: Reserve future tenant profile update workflow.
- Auth required: Yes
- Request body:

```json
{
  "emergencyContact": {
    "name": "John Wanjiku",
    "phone": "+254700000001"
  }
}
```

- Response body:

```json
{
  "success": true,
  "message": "Profile update submitted for review."
}
```

- Notes/assumptions: Direct edits may require management review depending on policy.
