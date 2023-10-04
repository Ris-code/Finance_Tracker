from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import MyUser

def createpost(request):
    # MyUser = get_user_model()
    
    if request.method == 'POST':
        name = request.POST.get('name')
        email_id = request.POST.get('email')
        user_name = request.POST.get('username')
        current_balance = request.POST.get('cur-balance')
        password1 = request.POST.get('password')
        password2 = request.POST.get('confirm_password')
        
        # if password1 == password2:  # Check if passwords match
        # try:
        print(name)
        print(email_id)
        # Create a new user
        new_user = MyUser.objects.create(
            username=user_name,
            email=email_id,
            password=password1,
            name=name,
            Current_Balance=current_balance
        )
        new_user.set_password(new_user.password)
        new_user.save()
        print(new_user)
        return render(request, 'signup.html', {'message': 'User created successfully!'})
    # except Exception as e:
            # return render(request, 'signup.html', {'error_message': str(e)})
        # else:
        #     return render(request, 'signup.html', {'error_message': 'Passwords do not match!'})
    
    # Handle GET request or any other HTTP method
    return render(request, 'signup.html')
