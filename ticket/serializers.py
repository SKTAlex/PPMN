from rest_framework import serializers
from .models import Ticket,TicketPurchase

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class TicketPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketPurchase
        fields = '__all__'

class TicketBuySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketPurchase
        fields = ('')