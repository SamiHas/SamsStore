import React, { Component } from 'react'

export class Product {
    constructor() {
        this.id = 0
        this.name = ""
        this.price = ""
    }
}

export class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.initialize()
    }

    state = {
        title: "",
        product: new Product(),
        loading: true
    }


    //initialize =this.initialize.bind(this)

    async initialize() {
        var id = this.props.match.params["id"]
        if (id > 0) {

            const response = await fetch('/api/productsapi/' + id)
            const data = await response.json()

            this.setState({
                title: "Edit",
                product: data,
                loading: false
            })

        }
        else {
            this.state = {
                title: "Create",
                product: new Product(),
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
                <h3>Products</h3>
                <hr />
                {contents}
            </div>
        )
    }

    handleSave = event => {
        event.preventDefault()

        const data = new FormData(event.target)
        if (this.state.product.id) {
            var response = fetch('api/productsapi/' +
                this.state.product.id, { method: 'PUT', body: data })
            // this.props.history.push("/addproduct")
        }
        else {
            var response2 = fetch('api/productsapi',
                { method: 'POST', body: data })
            //this.props.history.push("/fetch-products")
        }
    }

    handleCancel = event => {
        event.preventDefault()
        this.props.history.push("/fetch-product")
    }

    renderCreateForm = () => {
        return (
            <form onSubmit={this.handleSave}>
                <div >
                    <input type="hidden" name="id"
                        value={this.state.product.id} />
                </div>

                <div >
                    <label htmlFor="name">Name</label>
                    <div >
                        <input type="text" name="name"
                            defaultValue={this.state.product.name} required />
                    </div>
                </div>

                <div >
                    <label htmlFor="price">Price</label>
                    <div >
                        <input type="text" name="price"
                            defaultValue={this.state.product.price} required />
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