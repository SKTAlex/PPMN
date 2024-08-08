import json
from .models import User

def add_variable_to_context(request):

    print("j",request.user.username)
    customer = False
    employee = False

    if(request.user.username !=''):
        user = User.objects.get(email= request.user.email)
        customer = user.is_customer
        employe = user.is_employee

    return {
        'is_customer':customer,
        'is_employee':employee
    }
