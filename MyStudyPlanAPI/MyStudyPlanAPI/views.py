from functools import partial
import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from MyStudyPlanAPI.models import Modules, Chapters, Tasks, Assessments
from MyStudyPlanAPI.serializers import ModuleSerializer, ChapterSerializer, TaskSerializer, AssessmentSerializer

@csrf_exempt
def moduleApi(request, id = 0):
    if request.method == 'GET':
        if id!=0:
            modules = Modules.objects.filter(ModuleId=id)
        else:
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
def chapterApi(request, id = 0):
    if request.method == 'GET':
        if id!=0:
            chapters = Chapters.objects.filter(ModuleId=id)
        else:
            chapters = Chapters.objects.all()

        chapters_serializer = ChapterSerializer(chapters, many=True)
        return JsonResponse(chapters_serializer.data, safe=False)
    
    elif request.method == 'POST':
        chapter_data = JSONParser().parse(request)
        chapters_serializer = ChapterSerializer(data = chapter_data)
        if chapters_serializer.is_valid():
            c = chapters_serializer.save()
            return JsonResponse(c.ChapterId,safe = False)
        return JsonResponse("An error occured!",safe = False)

    elif request.method == 'PUT':
        chapter_data = JSONParser().parse(request)
        chapter = Chapters.objects.get(ChapterId = chapter_data['ChapterId'])
        chapters_serializer = ChapterSerializer(chapter, data = chapter_data, partial=True)
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
        if id!=0:
            tasks = Tasks.objects.filter(ChapterId=id)
        else: 
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
        tasks_serializer = TaskSerializer(task, data = task_data, partial=True)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
            return JsonResponse("Task updated!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'DELETE':
        task = Tasks.objects.get(TaskId = id)
        task.delete()
        return JsonResponse("Task deleted!", safe = False)

@csrf_exempt
def assessmentApi(request, id = 0):
    if request.method == 'GET':
        assessments = Assessments.objects.all()
        assessments_serializer = AssessmentSerializer(assessments, many=True)
        return JsonResponse(assessments_serializer.data, safe=False)
    
    elif request.method == 'POST':
        assessment_data = JSONParser().parse(request)
        assessments_serializer = AssessmentSerializer(data = assessment_data)
        if assessments_serializer.is_valid():
            assessments_serializer.save()
            return JsonResponse("Assessment Added!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'PUT':
        assessment_data = JSONParser().parse(request)
        assessment = Assessments.objects.get(AssessmentId = assessment_data['AssessmentId'])
        assessments_serializer = AssessmentSerializer(assessment, data = assessment_data, partial=True)
        if assessments_serializer.is_valid():
            assessments_serializer.save()
            return JsonResponse("Assessment updated!", safe = False)
        return JsonResponse("An error occured!")
    
    elif request.method == 'DELETE':
        assessment = Assessments.objects.get(AssessmentId = id)
        assessment.delete()
        return JsonResponse("Assessment deleted!", safe = False)