import React, { Component } from 'react'

export class Customer {
    constructor() {
        this.id = 0
        this.name = ""
        this.address = ""
    }
}

export class AddCustomer extends Component {

    constructor(props) {
        super(props)
        this.initialize()
    }

    state = {
        title: "",
        customer: new Customer(),
        loading: true
    }


    //initialize =this.initialize.bind(this)

    async initialize() {
        var id = this.props.match.params["id"]
        if (id > 0) {

            const response = await fetch('/api/customersapi/' + id)
            const data = await response.json()

            this.setState({
                title: "Edit",
                customer: data,
                loading: false
            })

        }
        else {
            this.state = {
                title: "Create",
                customer: new Customer(),
                loading: false
            }
        }
    }

    componentDidMount() {
        this.initialize()
    }

    
    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : this.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Customer</h3>
                <hr />
                {contents}
            </div>
        )
    }

    handleSave = event => {
        event.preventDefault()

        const data = new FormData(event.target)
        if (this.state.customer.id) {
            var response = fetch('api/customersapi/' +
                this.state.customer.id, { method: 'PUT', body: data })
            // this.props.history.push("/addcustomer")
        }
        else {
            var response2 = fetch('api/customersapi',
                { method: 'POST', body: data })
            //this.props.history.push("/fetch-customers")
        }
    }

    handleCancel = event => {
        event.preventDefault()
        this.props.history.push("/fetch-customer")
    }

    renderCreateForm = () => {
        return (
            <form onSubmit={this.handleSave}>
                <div >
                    <input type="hidden" name="id"
                        value={this.state.customer.id} />
                </div>

                <div >
                    <label htmlFor="name">Name</label>
                    <div >
                        <input type="text" name="name"
                            defaultValue={this.state.customer.name} required />
                    </div>
                </div>

                <div >
                    <label htmlFor="address">Address</label>
                    <div >
                        <input type="text" name="address"
                            defaultValue={this.state.customer.address} required />
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