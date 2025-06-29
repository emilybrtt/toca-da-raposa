from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

# Customização do usuário
class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.full_name

# Máquinas de lavar
class Machine(models.Model):
    number = models.PositiveIntegerField(unique=True)
    has_dryer = models.BooleanField(default=False)

    def __str__(self):
        return f"Máquina {self.number}"

# Blocos de horário fixos
TIME_BLOCKS = [
    ("06-10", "06h–10h"),
    ("10-14", "10h–14h"),
    ("14-18", "14h–18h"),
    ("18-22", "18h–22h"),
]

# Reservas de horários
class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reservations")
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name="reservations")
    date = models.DateField()
    time_block = models.CharField(max_length=6, choices=TIME_BLOCKS)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'date')  # Só 1 reserva por dia por usuário
        ordering = ['date', 'time_block']

    def __str__(self):
        return f"{self.user.full_name} - Máquina {self.machine.number} - {self.date} ({self.time_block})"
