from rest_framework.routers import DefaultRouter
from .views import MachineViewSet, ReservationViewSet
from django.urls import path
from .views import tela_login, available_slots, tela_reservas




router = DefaultRouter()
router.register(r'machines', MachineViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = router.urls + [
    path('available-slots/', available_slots, name='available_slots'),
]

urlpatterns += [
    path('login/', tela_login, name='login'),
    path('reservas/', tela_reservas, name='reservas'),
]