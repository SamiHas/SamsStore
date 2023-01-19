import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './Pagination'
import { paginate } from './paginate'

export class FetchCustomers extends Component {
    state = {
        customers: [],
        currentPage: 1,
        pageSize: 4
    }



    populateCustomersData = async () => {

        const response = await fetch('api/customersapi')
        const data = await response.json()


        this.setState({ customers: data })

    }

    componentDidMount = () => {
        this.populateCustomersData()
    }



    render() {
        let contents = this.renderCustomersTable(this.state.customers)

        return (
            <div>
                <h1 id="tableLabel">Customers</h1>
                <p>This componets fetches Depts data from the server </p>
                <p>
                    <Link to="/adddept">Create New</Link>
                </p>
                {contents}


                {/* //Code for Pagination*/}
                <Pagination itemCount={this.state.customers.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange} />
            </div>
        )
    }

    renderCustomersTable = customers => {
        //Code for pagination
        const de = paginate(this.state.customers,
            this.state.currentPage,
            this.state.pageSize)



        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Customer #</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {de.map(customer =>
                        <tr key={customer.id}>
                            <td></td>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button
                                    onClick={id => this.handleEdit(customer.id)}
                                >Edit
                                </button>
                                <button
                                    onClick={id => this.handleDelete(customer.id)}
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
        this.props.history.push("/customers/edit/" + id)
    }

    handleDelete = id => {
        if (!window.confirm("Do you want to delete dept with DeptNo: " + id)) {
            return
        }
        else {
            fetch('api/customersapi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        depts: this.state.customers.filter(rec => {
                            return rec.id != id
                        })
                    })
                })
        }
    }

}