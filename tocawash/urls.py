from django.contrib import admin
from django.urls import path, include
from core.views import tela_login, tela_reservas

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/auth/', include('djoser.urls')),  # se estiver usando Djoser
    path('api/auth/', include('djoser.urls.authtoken')),  # para login via token
    path('login/', tela_login ),
    path('reservas/', tela_reservas),  

]
