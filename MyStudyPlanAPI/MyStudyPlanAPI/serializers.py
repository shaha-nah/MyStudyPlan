from dataclasses import fields
from rest_framework import serializers
from .models import Modules, Schedules, Chapters

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modules
        fields = ('ModuleId', 'ModuleName', 'ModuleCode', 'ModuleLecturer')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('ClassId', 'ClassType', 'ClassDay', 'ClassStartTime', 'ClassEndTime', 'ClassLocation')

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapters
        fields = ('ChapterId', 'ChapterName', 'ChapterStatus', 'ModuleId')

