from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile

# Customizing User admin display and add/edit forms
class UserAdmin(BaseUserAdmin):
    # Fields to display in admin list view
    list_display = ('email', 'name', 'is_staff', 'is_active', 'role')
    list_filter = ('is_staff', 'is_active', 'role')

    # Fields for the add/edit form
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'phone', 'location', 'role', 'education_level')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_registered')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )

    search_fields = ('email', 'name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    # breakpoint()
    list_display = ('user', 'rating', 'sessions_completed', 'years_experience')
    search_fields = ('user__email', 'user__name')


# Register User model with custom UserAdmin
admin.site.register(User, UserAdmin)
