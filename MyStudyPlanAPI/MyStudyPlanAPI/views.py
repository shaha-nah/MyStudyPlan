import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from MyStudyPlanAPI.models import Modules, Schedules, Chapters, Tasks
from MyStudyPlanAPI.serializers import ModuleSerializer, ScheduleSerializer, ChapterSerializer, TaskSerializer

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

@csrf_exempt
def chapterApi(request, id = 0):
    if request.method == 'GET':
        chapters = Chapters.objects.all()
        chapters_serializer = ChapterSerializer(chapters, many=True)
        return JsonResponse(chapters_serializer.data, safe=False)
    
    elif request.method == 'POST':
        chapter_data = JSONParser().parse(request)
        chapters_serializer = ChapterSerializer(data = chapter_data)
        if chapters_serializer.is_valid():
            chapters_serializer.save()
            return JsonResponse("Chapter added!",safe = False)
        return JsonResponse("An error occured!",safe = False)

    elif request.method == 'PUT':
        chapter_data = JSONParser().parse(request)
        chapter = Chapters.objects.get(ChapterId = chapter_data['ChapterId'])
        chapters_serializer = ChapterSerializer(chapter, data = chapter_data)
        if chapters_serializer.is_valid():
            chapters_serializer.save()
            return JsonResponse("Chapter updated!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'DELETE':
        chapter = Chapters.objects.get(ChapterId = id)
        chapter.delete()
        return JsonResponse("Chapter deleted!", safe = False)

@csrf_exempt
def taskApi(request, id = 0):
    if request.method == 'GET':
        tasks = Tasks.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)
        return JsonResponse(tasks_serializer.data, safe=False)
    
    elif request.method == 'POST':
        task_data = JSONParser().parse(request)
        tasks_serializer = TaskSerializer(data = task_data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            return JsonResponse("Task Added!", safe = False)
        return JsonResponse("An error occured!", safe = False)
    
    elif request.method == 'PUT':
        task_data = JSONParser().parse(request)
        task = Tasks.objects.get(TaskId = task_data['TaskId'])
        tasks_serializer = TaskSerializer(task, data = task_data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            return JsonResponse("Task updated!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'DELETE':
        task = Tasks.objects.get(TaskId = id)
        task.delete()
        return JsonResponse("Task deleted!", safe = False)