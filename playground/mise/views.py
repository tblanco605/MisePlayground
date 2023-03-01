from django.shortcuts import render
import csv
import json
from django.http import HttpResponse

#This is where the URLs are saved
def index(request):
    return render(request, 'index.html', {})

def game(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        selected_colors = data['selectedColors']

        with open('Trials.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(selected_colors)

        return HttpResponse(status=200)
    else:
        return render(request, 'game.html')

def gamelvl2(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        selected_colors = data['selectedColors']

        with open('Trials.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(selected_colors)

        return HttpResponse(status=200)
    else:
        return render(request, 'gamelvl2.html')