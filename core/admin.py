from django.contrib import admin
from .models import User, Machine, Reservation

admin.site.register(User)
admin.site.register(Machine)
admin.site.register(Reservation)
