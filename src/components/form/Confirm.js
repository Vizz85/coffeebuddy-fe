import React, { Component } from "react";

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
      msg: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    fetch(`http://localhost:4000/confirm/${this.props.match.params.hash}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({confirmed: true, msg: data.msg})
      })
  }

  render() {
    let {confirmed, msg} = this.state

    if (confirmed) {
      return (
        <div>
          <h1>{msg}</h1>
        </div>
      );
    } else {
      return (
        <form action="" onSubmit={this.handleSubmit}>
  
          <button type="submit" className="btn btn-primary">Confirm and take the Coffee!</button>
  
        </form>
      );
    }

    
  }
}