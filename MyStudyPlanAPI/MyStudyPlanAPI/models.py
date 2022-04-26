from django.db import models

class Modules(models.Model):
    ModuleId = models.AutoField(primary_key = True)
    ModuleName = models.CharField(max_length = 100)
    ModuleCode = models.CharField(max_length = 10, default='test')
    ModuleLecturer = models.CharField(max_length = 50, default='test')
