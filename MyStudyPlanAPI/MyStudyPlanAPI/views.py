from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from MyStudyPlanAPI.models import Modules
from MyStudyPlanAPI.serializers import ModuleSerializer

#############################################################################
# CRUD Module
#############################################################################
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
