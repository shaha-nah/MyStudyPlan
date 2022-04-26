from django.db import models

class Modules(models.Model):
    ModuleId = models.AutoField(primary_key = True)
    ModuleName = models.CharField(max_length = 100)
    ModuleCode = models.CharField(max_length = 10)
    ModuleLecturer = models.CharField(max_length = 50)

class Schedules(models.Model):
    ClassId = models.AutoField(primary_key = True)
    ClassType = models.CharField(
        max_length = 10,
        choices = (('Lecture', 'Lecture'), ('Tutorial', 'Tutorial')),
        default = 'Lecture'
    )
    ClassDay = models.CharField(max_length = 10)
    ClassStartTime = models.CharField(max_length = 10)
    ClassEndTime = models.CharField(max_length = 10)
    ClassLocation = models.CharField(max_length = 50)
    
class Chapters(models.Model):
    ChapterId = models.AutoField(primary_key = True)
    ChapterName = models.CharField(max_length = 100)
    ChapterStatus = models.CharField(
        max_length = 20,
        choices = (('New', 'New'), ('In Progress', 'In Progress'), ('Ready', 'Ready'), ('Completed', 'Completed')),
        default = 'New'
    )
    ModuleId = models.IntegerField()