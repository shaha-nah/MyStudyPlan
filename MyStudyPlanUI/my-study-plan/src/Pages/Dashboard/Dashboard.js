import React, {Component} from "react";
import {variables} from '../../Variables.js';
import './Dashboard.css';
import Tag from '../../Component/Tag/Tag';

export default class Dashboard extends Component{

  constructor(props){
    super(props);
    this.state = {
        modules:[],
        chapters:[],
        tasks:[],
        TaskId:"",
        TaskName:"",
        TaskDueDate:"",
        TaskStatus:"",
        ChapterId:""
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

  setModuleActive(boxId){
    var boxes =  document.getElementsByClassName("module");
    for (let i = 0; i<boxes.length; i++){
        boxes[i].style.border = "None"
    }

    boxes = document.getElementsByClassName("chapter");
    for (let i = 0; i<boxes.length; i++){
        boxes[i].style.border = "None"
    }
    document.getElementById(boxId).style.border = "3px solid white";
  }

  setChapterActive(boxId){
    var boxes =  document.getElementsByClassName("chapter");
    for (let i = 0; i<boxes.length; i++){
        boxes[i].style.border = "None"
    }
    document.getElementById(boxId).style.border = "3px solid white";
  }

  openChapters(ModuleId){
    this.setModuleActive(ModuleId);
    this.setState({tasks:[]});
    fetch(variables.API_URL+'chapter/'+ModuleId)
    .then(response=>response.json())
    .then(data=>{
        this.setState({chapters:data});
    });
  }

  openTasks(ChapterId){
    this.setChapterActive(ChapterId);
    fetch(variables.API_URL+'task/'+ChapterId)
    .then(response=>response.json())
    .then(data=>{
        this.setState({tasks:data});
    });
  }

  updateTask(){
    fetch(variables.API_URL+'task',{
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        TaskId:this.state.TaskId,
        TaskDueDate:this.state.TaskDueDate,
        TaskStatus:this.state.TaskStatus
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshList();
    }, (error)=>{
      alert(error);
    });

    this.updateChapter(this.state.TaskName, this.state.TaskStatus, this.state.ChapterId);
  }

  updateChapter(taskName, taskStatus, chapterId){
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
    }
    else{
        if (taskName === "Pre-reading"){
            chapterStatus = "New"
        }
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

  changeTaskDueDate = (e) => {
    this.setState({TaskDueDate:e.target.value});
  }

  changeTaskStatus = (e) => {
    this.setState({TaskStatus:e.target.value});
  }

  editClick(task){
      this.setState({
        TaskId: task.TaskId,
        TaskName: task.TaskName,
        TaskDueDate: task.TaskDueDate,
        TaskStatus: task.TaskStatus,
        ChapterId: task.ChapterId
      });
  }

  render(){
    const {
        modules,
        chapters,
        tasks,
        TaskId,
        TaskName,
        TaskDueDate,
        TaskStatus,
        ChapterId
    }=this.state;

    return (
    <div class="container m-1">
        <div class="row">
            <div class="col">
                <h4>Modules</h4>
                {modules.map(module => {
                    const color = `${module.ModuleColor}`;

                    return (
                        <div className="box module" onClick={()=>this.openChapters(module.ModuleId)} 
                            style={{backgroundColor: color}} id={module.ModuleId}
                        >
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
                        <div className="box chapter" onClick={()=>this.openTasks(chapter.ChapterId)} 
                            style={{backgroundColor: color}} id={chapter.ChapterId}
                        >
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
                                <button type="button" className="btn float-end" 
                                    data-bs-toggle="modal" data-bs-target="#taskModal"
                                    onClick={()=>this.editClick(task)}
                                    title="Edit"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="subtitle">
                                <span><i class="fa-regular fa-clock-four"></i></span>
                                <div>
                                    {task.TaskDueDate}
                                </div>
                            </div>
                            <Tag TagText={task.TaskStatus} TextColor={color} />
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="modal fade" id="taskModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-light">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close btn-dark" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Task Date</span>
                  <input type="date" className="form-control bg-dark text-white"
                    value={TaskDueDate}
                    onChange={this.changeTaskDueDate}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Task Status</span>
                  {/* <input type="text" className="form-control bg-dark text-white"
                    value={TaskStatus}
                    onChange={this.changeTaskStatus} 
                  /> */}
                  <select className="form-control bg-dark text-white"
                    value={TaskStatus} onChange={this.changeTaskStatus}
                  >     
                    <option value=""></option>       
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button type="button"
                  className="btn btn-primary float-start"
                  onClick={()=>this.updateTask()}>
                    Update
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    );
  }
}