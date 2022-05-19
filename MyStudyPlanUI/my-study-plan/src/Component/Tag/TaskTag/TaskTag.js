import React from 'react';
import '../Tag.css';
import {variables} from '../../../Variables';

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

function editTaskStatus(taskId, taskName, taskStatus, chapterId){
    taskStatus = toTitleCase(taskStatus);
    
    fetch(variables.API_URL+'task',{
        method:'PUT',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          TaskId:taskId,
          TaskStatus: taskStatus
        })
      })
      .then(res=>res.json())
      .then((result)=>{
        alert(result);
        this.refreshList();
      }, (error)=>{
        alert(error);
      })
    editChapter(taskName, taskStatus, chapterId);
}

function editChapter(taskName, taskStatus, chapterId){
    let chapterStatus;

    if (taskStatus !== "New"){
        if (taskName === "Revision" && taskStatus === "Completed"){
            chapterStatus = "Completed";
        }
        else if (taskName === "Summary" && taskStatus === "Completed"){
            chapterStatus = "Ready";
        }
        else{
            chapterStatus = "In Progress"
        }

        fetch(variables.API_URL+'chapter',{
            method:'PUT',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              ChapterId:chapterId,
              ChapterStatus: chapterStatus
            })
          })
          .then(res=>res.json())
          .then((result)=>{
            alert(result);
            this.refreshList();
          }, (error)=>{
            alert(error);
          })
    }
}

function TaskTag(props){
    let color = props.TextColor;
    var taskId = props.TaskId;
    var taskName = props.TaskName
    var taskStatus = props.TaskStatus;
    var chapterId = props.ChapterId;

    return (
        <div className='tag' style={{color: color}} contentEditable="true" 
            onBlur={e => editTaskStatus(taskId, taskName, e.currentTarget.textContent, chapterId)}
        >
            {taskStatus}
        </div>
    )
}

export default TaskTag;