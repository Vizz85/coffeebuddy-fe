import React, { Component } from "react";

import Input from "./../form-components/Input";
import Select from "./../form-components/Select";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        name: '',
        coffee: '',
        milk: ''
      },
      url: localStorage.getItem('coffeebuddy_url') || '',
      hash: '',
      confirmed: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  pollResponse(hash) {
    let interval = setInterval(() => {
      fetch(`http://localhost:4000/query/${hash}`)
        .then(response => response.json())
        .then(data => {
          if (data.confirmed) {
            this.setState({confirmed: true})
            clearInterval(interval)
          }
        })
    }, 1000)
  }

  handleSubmit(event) {
    console.log('submit',this.state.order);
    event.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(this.state.order),
      headers: myHeaders
    }

    fetch(`http://localhost:4000/order`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        localStorage.setItem('coffeebuddy_url', data.url);
        localStorage.setItem('coffeebuddy_hash', data.hash);
        this.setState({url: data.url, hash: data.hash})
        this.pollResponse(data.hash);
      })
  }

  handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(prevState => ({
      order: {
          ...prevState.order,
          [name]: value
      }
    }))
  }

  render() {
    let {order, url, confirmed} = this.state

    if (confirmed) {
      return (
        <div>
          <h1>Coffee has been confirmed!</h1>
        </div>
      );
    } else if (url) {
      return (
        <div>
          <h1>Waiting for response</h1>
          <h2>Your url: <strong>{url}</strong></h2>
        </div>
      );
    } else {
      return (
        <form action="" onSubmit={this.handleSubmit}>
  
          <Input
            title={'Enter your name'}
            type={'text'}
            name={'name'}
            value={order.name}
            handleChange={this.handleChange}
          />
  
          <Select
              title={'Select your coffee'}
              name={'coffee'}
              options={[{
                id: 'espresso',
                value: 'Espresso'
              },{
                id: 'cappuccino',
                value: 'Cappuccino'
              },{
                id: 'flat-white',
                value: 'Flat White'
              },]}
              value={order.coffee}
              handleChange={this.handleChange}
          />
  
          <Select
              title={'Select milk type'}
              name={'milk'}
              options={[{
                id: 'dairy',
                value: 'dairy'
              },{
                id: 'soy-milk',
                value: 'soy milk'
              },{
                id: 'oat-milk',
                value: 'oat milk'
              },]}
              value={order.milk}
              handleChange={this.handleChange}
          />
  
          <button type="submit" className="btn btn-primary">Submit</button>
  
        </form>
      );
    }

    
  }
}