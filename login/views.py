from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def request_login(request):
    modal_show=False
    modal_answer=""
    modal_header=""
    if request.user.is_authenticated and request.user.is_active:
        return redirect('/register-customer')
    else:
        if request.method == 'POST':
            username = request.POST.get('username')
            password = request.POST.get('password')
            print(username,password)
            user = authenticate(request, username=username, password=password)
            print(user)
            modal_show=False
            if user is not None:
                if user.is_active:
                    login(request, user)

                    return redirect('/dashboard')
                else:
                    modal_show=True
                    modal_header="Acceso Denegado"
                    modal_answer="No tiene acceso al sistema, contacte al administrador."
            elif user is None and 'username' in request.POST and 'password' in request.POST:
                modal_answer="Usuario o contraseña incorrecta."
                modal_header="Credenciales invalidas"
                modal_show=True
                print("si")
    return render(request, 'login.html', {'modal_show':modal_show,'modal_answer':modal_answer,'modal_header':modal_header})




def request_register_customer(request):

    return render(request,'register_customer.html')

@login_required(login_url='/login/')
def request_logout(request):
    logout(request)

    return redirect('/login')