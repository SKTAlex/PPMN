from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework import viewsets
from .serializers import TicketSerializer, TicketPurchaseSerializer
from .models import Ticket,TicketPurchase
from django.shortcuts import get_object_or_404
import datetime
import json
from users.models import User

# Create your views here.
class TicketDetailByUser(viewsets.ViewSet):
    def list(self,request):
        pass

    def retrieve(self, request, pk):
        # /ticket/:id
        tickets = Ticket.objects.filter(created_by=pk)
        serializer = TicketSerializer(tickets,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class TicketDetail(viewsets.ViewSet):

    def list(self,request):
        tickets = Ticket.objects.filter()
        serializer = TicketSerializer(tickets,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """create ticket"""

        serializer = TicketSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message':'ok'}, status=status.HTTP_201_CREATED)
             
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk):
        # /ticket/:id
        tickets = Ticket.objects.get(id=pk)
        serializer = TicketSerializer(tickets)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        ticket = get_object_or_404(Ticket, pk=pk)
        serializer = TicketSerializer(ticket, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Ticket updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PurchasedTickets(viewsets.ViewSet):
 
    def list(self,request):
        purchases = TicketPurchase.objects.filter(user=request.user, ticket__is_purchased=True)
        tickets_with_quantity = [(purchase.ticket, purchase.quantity) for purchase in purchases]
        return Response(tickets_with_quantity, status=status.HTTP_200_OK)

class BuyTicket(viewsets.ViewSet):

    def update(self, request, pk=None):
        # Retrieve the ticket using get_object_or_404 for proper error handling
        ticket = get_object_or_404(Ticket, id=pk)

        # Parse the JSON data from the request body
        data = json.loads(request.body)

        # Retrieve the user assigned to the ticket
        user = get_object_or_404(User, id=data['assigned_to'])

        # Check if the requested quantity is available
        if int(data['quantity']) > ticket.quantity_available:
            return Response({
                'error': f'Only {ticket.quantity_available} tickets available'
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Update the ticket's available quantity
            ticket.quantity_available -= int(data['quantity'])
            ticket.is_purchased = True
            ticket.save()

            # Create a new TicketPurchase object and save it
            purchase = TicketPurchase(user=user, ticket=ticket, quantity=int(data['quantity']))
            purchase.save()

            return Response({
                'ticket': TicketSerializer(ticket).data,
                'quantity': data['quantity'],
                'message': 'Purchase successful'
            }, status=status.HTTP_200_OK)

    
class AllAvailableTickets(viewsets.ViewSet):

    def list(self,request):
        accepted_tickets = Ticket.objects.filter(ticket_status='accepted')
        serializer = TicketSerializer(accepted_tickets,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AcceptTicket(viewsets.ViewSet):
    def list(self,request):
        pass

    def update(self,request,pk):
        data=json.loads(request.body)
        print(data['assigned_to'])
        ticket = Ticket.objects.get(ticket_number=pk)
        ticket.ticket_status = 'accepted'
        ticket.assigned_to = User.objects.get(id=data['assigned_to'])
        ticket.accepted_date = datetime.datetime.now()
        ticket.save()
        return Response({'message': 'ok'}, status=status.HTTP_200_OK)

class TicketQueue(viewsets.ViewSet):
    def list(self,request):
        tickets = Ticket.objects.filter(ticket_status='pending')
        serializer = TicketSerializer(tickets,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
