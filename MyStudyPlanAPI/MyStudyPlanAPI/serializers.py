from dataclasses import fields
from rest_framework import serializers
from .models import Modules

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modules
        fields = ('ModuleId', 'ModuleName', 'ModuleCode', 'ModuleLecturer')
