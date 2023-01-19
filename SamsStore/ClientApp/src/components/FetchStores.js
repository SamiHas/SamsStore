import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './Pagination'
import { paginate } from './paginate'

export class FetchStores extends Component {
    state = {
        stores: [],
        currentPage: 1,
        pageSize: 4
    }



    populateCustomersData = async () => {

        const response = await fetch('api/storesapi')
        const data = await response.json()


        this.setState({ stores: data })

    }

    componentDidMount = () => {
        this.populateCustomersData()
    }



    render() {
        let contents = this.renderStoresTable(this.state.stores)

        return (
            <div>
                <h1 id="tableLabel">Stores</h1>
                <p>This is store data </p>
                <p>
                    <Link to="/addstore">Create New</Link>
                </p>
                {contents}


                {/* //Code for Pagination*/}
                <Pagination itemCount={this.state.stores.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange} />
            </div>
        )
    }

    renderStoresTable = stores => {
        //Code for pagination
        const de = paginate(this.state.stores,
            this.state.currentPage,
            this.state.pageSize)



        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Store #</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {de.map(store =>
                        <tr key={store.id}>
                            <td></td>
                            <td>{store.id}</td>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td>
                                <button
                                    onClick={id => this.handleEdit(store.id)}
                                >Edit
                                </button>
                                <button
                                    onClick={id => this.handleDelete(store.id)}
                                >Delete
                                </button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        )
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleEdit = id => {
        this.props.history.push("/stores/edit/" + id)
    }

    handleDelete = id => {
        if (!window.confirm("Do you want to delete store with id: " + id)) {
            return
        }
        else {
            fetch('api/storesapi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        stores: this.state.stores.filter(rec => {
                            return rec.id != id
                        })
                    })
                })
        }
    }

}