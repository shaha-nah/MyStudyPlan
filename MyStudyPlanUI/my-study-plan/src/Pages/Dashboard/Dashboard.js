import React, {Component} from "react";
import {variables} from '../../Variables.js';
import './Dashboard.css';
import Tag from '../../Component/Tag/Tag';
import TaskTag from "../../Component/Tag/TaskTag/TaskTag.js";

export default class Dashboard extends Component{

  constructor(props){
    super(props);
    this.state = {
        modules:[],
        chapters:[],
        tasks:[]
    }
  }

  refreshModules(){
      fetch(variables.API_URL+'module')
      .then(response=>response.json())
      .then(data=>{
          this.setState({modules:data});
      });
  }

  componentDidMount(){
      this.refreshModules();
    //   this.refreshChapters();
  }

  openChapters(ModuleId){
    this.setState({tasks:[]});
    fetch(variables.API_URL+'chapter/'+ModuleId)
    .then(response=>response.json())
    .then(data=>{
        this.setState({chapters:data});
    });
  }

  openTasks(ChapterId){
    fetch(variables.API_URL+'task/'+ChapterId)
    .then(response=>response.json())
    .then(data=>{
        this.setState({tasks:data});
    });
  }

  updateDueDate(taskId, taskDueDate){
    fetch(variables.API_URL+'task',{
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        TaskId:taskId,
        TaskDueDate:taskDueDate
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

  render(){
    const {
        modules,
        chapters,
        tasks
    }=this.state;

    return (
    <div class="container m-1">
        <div class="row">
            <div class="col">
                <h4>Modules</h4>
                {modules.map(module => {
                    const color = `${module.ModuleColor}`;

                    return (
                        <div className="box" onClick={()=>this.openChapters(module.ModuleId)} style={{backgroundColor: color}}>
                            <div className="title">
                                {module.ModuleName}
                            </div>
                            <div className="subtitle">{module.ModuleCode}</div>
                            <Tag TagText={module.ModuleType} TextColor={color} />
                        </div>
                    )
                })}
                
            </div>
            <div class="col">
                <h4>Chapters</h4>
                {chapters.map(chapter=> {
                    let color;

                    switch (`${chapter.ChapterStatus}`){
                        case "New":
                            color = "#FF5F1F";
                            break;
                        case "In Progress":
                            color = "#FFD700";
                            break;
                        case "Ready":
                            color = "#00ffef";
                            break;
                        case "Completed":
                            color = "#00FF00";
                            break;
                        default:
                            color = "#000000";
                            break;
                    }

                    return (
                        <div className="box" onClick={()=>this.openTasks(chapter.ChapterId)} style={{backgroundColor: color}}>
                            <div className="title">
                                {chapter.ChapterName}
                            </div>
                            <Tag TagText={chapter.ChapterStatus} TextColor={color} />
                        </div>
                    )
                })}
            </div>
            <div class="col">
                <h4>Tasks</h4>
                {tasks.map(task=> {
                    let color;

                    switch (`${task.TaskStatus}`){
                        case "New":
                            color = "#FF5F1F";
                            break;
                        case "In Progress":
                            color = "#FFD700";
                            break;
                        case "Ready":
                            color = "#00ffef";
                            break;
                        case "Completed":
                            color = "#00FF00";
                            break;
                        default:
                            color = "#000000";
                            break;
                    }

                    return (
                        <div className="box" style={{backgroundColor: color}}>
                            <div className="title">
                                {task.TaskName}
                            </div>
                            <div className="subtitle">
                                <span><i class="fa-regular fa-clock-four"></i></span>
                                <div contenteditable="true" onBlur={e => this.updateDueDate(task.TaskId, e.currentTarget.textContent)}>
                                    {task.TaskDueDate}
                                </div>
                            </div>
                            <TaskTag  
                                TextColor={color} 
                                TaskId={task.TaskId}
                                TaskName={task.TaskName}
                                TaskStatus={task.TaskStatus}
                                ChapterId={task.ChapterId}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    );
  }
}