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
        
    }


    

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
// Fetching data for PUSH and PUT method
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

                           onChange={this.handleChange}
                       />
                        </div>
                    </div>
               

               
                    <div >
                        <label htmlFor="customerId">Customer</label>
                        <div >
                           <input type="number" name="customerId"
                                   defaultValue={this.state.sale.customerId}
                               onChange={this.handleChange}
                                />
                        </div>
                    </div>
               

                   <div>
                        <label htmlFor="productId">Product</label>
                       <div >
                           <input type="number" name="productId"
                               defaultValue={this.state.sale.productId}
                               onChange={this.handleChange}
                           />
                        </div>
                    </div>
               

           
               <div >
                    <label htmlFor="storeId">Store</label>
                   <div >
                       <input type="number" name="storeId"
                           defaultValue={this.state.sale.storeId}
                           onChange={this.handleChange}
                       />
                    </div>
                </div>
                  
                    <div >
                        <button type="submit" >Save</button>
                        <button onClick={this.handleCancel}>Back to the List</button>
                    </div>
                </form>


           
            )


        
    }


}