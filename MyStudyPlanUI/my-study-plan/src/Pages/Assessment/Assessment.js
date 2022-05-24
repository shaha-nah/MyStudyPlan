import React, {Component} from "react";
import {variables} from '../../Variables.js';
import './Assessment.css';

export default class Assessment extends Component{
  constructor(props){
    super(props);
    this.state = {
      assessments:[],
      modules:[],
      module:[],
      AssessmentId:"",
      AssessmentName:"",
      AssessmentDate:"",
      AssessmentType:"",
      AssessmentDetails:"",
      AssessmentGrade:"",
      AssessmentStatus:""
    }
  }

  addClick(){
    this.getModuleList();
    this.setState({
      modalTitle:"Add Assessment",
      AssessmentId:0,
      AssessmentName:"",
      ModuleColor:"",
      AssessmentDate:"",
      AssessmentType:"",
      AssessmentDetails:"",
      AssessmentGrade:"",
      AssessmentStatus:""
    });
  }

  editClick(assessment){
    this.getModuleList();
    this.setState({
      modalTitle:"Edit Assessment",
      AssessmentId:assessment.AssessmentId,
      AssessmentName:assessment.AssessmentName,
      ModuleColor:assessment.ModuleColor,
      AssessmentDate:assessment.AssessmentDate,
      AssessmentType:assessment.AssessmentType,
      AssessmentDetails:assessment.AssessmentDetails,
      AssessmentGrade:assessment.AssessmentGrade,
      AssessmentStatus:assessment.AssessmentStatus
    });

  }
  
  changeAssessmentName = (e) => {
    this.setState({AssessmentName:e.target.value});
  }

  changeModuleColor = (e) => {
    this.setState({ModuleColor:e.target.value});
  }

  changeAssessmentDate = (e) => {
    this.setState({AssessmentDate:e.target.value});
  }

  changeAssessmentType = (e) => {
    this.setState({AssessmentType:e.target.value});
  }

  changeAssessmentDetails = (e) => {
    this.setState({AssessmentDetails:e.target.value});
  }

  changeAssessmentGrade = (e) => {
    this.setState({AssessmentGrade:e.target.value});
  }

  changeAssessmentStatus = (e) => {
    this.setState({AssessmentStatus:e.target.value});
  }

  getModuleList(){
    fetch(variables.API_URL+'module')
    .then(response=>response.json())
    .then(data => {
      this.setState({modules:data});
    });
  }

  getAssessmentList(){
    fetch(variables.API_URL+'assessment')
    .then(response=>response.json())
    .then(data => {
      this.setState({assessments:data});
    });
  }

  componentDidMount(){
    this.getAssessmentList();
  }

