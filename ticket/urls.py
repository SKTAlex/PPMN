from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.all_tickets),
    path('createTicket', views.create_tickets),
    path('updateTicket', views.update_tickets),
    path('allAvailableTickets', views.all_available),
    path('queue', views.queue),
]