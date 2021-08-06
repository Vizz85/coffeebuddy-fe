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
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    let {order} = this.state

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