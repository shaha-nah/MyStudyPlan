from dataclasses import fields
from rest_framework import serializers
from .models import Modules, Chapters, Tasks

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modules
        fields = ('ModuleId', 'ModuleName', 'ModuleCode', 'ModuleLecturer', 'ModuleStatus', 'ModuleGrade', 'ModuleColor', 'ModuleType')

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = ('ChapterId', 'ChapterName', 'ChapterStatus', 'ModuleId')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('TaskId', 'TaskName', 'TaskStatus', 'TaskType', 'ChapterId', 'TaskDueDate')