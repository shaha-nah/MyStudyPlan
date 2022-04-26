from dataclasses import fields
from rest_framework import serializers
from .models import Modules, Schedules

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modules
        fields = ('ModuleId', 'ModuleName', 'ModuleCode', 'ModuleLecturer')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('ClassId', 'ClassType', 'ClassDay', 'ClassStartTime', 'ClassEndTime', 'ClassLocation')
