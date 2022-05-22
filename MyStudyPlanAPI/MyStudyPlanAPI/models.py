from django.db import models
from datetime import datetime

class Modules(models.Model):
    ModuleId = models.AutoField(primary_key = True)
    ModuleName = models.CharField(max_length = 100)
    ModuleCode = models.CharField(max_length = 10)
    ModuleStatus = models.CharField(
        max_length = 20,
        choices = (('Active', 'Active'), ('Completed', 'Completed')),
        default = 'Active'
    )
    ModuleType = models.CharField(
        max_length = 10,
        choices = (('Core', 'Core'), ('Workshop', 'Workshop')),
        default = 'Core'
    )
    ModuleGrade = models.CharField(max_length=5, null=True)
    ModuleColor = models.CharField(max_length = 50)
    
class Chapters(models.Model):
    ChapterId = models.AutoField(primary_key = True)
    ChapterName = models.CharField(max_length = 100)
    ChapterStatus = models.CharField(
        max_length = 20,
        choices = (('New', 'New'), ('In Progress', 'In Progress'), ('Ready', 'Ready'), ('Completed', 'Completed')),
        default = 'New'
    )
    ModuleId = models.IntegerField()

class Tasks(models.Model):
    TaskId = models.AutoField(primary_key = True)
    TaskName = models.CharField(max_length=100)
    TaskStatus = models.CharField(
        max_length = 20,
        choices = (('New', 'New'), ('In Progress', 'In Progress'), ('Completed', 'Completed')),
        default = 'New'
    )
    TaskType = models.CharField(
        max_length = 10,
        choices = (('Class', 'Class'), ('Tutorial', 'Tutorial')),
        default = 'Class'
    )
    TaskDueDate = models.DateField(default=str(datetime.today().date()))
    ChapterId = models.IntegerField()

class Assessments(models.Model):
    AssessmentId = models.AutoField(primary_key = True)
    AssessmentName = models.CharField(max_length=100)
    ModuleColor = models.CharField(max_length = 50)
    AssessmentDate = models.DateField(default=str(datetime.today().date()))
    AssessmentType = models.CharField(
        max_length = 15,
        choices = (('Assignment', 'Assignment'), ('Test', 'Test')),
        default = 'Assignment'
    )
    AssessmentDetails = models.CharField(max_length=1000)
    AssessmentGrade = models.CharField(max_length=2)
    AssessmentStatus = models.CharField(
        max_length = 10,
        choices = (('Due', 'Due'), ('Done', 'Done')),
        default = 'Due'
    )