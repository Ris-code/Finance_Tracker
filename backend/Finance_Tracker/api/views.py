from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import MyUser
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from decimal import Decimal


def home_page(request):
    if request.user.is_authenticated:
        try:
            user_profile = MyUser.objects.get(username=request.user)
            return render(request, 'index.html', {'user_profile': user_profile})
        except MyUser.DoesNotExist:
            # Handle cases where the MyUser instance does not exist for the user
            pass
    else:
        # Handle cases where the user is not authenticated
        return render(request, 'index.html')
    # user_profile = MyUser.objects.get(username=request.user)
    # return render(request, 'index.html', {'user_profile': user_profile})

def front_page(request):
    return render(request, 'home.html')

def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('login-username')
        password = request.POST.get('login-password')

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect(home_page)
        else:
            messages.info(request, 'Invalid Username or Password')
            return redirect(login_user)

    return render(request, 'login.html')

def createpost(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email_id = request.POST.get('email')
        user_name = request.POST.get('username')
        current_balance = request.POST.get('cur-balance')
        password1 = request.POST.get('password')
        password2 = request.POST.get('confirm-password')
        # income = 0
        # deduction = 0

        if password1 != password2:
            messages.info(request, 'Both passwords are not matching')
            return redirect(createpost)
        # Create a new user
        # if password1==password2:
        if MyUser.objects.filter(username=user_name).exists():
            messages.info(request, 'Username is already taken')
            return redirect(createpost)
        elif MyUser.objects.filter(email=email_id).exists():
            messages.info(request, 'Email is already taken')
            return redirect(createpost)
        else:
            new_user = MyUser.objects.create(
                username=user_name,
                email=email_id,
                password=password1,
                name=name,
                Current_Balance=current_balance,
                # Total_Income=income,
                # Total_Deduction=deduction
            )
            new_user.set_password(new_user.password)
            new_user.save()
            # return render(request, 'signup.html', {'message': 'User created successfully!'})
            return redirect(login_user)
        # else:
    else:
    # Handle GET request or any other HTTP method
     return render(request, 'signup.html')

@csrf_exempt
def update_balance(request):
    if request.method == 'POST':
        amount = request.POST.get('amount')
        cur_balance = request.POST.get('cur_balance')
        type = request.POST.get('type')
        print(amount)
        print(type)
        # Retrieve the user (you may need to adjust this part to get the current user)
        user = MyUser.objects.get(username=request.user)
        
        # Update financial summary based on transaction type
        if type == 'Income':
            user.Total_Income = Decimal(amount)
            user.Current_Balance = Decimal(cur_balance)
        elif type == 'Deduction':
            user.Total_Deduction = Decimal(amount)
            user.Current_Balance = Decimal(cur_balance)
        
        # Save the updated financial summary
        user.save()
        
        return JsonResponse({'message': 'Financial summary updated successfully.'})
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)



