import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
      this.state={
        title: 'React Crud App',
        index: '',
        datas: [],
        action: 0
      }
  }

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');
    // create variable to use
    let datas = this.state.datas;
    //recieves value from form
    let name = this.refs.name.value
    let address = this.refs.address.value
    if (this.state.action === 0){  //CREATES NEW POST
      //holds the value of both inputs
      let data = {
        name, address
      }
      //pushes value in state array
      datas.push(data);
    }else {                       //UPDATES OLD POST
      let index = this.state.index;
      //the brackets select the index in the array (example myArray[0]),
      //which comes from setting the state in the  edit function!!!
      datas[index].name = name;
      datas[index].address = address;
    }
    //sets the state of datas array with the new user input & resets action to 0
    this.setState({
      datas: datas,
      action: 0
    });
    //resets the form to empty
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  //passing i as the index to select WHICH post is being edited
  fEdit = (i) => {
    let data = this.state.datas[i];
    //update value from formField
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    //set state which triggers the ELSE statement
    this.setState({
      action: 1,
      index: i
    });
    this.refs.name.focus();
  }

fRemove = (i) => {
  let datas = this.state.datas;
  datas.splice(i,1);
  this.setState({
    datas: datas
  })
  //resets the form to empty
  this.refs.myForm.reset();
  this.refs.name.focus();
}

  render() {
    let datas = this.state.datas
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="your name" className="formField"/>
          <input type="text" ref="address" placeholder="your address" className="formField"/>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}
              <button onClick={()=>this.fRemove(i)} className="myButton">Remove </button>
              <button onClick={()=>this.fEdit(i)} className="myButton">Edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
