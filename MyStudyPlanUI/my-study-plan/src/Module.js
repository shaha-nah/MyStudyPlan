import React, {Component} from "react";
import {variables} from './Variables.js';

export default class Module extends Component{

  constructor(props){
    super(props);
    this.state = {
      modules:[],
      modalTitle:"",
      ModuleName:"",
      ModuleCode:"",
      moduleLecturer:"",
      ChapterName:""
    }
  }

  refreshList(){
    fetch(variables.API_URL+'module')
    .then(response=>response.json())
    .then(data => {
      this.setState({modules:data});
    });
  }

  componentDidMount(){
    this.refreshList();
  }

  changeModuleName = (e) => {
    this.setState({ModuleName:e.target.value});
  }

  changeModuleCode = (e) => {
    this.setState({ModuleCode: e.target.value});
  }

  changeModuleLecturer = (e) => {
    this.setState({ModuleLecturer: e.target.value});
  }

  changeChapterName = (e) => {
    this.setState({ChapterName: e.target.value});
  }

  addClick(){
    this.setState({
      modalTitle:"Add Module",
      ModuleId:0,
      ModuleName:"",
      ModuleCode:"",
      ModuleLecturer:"",
    });
  }

  editClick(mod){
    this.setState({
      modalTitle:"Edit Module",
      ModuleId:mod.ModuleId,
      ModuleName:mod.ModuleName,
      ModuleCode:mod.ModuleCode,
      ModuleLecturer:mod.ModuleLecturer
    });
  }

  createClick(){
    fetch(variables.API_URL+'module',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        ModuleName:this.state.ModuleName,
        ModuleCode:this.state.ModuleCode,
        ModuleLecturer:this.state.ModuleLecturer
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshList();
    }, (error)=>{
      alert('Failed');
    })
  }

  updateClick(){
    fetch(variables.API_URL+'module',{
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        ModuleId:this.state.ModuleId,
        ModuleName:this.state.ModuleName,
        ModuleCode:this.state.ModuleCode,
        ModuleLecturer:this.state.ModuleLecturer
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      alert(result);
      this.refreshList();
    }, (error)=>{
      alert('Failed');
    })
  }

  addChapter(mod){
    this.setState({
      modalTitle:"Add Chapter",
      ModuleId:mod.ModuleId
    });
  }

  createChapter(){
    fetch(variables.API_URL+'chapter',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        ChapterName:this.state.ChapterName,
        ChapterStatus:'New',
        ModuleId:this.state.ModuleId
      })
    })
    .then(res=>res.json())
    .then((ChapterId)=>{
      this.createTask(ChapterId, 'Pre-reading');
      this.createTask(ChapterId, 'Notes');
      this.createTask(ChapterId, 'Summary');
      this.createTask(ChapterId, 'Revision');
    }, (error)=>{
      alert('Failed');
    })
  }

  createTask(ChapterId, TaskName){
    fetch(variables.API_URL+'task',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        TaskName:TaskName,
        TaskStatus:'New',
        TaskType:'Class',
        ChapterId:ChapterId
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      
    }, (error)=>{
      alert('Failed');
    })
  }

  render(){
    const {
      modules,
      modalTitle,
      ModuleId,
      ModuleName,
      ModuleCode,
      ModuleLecturer,
      ChapterName
    }=this.state;
    
    return (
      <div>
        <button type="button" className="btn btn-primary m-2 float-end" 
          data-bs-toggle="modal" data-bs-target="#moduleModal"
          onClick={()=>this.addClick()}>
            Add Module
        </button>

        <table className = 'table table-stripped'>
          <thead>
            <tr>
              <th>
                Module Name
              </th>
              <th>
                Module Code
              </th>
              <th>
                Lecturer Name
              </th>
              <th>
                Options
              </th>
            </tr>
          </thead>
          <thead>
            {modules.map(mod=>
              <tr key={mod.ModuleId}>
                <td>{mod.ModuleName}</td>
                <td>{mod.ModuleCode}</td>
                <td>{mod.ModuleLecturer}</td>
                <button type="button" className="btn btn-light mr-1" 
                  data-bs-toggle="modal" data-bs-target="#moduleModal"
                  onClick={()=>this.editClick(mod)}
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>

                <button type="button" className="btn btn-light mr-1" 
                  data-bs-toggle="modal" data-bs-target="#chapterModal"
                  onClick={()=>this.addChapter(mod)}
                  title="Add Chapter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                </button>
              </tr>
            )}
          </thead>
        </table>

        <div className="modal fade" id="moduleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Module Name</span>
                  <input type="text" className="form-control"
                    value={ModuleName}
                    onChange={this.changeModuleName} 
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">Module Code</span>
                  <input type="text" className="form-control"
                    value={ModuleCode}
                    onChange={this.changeModuleCode} 
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Lecturer Name</span>
                  <input type="text" className="form-control"
                    value={ModuleLecturer}
                    onChange={this.changeModuleLecturer} 
                  />
                </div>

                {ModuleId===0
                  ?
                    <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.createClick()}
                    >Create</button>
                  : null
                }

                {ModuleId!==0
                  ?
                    <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.updateClick()}
                    >Update</button> 
                  : null
                }

              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="chapterModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>

              <div className="modal-body">
              <div className="input-group mb-3">
                  <span className="input-group-text">Module Id</span>
                  <input type="text" className="form-control"
                    value={ModuleId}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Chapter Name</span>
                  <input type="text" className="form-control"
                    value={ChapterName}
                    onChange={this.changeChapterName} 
                  />
                </div>

                <button type="button"
                  className="btn btn-primary float-start"
                  onClick={()=>this.createChapter()}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}