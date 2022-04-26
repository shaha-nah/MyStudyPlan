from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from MyStudyPlanAPI.models import Modules, Schedules
from MyStudyPlanAPI.serializers import ModuleSerializer, ScheduleSerializer

# Module
@csrf_exempt
def moduleApi(request, id = 0):
    if request.method == 'GET':
        modules = Modules.objects.all()
        modules_serializer = ModuleSerializer(modules, many = True)
        return JsonResponse(modules_serializer.data, safe = False)
    
    elif request.method == 'POST':
        module_data = JSONParser().parse(request)
        modules_serializer = ModuleSerializer(data = module_data)
        if modules_serializer.is_valid():
            modules_serializer.save()
            return JsonResponse("Module added!", safe = False)
        return JsonResponse("An error occured!", safe = False)

    elif request.method == 'PUT':
        module_data = JSONParser().parse(request)
        module = Modules.objects.get(ModuleId = module_data['ModuleId'])
        modules_serializer = ModuleSerializer(module, data = module_data)
        if modules_serializer.is_valid():
            modules_serializer.save()
            return JsonResponse("Module updated!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'DELETE':
        module = Modules.objects.get(ModuleId = id)
        module.delete()
        return JsonResponse("Module deleted!", safe = False)

#Schedule
@csrf_exempt
def scheduleApi(request, id = 0):
    if request.method == 'GET':
        schedules = Schedules.objects.all()
        schedules_serializer = ScheduleSerializer(schedules, many = True)
        return JsonResponse(schedules_serializer.data, safe = False)

    elif request.method == 'POST':
        schedule_data = JSONParser().parse(request)
        schedules_serializer = ScheduleSerializer(data = schedule_data)
        if schedules_serializer.is_valid():
            schedules_serializer.save()
            return JsonResponse("Class added!", safe = False)
        return JsonResponse("An error occured!", safe = False)
    
    elif request.method == 'PUT':
        schedule_data = JSONParser().parse(request)
        schedule = Schedules.objects.get(ClassId = schedule_data['ClassId'])
        schedules_serializer = ScheduleSerializer(schedule, data = schedule_data)
        if schedules_serializer.is_valid():
            schedules_serializer.save()
            return JsonResponse("Class updated!", safe = False)
        return JsonResponse("An error occured!")

    elif request.method == 'DELETE':
        schedule = Schedules.objects.get(ClassId = id)
        schedule.delete()
        return JsonResponse("Class deleted!", safe = False)