//import { concat } from 'lodash'
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export class Sale {
    constructor() {
        this.id = 0
        this.customerId = 0
        this.productId = 0
        this.storeId = 0
       
    }
}

export class AddSale extends Component {

    constructor(props) {
        super(props)
        this.initialize()
    }

    state = {
        title: "",
        sale:new Sale(),
        loading: true,
        //CustomerDropdownList: []
       // cList: []
    }


    //initialize =this.initialize.bind(this)

    async initialize() {
        var id = this.props.match.params["id"]
        if (id > 0) {
            const response = await fetch('/api/salesapi/' + id)
            const data = await response.json()

            this.setState({
                title: "Edit",
                sale: data,
                loading: false
            })
        }
        else {
            this.state = {
                title: "Create",
                sale: new Sale(),
                loading: false
            }
        }
    }

    componentDidMount() {
        this.initialize();
        //this.cList()
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : this.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Sales</h3>
                <hr />
                {contents}
            </div>
        )
    }

    handleSave = event => {
        event.preventDefault()

        const data = new FormData(event.target)
        if (this.state.sale.id) {
            var response = fetch('api/salesapi/' +
                this.state.sale.id, { method: 'PUT', body: data })
             this.props.history.push("/addsale")
        }
        else {
            var response2 = fetch('api/salesapi',
                { method: 'POST', body: data })
            this.props.history.push("/fetch-sales")
        }
    }
/*
    populateSalesData = async () => {
        const response = await fetch('api/salesapi')
        const data = await response.json()

        this.setState({ sales: data })
    }*/

    handleCancel = event => {
        event.preventDefault()
        this.props.history.push("/fetch-sale")
    }


    handleChange = event => {
        const sale = { ...this.state.sale }
        sale[event.currentTarget.name] = event.currentTarget.DefaultValue
        this.setState({ sale })
    }

    renderCreateForm = () => {
       return (
          
           <form onSubmit={this.handleSave} >

               

              
                    <div >
                        <input type="hidden" name="id"
                            value={this.state.sale.id} />
                    </div>
              
                    <div >
                        <label htmlFor="dateSold">Date Sold</label>
                        <div >
                            <input type="date" name="dateSold"
                               defaultValue={this.state.sale.dateSold}

                           onChange={this.handleChange/*(event) => setDateSold(event.target.defaultValue)*/}
                       />
                        </div>
                    </div>
               

               
                    <div >
                        <label htmlFor="customerId">Customer</label>
                   <div >
                       <input type="number" name="customerId"
                               defaultValue={this.state.sale.customerId}
                           onChange={this.handleChange/*(event, data) => setCustomerId(data.defaultValue)*/}
                            />
                        </div>
                    </div>
               
                 <div>
                     {/*this.state.sale.map(s=>s.customer.name)*/}
                    <label htmlFor="productId">Product</label>
                   <div >
                       <input type="number" name="productId"
                           defaultValue={this.state.sale.productId}
                           onChange={this.handleChange/*(event, data) => setProductId(data.defaultValue)*/}
                       />
                    </div>
                </div>
               

           
               <div >
                    <label htmlFor="storeId">Store</label>
                   <div >
                       <input type="number" name="storeId"
                           defaultValue={this.state.sale.storeId}
                           onChange={this.handleChange/*(event, data) => setStoreId(data.defaultValue)*/}
                       />
                    </div>
                </div>
                  
                    <div >
                        <button type="submit" >Save</button>
                        <button onClick={this.handleCancel}>Back to the List</button>
                    </div>
                </form>


           // })
            )


        
    }


}