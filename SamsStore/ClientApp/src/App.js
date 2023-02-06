import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchCustomers } from './components/FetchCustomers';
import { AddCustomer } from './components/AddCustomer';

import { FetchStores } from './components/FetchStores';
import { AddStore } from './components/AddStore';
import { FetchProducts } from './components/FetchProducts';
import { AddProduct } from './components/AddProduct';
import { FetchSales } from './components/FetchSales';
import { AddSale } from './components/AddSale';


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


        <Route path='/fetch-store' component={FetchStores} />
        <Route path='/addstore' component={AddStore} />
        <Route path='/stores/edit/:id' component={AddStore} />

        <Route path='/fetch-product' component={FetchProducts} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/products/edit/:id' component={AddProduct} />

        <Route path='/fetch-sale' component={FetchSales} />
        <Route path='/addsale' component={AddSale} />
        <Route path='/sales/edit/:id' component={AddSale} />

      </Layout>
    );
  }
}
