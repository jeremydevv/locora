# Security Review

## Summary
- Identified an authorization bypass in the user APIs caused by the authentication helper always returning `true` even when token verification fails.
- Noted a permissive origin check that allows any request with an `Authorization` header to bypass CORS origin validation, increasing CSRF exposure risk when bearer tokens are stored in cookies or injected by browsers.

## Findings

### Authorization bypass in user endpoints
- The `checkForValidAuthorization` helper returns `true` even when `VerifyIdToken` reports an invalid token because the failure branch omits a `return` statement. As a result, all routes under `/v1/users/*` accept unauthenticated requests provided they include a `Bearer` prefix, granting access to favorites, ratings, and information APIs without valid credentials.【F:apps/api/src/routes/utils/CheckForAuth.ts†L4-L18】【F:apps/api/src/routes/v1/user.ts†L17-L43】

**Impact:** Attackers can perform authenticated user actions (e.g., modifying favorites or retrieving user data) without possessing a valid Firebase ID token.

**Recommendation:** Ensure `checkForValidAuthorization` returns `false` when token verification fails, and add tests covering invalid and missing tokens to prevent regressions.

### Origin validation bypass when authorization header is present
- The API rejects requests from untrusted origins only when the `Authorization` header is absent. Any request that includes `Authorization` skips the origin check, even if it originates from an untrusted site.【F:apps/api/src/index.ts†L39-L49】

**Impact:** If bearer tokens are ever stored in cookies or automatically attached by clients, this logic allows cross-site requests from arbitrary origins, enabling CSRF-style abuse of authenticated APIs.

**Recommendation:** Apply origin validation regardless of the `Authorization` header, or ensure tokens are never automatically attached (e.g., enforce `Authorization` via JavaScript and use `SameSite=strict` cookies if cookies are involved).

## Next steps
- Patch the authorization helper and add tests for authenticated routes.
- Review client token storage to confirm whether the origin bypass is exploitable; if so, enforce strict origin checks.
