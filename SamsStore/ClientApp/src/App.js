import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchCustomers } from './components/FetchCustomers';
import { AddCustomer } from './components/AddCustomer';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/fetch-customer' component={FetchCustomers} />
        <Route path='/addcustomer' component={AddCustomer} />
        <Route path='/customers/edit/:id' component={AddCustomer} />
      </Layout>
    );
  }
}
