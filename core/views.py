from django.shortcuts import render, redirect
from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from .models import Machine, Reservation
from .serializers import MachineSerializer, ReservationSerializer
from datetime import date
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Machine, Reservation, TIME_BLOCKS
from datetime import datetime


def tela_login(request):
    return render(request, 'core/login.html')


def tela_reservas(request):
    return render(request, 'core/reservas.html')


class MachineViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user).order_by('-date')


    def perform_create(self, serializer):
        user = self.request.user
        date_selected = self.request.data.get('date')
        time_block = self.request.data.get('time_block')

        if Reservation.objects.filter(user=user, date=date_selected).exists():
            raise ValidationError("Você já tem uma reserva nesse dia.")

        serializer.save(user=user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])

def available_slots(request):
    date_str = request.query_params.get('date')
    if not date_str:
        return Response({"error": "Parâmetro 'date' é obrigatório"}, status=400)

    try:
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        return Response({"error": "Data inválida. Use o formato YYYY-MM-DD."}, status=400)

    reservations = Reservation.objects.filter(date=date_obj)
    machines = Machine.objects.all()
    response_data = {}

    for block_code, block_label in TIME_BLOCKS:
        block_reservations = reservations.filter(time_block=block_code)
        reserved_machine_ids = block_reservations.values_list('machine_id', flat=True)
        available_machines = machines.exclude(id__in=reserved_machine_ids)
        hora1, hora2 = block_code.split('-')
        label_frontend = f"{hora1}h–{hora2}h"  

        response_data[label_frontend] = MachineSerializer(available_machines, many=True).data

    return Response({
        "date": date_str,
        "slots": response_data
    })
