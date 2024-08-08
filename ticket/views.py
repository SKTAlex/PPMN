from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='/login')
def all_tickets(request):
    print(request)
    return render(request, 'all_tickets.html')


@login_required(login_url='/login')
def create_tickets(request):
    print(request)
    return render(request, 'create_ticket.html')

@login_required(login_url='/login')
def update_tickets(request):
    print(request)
    return render(request, 'update_ticket.html')

@login_required(login_url='/login')
def all_available(request):
    print(request)
    return render(request, 'all_available_tickets.html')

@login_required(login_url='/login')
def queue(request):
    print(request)
    return render(request, 'ticket_queue.html')