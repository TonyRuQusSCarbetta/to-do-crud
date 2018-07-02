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
      <div className="container">
        <div className="row text-center">
            <div className="col-md-8 mx-auto">
              <h2>{this.state.title}</h2>
                <form ref="myForm" classtask="myForm">
                  <input type="text" ref="task" placeholder="your task" classtask="formField"/>
                  <input type="text" ref="notes" placeholder="your notes" className="formField"/>
                  <button onClick={(e)=>this.fSubmit(e)} classtask="myButton">Submit </button>
                </form>
                <pre>
                  {datas.map((data, i) =>
                    <li key={i} className="myList">
                      {i+1}. {data.task},<br/>
                      {data.notes}<br/>
                      <button onClick={()=>this.fRemove(i)} className="myButton">Remove </button>
                      <button onClick={()=>this.fEdit(i)} className="myButton">Edit </button>
                    </li>
                  )}
                </pre>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
