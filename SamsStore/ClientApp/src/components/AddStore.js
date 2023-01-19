import React, { Component } from 'react'

export class Store {
    constructor() {
        this.id = 0
        this.name = ""
        this.address = ""
    }
}

export class AddStore extends Component {

    constructor(props) {
        super(props)
        this.initialize()
    }

    state = {
        title: "",
        store: new Store(),
        loading: true
    }


    //initialize =this.initialize.bind(this)

    async initialize() {
        var id = this.props.match.params["id"]
        if (id > 0) {

            const response = await fetch('/api/storesapi/' + id)
            const data = await response.json()

            this.setState({
                title: "Edit",
                store: data,
                loading: false
            })

        }
        else {
            this.state = {
                title: "Create",
                store: new Store(),
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
                <h3>Store</h3>
                <hr />
                {contents}
            </div>
        )
    }

    handleSave = event => {
        event.preventDefault()

        const data = new FormData(event.target)
        if (this.state.store.id) {
            var response = fetch('api/storesapi/' +
                this.state.store.id, { method: 'PUT', body: data })
            // this.props.history.push("/addstore")
        }
        else {
            var response2 = fetch('api/storesapi',
                { method: 'POST', body: data })
            //this.props.history.push("/fetch-stores")
        }
    }

    handleCancel = event => {
        event.preventDefault()
        this.props.history.push("/fetch-store")
    }

    renderCreateForm = () => {
        return (
            <form onSubmit={this.handleSave}>
                <div >
                    <input type="hidden" name="id"
                        value={this.state.store.id} />
                </div>

                <div >
                    <label htmlFor="name">Name</label>
                    <div >
                        <input type="text" name="name"
                            defaultValue={this.state.store.name} required />
                    </div>
                </div>

                <div >
                    <label htmlFor="address">Address</label>
                    <div >
                        <input type="text" name="address"
                            defaultValue={this.state.store.address} required />
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