  createAssessment(){
    fetch(variables.API_URL+'assessment',{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        AssessmentName:this.state.AssessmentName,
        ModuleColor:this.state.ModuleColor,
        AssessmentDate:this.state.AssessmentDate,
        AssessmentType:this.state.AssessmentType,
        AssessmentDetails:this.state.AssessmentDetails,
        AssessmentGrade:this.state.AssessmentGrade,
        AssessmentStatus:this.state.AssessmentStatus,
      })
    })
    .then(res=>res.json())
    .then(()=>{
      window.location.reload();
    }, (error)=>{
      console.log(error);
    })
  }

  updateAssessment(){
    fetch(variables.API_URL+'assessment',{
      method:'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        AssessmentId:this.state.AssessmentId,
        AssessmentName:this.state.AssessmentName,
        ModuleColor:this.state.ModuleColor,
        AssessmentDate:this.state.AssessmentDate,
        AssessmentType:this.state.AssessmentType,
        AssessmentDetails:this.state.AssessmentDetails,
        AssessmentGrade:this.state.AssessmentGrade,
        AssessmentStatus:this.state.AssessmentStatus,
      })
    })
    .then(res=>res.json())
    .then(()=>{
      window.location.reload();
    }, (error)=>{
      console.log(error);
    })
  }

  render(){
    const {
      assessments,
      modules,
      modalTitle,
      AssessmentId,
      AssessmentName,
      ModuleColor,
      AssessmentDate,
      AssessmentType,
      AssessmentDetails,
      AssessmentGrade,
      AssessmentStatus
    } = this.state;

    return (
      <div className="container m-1">
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary m-2 addButton"
              data-bs-toggle="modal" data-bs-target="#assessmentModal"
              onClick={()=>this.addClick()}>
              +
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h4>Assignment</h4>
            <div>
              {assessments.filter(assessments=>assessments.AssessmentType === 'Assignment' && assessments.AssessmentStatus === "Due")
              .sort((a, b) => 
                a.AssessmentDate > b.AssessmentDate ? 1 : -1
              )
              .map(assessment=>{
                return (
                  <div className="assessmentBox" style={{backgroundColor: `${assessment.ModuleColor}`}}>
                    <div className="title">
                      {assessment.AssessmentName}
                      <button type="button" className="btn float-end" 
                        data-bs-toggle="modal" data-bs-target="#assessmentModal"
                        onClick={()=>this.editClick(assessment)}
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      </button>
                    </div>
                    <div>
                      <span><i class="fa-regular fa-clock-four m-1 mb-4"></i></span>
                      { (new Date(assessment.AssessmentDate)).toLocaleDateString('en-US', {day: "numeric", month:"long"}) }
                    </div>
                    <div>
                      {assessment.AssessmentDetails}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="col">
            <h4>Test</h4>
            <div>
              {assessments.filter(assessments=>assessments.AssessmentType === 'Test' && assessments.AssessmentStatus === "Due")
              .sort((a, b) => 
                a.AssessmentDate > b.AssessmentDate ? 1 : -1
              )
              .map(assessment=>{
                return (
                  <div className="assessmentBox" style={{backgroundColor: `${assessment.ModuleColor}`}}>
                    <div className="title">
                      {assessment.AssessmentName}
                      <button type="button" className="btn float-end" 
                        data-bs-toggle="modal" data-bs-target="#assessmentModal"
                        onClick={()=>this.editClick(assessment)}
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      </button>
                    </div>
                    <div>
                      <span><i class="fa-regular fa-clock-four mb-4 m-1 mb-4"></i></span>
                      { (new Date(assessment.AssessmentDate)).toLocaleDateString('en-US', {day: "numeric", month:"long"}) }
                    </div>
                    <div>
                      {assessment.AssessmentDetails}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="col">
            <h4>Complete</h4>
            <div>
              {assessments.filter(assessments=>assessments.AssessmentStatus === "Done")
              .sort((a, b) => 
                a.AssessmentDate > b.AssessmentDate ? 1 : -1
              )
              .map(assessment=>{
                return (
                  <div className="assessmentBox" style={{backgroundColor: `${assessment.ModuleColor}`}}>
                    <div className="title">
                      {assessment.AssessmentName}
                      <button type="button" className="btn float-end" 
                        data-bs-toggle="modal" data-bs-target="#assessmentModal"
                        onClick={()=>this.editClick(assessment)}
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                      </button>
                    </div>
                    <div>
                      <span><i class="fa-regular fa-clock-four m-1 mb-4"></i></span>
                      { (new Date(assessment.AssessmentDate)).toLocaleDateString('en-US', {day: "numeric", month:"long"}) }
                    </div>
                    <div className="grades mb-4">
                      {assessment.AssessmentGrade}
                    </div>
                    <div>
                      {assessment.AssessmentDetails}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
          

        <div className="modal fade" id="assessmentModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-light">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close btn-dark" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Name</span>
                  <input type="text" className="form-control bg-dark text-white"
                    value={AssessmentName}
                    onChange={this.changeAssessmentName}
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Module</span>
                  <select className="form-control bg-dark text-white"
                    value={ModuleColor}
                    onChange={this.changeModuleColor} 
                  >
                    <option value=""></option>  
                    {modules.map((module) => (
                      <option value={module.ModuleColor}>{module.ModuleName}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Date</span>
                  <input type="date" className="form-control bg-dark text-white"
                    value={AssessmentDate}
                    onChange={this.changeAssessmentDate} 
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Type</span>
                  <select className="form-control bg-dark text-white"
                    value={AssessmentType} onChange={this.changeAssessmentType}
                  >     
                    <option value=""></option>       
                    <option value="Assignment">Assignment</option>
                    <option value="Test">Test</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Details</span>
                  <textarea className="form-control bg-dark text-white" rows={5}
                    value={AssessmentDetails}
                    onChange={this.changeAssessmentDetails} 
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Grade</span>
                  <input type="text" className="form-control bg-dark text-white"
                    value={AssessmentGrade}
                    onChange={this.changeAssessmentGrade} 
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="col-form-label col-sm-2">Status</span>
                  <select className="form-control bg-dark text-white"
                    value={AssessmentStatus} onChange={this.changeAssessmentStatus}
                  >     
                    <option value=""></option>       
                    <option value="Due">Due</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                
                {AssessmentId===0 
                  ?
                  <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.createAssessment()}>
                    Create
                  </button>
                  : null
                }

                {AssessmentId!==0 
                  ?
                  <button type="button"
                    className="btn btn-primary float-start"
                    onClick={()=>this.updateAssessment()}>
                    Update
                  </button>
                  : null
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}