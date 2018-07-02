import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
      this.state={
        title: 'To-Do List',
        index: '',
        datas: [],
        action: 0
      }
  }

  componentDidMount(){
    this.refs.task.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');
    // create variable to use
    let datas = this.state.datas;
    //recieves value from form
    let task = this.refs.task.value
    let notes = this.refs.notes.value
    if (this.state.action === 0){  //CREATES NEW POST
      //holds the value of both inputs
      let data = {
        task, notes
      }
      //pushes value in state array
      datas.push(data);
    }else {                       //UPDATES OLD POST
      let index = this.state.index;
      //the brackets select the index in the array (example myArray[0]),
      //which comes from setting the state in the  edit function!!!
      datas[index].task = task;
      datas[index].notes = notes;
    }
    //sets the state of datas array with the new user input & resets action to 0
    this.setState({
      datas: datas,
      action: 0
    });
    //resets the form to empty
    this.refs.myForm.reset();
    this.refs.task.focus();
  }

  //passing i as the index to select WHICH post is being edited
  fEdit = (i) => {
    let data = this.state.datas[i];
    //update value from formField
    this.refs.task.value = data.task;
    this.refs.notes.value = data.notes;
    //set state which triggers the ELSE statement
    this.setState({
      action: 1,
      index: i
    });
    this.refs.task.focus();
  }

fRemove = (i) => {
  let datas = this.state.datas;
  datas.splice(i,1);
  this.setState({
    datas: datas
  })
  //resets the form to empty
  this.refs.myForm.reset();
  this.refs.task.focus();
}

  render() {
    let datas = this.state.datas
    return (
      <div className="container mt-5">
        <div className="row text-center">
            <div className="col-md-8 mx-auto p-5">
              <h2>{this.state.title}</h2>
                <form ref="myForm" className="myForm">
                  <input type="text" ref="task" placeholder="enter your task" className="formField"/>
                  <input type="text" ref="notes" placeholder="enter your notes" className="formField"/>
                  <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
                </form>
                <pre>
                  <div className="row">
                  {datas.map((data, i) =>
                    <div className="col-md-4 flex-container">
                    <li key={i} className="animated zoomIn flex-container d-inline-block">


                       <h6 className="d-inline-block border p-3 m-3">
                       <h5>To-Do</h5>
                         {data.task}<br/>
                          {data.notes}
                        <button onClick={()=>this.fEdit(i)} className="myButton flex-container d-inline-block m-2 p-2"><i class="far fa-edit"></i> Edit </button><br/>
                          <button onClick={()=>this.fRemove(i)} className="myButton flex-container d-inline-block p-2"><i class="far fa-trash-alt"></i> Remove </button><br/>
                       </h6>
                    </li>
                    </div>
                  )}
                  </div>
                </pre>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
