#  API Configuration Summary

##  **All API Endpoints Now Start with `/api/`**

###  **Base Configuration**

**File:** `she-nation/lib/api/baseApi.ts`
```typescript
const baseQuery = fetchBaseQuery({
  baseUrl: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8082") + "/api",
  // ... rest of config
});
```

**Environment:** `she-nation/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8082
```

**Final API Base URL:** `http://localhost:8082/api`

###  **RTK Query APIs (Using Base URL)**

All these APIs use relative paths that are automatically combined with the base URL:

#### 1. **Auth API** (`authApi.ts`)
-  `/auth/register/` → `http://localhost:8082/api/auth/register/`
-  `/auth/login/` → `http://localhost:8082/api/auth/login/`
-  `/auth/users/` → `http://localhost:8082/api/auth/users/`
-  `/auth/verify-user/` → `http://localhost:8082/api/auth/verify-user/`
-  `/auth/user/{id}/` → `http://localhost:8082/api/auth/user/{id}/`
-  `/auth/profile/` → `http://localhost:8082/api/auth/profile/`

#### 2. **Booking API** (`bookingApi.ts`)
-  `/auth/mentors/book/` → `http://localhost:8082/api/auth/mentors/book/`
-  `/auth/mentor/bookings/` → `http://localhost:8082/api/auth/mentor/bookings/`
-  `/auth/mentee/bookings/` → `http://localhost:8082/api/auth/mentee/bookings/`
-  `/auth/bookings/{id}/` → `http://localhost:8082/api/auth/bookings/{id}/`
-  `/auth/bookings/bulk-actions/` → `http://localhost:8082/api/auth/bookings/bulk-actions/`

#### 3. **Mentors API** (`mentorsApi.ts`)
-  `/mentors/` → `http://localhost:8082/api/mentors/`

#### 4. **Courses API** (`coursesApi.ts`)
-  `/courses/` → `http://localhost:8082/api/courses/`

#### 5. **Opportunities API** (`opportunitiesApi.ts`)
-  `/opportunities/` → `http://localhost:8082/api/opportunities/`

### 🔧 **Direct Fetch Calls (Manual URLs)**

These components make direct fetch calls and include the full URL:

#### 1. **Notification Service** (`notificationService.ts`)
```typescript
const response = await fetch(`${baseUrl}/api/auth/mentor/bookings/`, {
  headers: { Authorization: `Bearer ${token}` }
});
```
-  Final URL: `http://localhost:8082/api/auth/mentor/bookings/`

#### 2. **Booking Analytics Dashboard** (`booking-analytics-dashboard.tsx`)
```typescript
const response = await fetch(`${baseUrl}/api/auth/bookings/analytics/`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
});
```
-  Final URL: `http://localhost:8082/api/auth/bookings/analytics/`

#### 3. **Booking Decision Buttons** (`booking-decision-buttons.tsx`)
```typescript
const response = await fetch(`${baseUrl}/api/auth/bookings/${booking.id}/decide/`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  },
  body: JSON.stringify({ action })
});
```
-  Final URL: `http://localhost:8082/api/auth/bookings/{id}/decide/`

#### 4. **Bulk Booking Actions** (`bulk-booking-actions.tsx`)
```typescript
const response = await fetch(`${baseUrl}/api/auth/bookings/bulk-actions/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
  body: JSON.stringify({ action, booking_ids: bookingIds })
});
```
-  Final URL: `http://localhost:8082/api/auth/bookings/bulk-actions/`

##  **Django Server Configuration**

To run Django on port 8082:

```bash
cd shenations
python manage.py runserver 8082
```

Or with specific host:
```bash
python manage.py runserver 0.0.0.0:8082
```

##  **Verification Checklist**

###  **All API calls now use:**
- Base URL: `http://localhost:8082`
- API prefix: `/api`
- Full URLs: `http://localhost:8082/api/...`

###  **Environment Variables:**
- `NEXT_PUBLIC_API_URL=http://localhost:8082` (without `/api` suffix)
- Base API automatically adds `/api` prefix

###  **No Redundant Prefixes:**
- No double `/api/api/` in URLs
- All relative paths correctly combined with base URL

##  **Testing URLs**

You can test these endpoints directly:

```bash
# Test mentor bookings
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8082/api/auth/mentor/bookings/

# Test booking creation
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"mentor": 1, "day": "2024-12-25", "time": "14:00", "title": "Test"}' \
  http://localhost:8082/api/auth/mentors/book/

# Test booking decision
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"action": "approve"}' \
  http://localhost:8082/api/auth/bookings/123/decide/
```

## **Summary**

 **All API endpoints now correctly start with `/api/`**
 **Backend should run on port 8082**
 **Frontend configured to connect to port 8082**
 **No redundant API prefixes**
 **Consistent URL structure across all components**

The Shenation is now properly configured for port 8082 with all API endpoints correctly prefixed! 
