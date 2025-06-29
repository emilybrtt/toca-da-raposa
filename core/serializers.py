from rest_framework import serializers
from .models import User, Machine, Reservation, TIME_BLOCKS

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name']

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['id', 'number', 'has_dryer']

class ReservationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    machine = MachineSerializer(read_only=True)
    machine_id = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(),
        source='machine',
        write_only=True
    )

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'machine', 'machine_id', 'date', 'time_block', 'created_at']
