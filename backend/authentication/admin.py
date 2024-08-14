from django.contrib import admin

from authentication.models import Profile, User


class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "email"]


class ProfileAdmin(admin.ModelAdmin):
    list_editable = []
    list_display = ["user", "full_name"]


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
