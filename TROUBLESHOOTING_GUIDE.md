#  Booking System Troubleshooting Guide

##  Issues Fixed

### 1. **500 Internal Server Error** - `/api/auth/mentor/bookings/`

**Problem:** The server was returning a 500 error when fetching mentor bookings.

**Root Cause:** 
- Missing database fields (`status`, `updated_at`) in the Booking model
- Serializer trying to access fields that don't exist in the database

**Fixes Applied:**
 **Created proper migration file:** `0003_add_booking_status_fields.py`
 **Updated BookingSerializer** to include all new fields
 **Added missing fields:** `status`, `created_at`, `updated_at`, `mentor_id`, `mentee_id`

### 2. **API URL Configuration Issues**

**Problem:** Frontend was trying to connect to wrong API endpoints.

**Root Cause:** 
- Hardcoded API URLs pointing to port 8082
- Missing `/api` prefix in some API calls
- Inconsistent base URL configuration

**Fixes Applied:**
 **Updated baseApi.ts** to use environment variables
 **Created .env.local** with correct API URL
 **Fixed all API calls** to include `/api` prefix
 **Standardized API URL usage** across all components

### 3. **Missing Toast Notifications**

**Problem:** Success/error toasts not appearing after booking actions.

**Root Cause:** 
- API calls failing due to incorrect URLs
- Missing error handling in some components

**Fixes Applied:**
 **Fixed API endpoints** in all booking components
 **Ensured proper error handling** with toast notifications
 **Updated booking submission** to show correct success messages

##  Required Setup Steps

### 1. **Database Migration**
```bash
cd shenations
python manage.py migrate
```

### 2. **Test the System**
```bash
cd shenations
python manage.py test_booking_system
```

### 3. **Start Django Server**
```bash
cd shenations
python manage.py runserver 8000
```

### 4. **Start Next.js Frontend**
```bash
cd she-nation
npm run dev
```

### 5. **Environment Configuration**
Make sure `.env.local` exists in `she-nation/` with:
```
NEXT_PUBLIC_API_URL=http://localhost:8082
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

##  Debugging Steps

### 1. **Check Database Fields**
```bash
cd shenations
python manage.py shell
```
```python
from accounts.models import Booking
print([field.name for field in Booking._meta.fields])
# Should include: status, created_at, updated_at
```

### 2. **Test API Endpoints**
```bash
# Test mentor bookings endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8082/api/auth/mentor/bookings/

# Test booking creation
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"mentor": 1, "day": "2024-12-25", "time": "14:00", "title": "Test Session"}' \
  http://localhost:8082/api/auth/mentors/book/
```

### 3. **Check Frontend API Calls**
Open browser DevTools → Network tab and verify:
-  API calls go to `http://localhost:8082/api/...`
-  Authorization headers are included
-  Response status is 200, not 500

### 4. **Verify User Roles**
```bash
cd shenations
python manage.py shell
```
```python
from django.contrib.auth import get_user_model
User = get_user_model()

# Check mentors
mentors = User.objects.filter(role__in=['mentor', 'Mentor'])
print(f"Mentors: {mentors.count()}")

# Check mentees  
mentees = User.objects.filter(role='mentee')
print(f"Mentees: {mentees.count()}")
```

##  Files Modified

### Backend Files:
-  `shenations/accounts/models.py` - Added status fields and methods
-  `shenations/accounts/serializers.py` - Updated BookingSerializer
-  `shenations/accounts/views.py` - Added new booking management views
-  `shenations/accounts/urls.py` - Added new URL patterns
-  `shenations/accounts/migrations/0003_add_booking_status_fields.py` - New migration
-  `shenations/accounts/services.py` - Email notification service
-  `shenations/accounts/management/commands/test_booking_system.py` - Test command

### Frontend Files:
-  `she-nation/lib/api/baseApi.ts` - Fixed base URL configuration
-  `she-nation/lib/api/bookingApi.ts` - Added missing endpoints
-  `she-nation/lib/types/api.ts` - Added new type definitions
-  `she-nation/components/mentorship/booking-decision-buttons.tsx` - Fixed API calls
-  `she-nation/components/mentorship/bulk-booking-actions.tsx` - Fixed API calls
-  `she-nation/components/mentorship/booking-analytics-dashboard.tsx` - Fixed API calls
-  `she-nation/lib/services/notificationService.ts` - Fixed API calls
-  `she-nation/.env.local` - Environment configuration

##  Expected Behavior After Fixes

###  **Booking Creation:**
1. Mentee fills out booking form
2. Success toast: "Booking request sent successfully! Waiting for mentor approval."
3. Booking created with `status: 'pending'`
4. Email sent to mentor about new request

###  **Mentor Dashboard:**
1. Mentor sees list of booking requests
2. Can approve/deny individual bookings
3. Can use bulk actions for multiple bookings
4. Real-time notifications for new requests

###  **Status Updates:**
1. Approval/denial triggers email to mentee
2. Status updates reflected in UI immediately
3. Toast notifications confirm actions

###  **Analytics:**
1. Mentor can view booking statistics
2. Charts display approval rates and trends
3. Performance metrics help improve service

##  Next Steps

1. **Run the migration:** `python manage.py migrate`
2. **Test with the command:** `python manage.py test_booking_system`
3. **Create test users** with mentor and mentee roles
4. **Test the complete workflow** from booking creation to approval
5. **Monitor the browser console** for any remaining errors

##  Support

If issues persist:
1. Check Django server logs for detailed error messages
2. Verify database connection and user permissions
3. Ensure all required packages are installed
4. Test API endpoints directly with curl or Postman

The booking system should now work correctly with proper error handling and user feedback! 
