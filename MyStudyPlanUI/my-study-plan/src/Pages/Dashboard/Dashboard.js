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
                {modules.map(module => 
                    <div className="box" onClick={()=>this.openChapters(module.ModuleId)} >
                        <div className="title">
                            {module.ModuleName}
                        </div>
                        <div className="subtitle">{module.ModuleCode}</div>
                        <Tag TagText={module.ModuleType}/>
                    </div>
                )}
                
            </div>
            <div class="col">
                <h4>Chapters</h4>
                {chapters.map(chapter=>
                    <div className="box" onClick={()=>this.openTasks(chapter.ChapterId)} >
                        <div className="title">
                            {chapter.ChapterName}
                        </div>
                        <Tag TagText={chapter.ChapterStatus}/>
                    </div>
                )}
            </div>
            <div class="col">
                <h4>Tasks</h4>
                {tasks.map(task=>
                    <div className="box">
                        <div className="title">
                            {task.TaskName}
                        </div>
                        <div className="subtitle">
                            <span><i class="fa-regular fa-clock-four"></i></span>{task.TaskDueDate}
                        </div>
                        <Tag TagText={task.TaskStatus}/>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
  }
}