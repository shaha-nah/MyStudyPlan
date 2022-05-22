from dataclasses import fields
from rest_framework import serializers
from .models import Modules, Chapters, Tasks, Assessments

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modules
        fields = ('ModuleId', 'ModuleName', 'ModuleCode', 'ModuleStatus', 'ModuleGrade', 'ModuleColor', 'ModuleType')

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = ('ChapterId', 'ChapterName', 'ChapterStatus', 'ModuleId')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('TaskId', 'TaskName', 'TaskStatus', 'TaskType', 'ChapterId', 'TaskDueDate')

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessments
        fields = ('AssessmentId', 'AssessmentName', 'ModuleColor', 'AssessmentDate', 'AssessmentType', 'AssessmentDetails', 'AssessmentGrade', 'AssessmentStatus')