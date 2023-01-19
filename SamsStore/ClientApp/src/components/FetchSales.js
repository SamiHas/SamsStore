import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './Pagination'
import { paginate } from './paginate'
import { Button } from 'semantic-ui-react'

export class FetchSales extends Component {
    state = {
        sales: [],
        currentPage: 1,
        pageSize: 4
    }


    populateSalesData = async () => {
        const response = await fetch('api/salesapi')
        const data = await response.json()

        this.setState({ sales: data })
    }

    componentDidMount = () => {
        this.populateSalesData()
    }


    render() {
        let contents = this.renderSalesTable(this.state.sales)

        return (
            <div>
                <h1 id="tableLabel">Sales</h1>
                <p>This is Sales data </p>
                <p>
                    <Link to="/addsale">Create New</Link>
                </p>
                {contents}


                {/* //Code for Pagination*/}
                <Pagination itemCount={this.state.sales.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange} />
            </div>
        )
    }

    renderSalesTable = sales => {
        //Code for pagination
        const de = paginate(this.state.sales,
            this.state.currentPage,
            this.state.pageSize)



        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {/*<th>ID</th>*/}
                        <th>Customer #</th>
                        <th>Product #</th>
                        <th>Store #</th>
                        <th>DateSold</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {de.map(sale =>
                        <tr key={sale.id}>
                            <td></td>
                            {/*<td>{ sale.id}</td>*/}
                            <td>{sale.customer.name}</td>
                            <td>{sale.product.name}</td>
                            <td>{sale.store.name}</td>
                            <td>{sale.dateSold}</td>
                            <td>
                                <button
                                    onClick={id => this.handleEdit(sale.id)}
                                >Edit
                                </button>
                                <Button primary
                                    onClick={id => this.handleDelete(sale.id)}
                                >Delete
                                </Button>
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
        this.props.history.push("/sales/edit/" + id)
    }

    handleDelete = id => {
        if (!window.confirm("Do you want to delete sales with id: " + id)) {
            return
        }
        else {
            fetch('api/salesapi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        sales: this.state.sales.filter(rec => {
                            return rec.id != id
                        })
                    })
                })
        }
    }

}