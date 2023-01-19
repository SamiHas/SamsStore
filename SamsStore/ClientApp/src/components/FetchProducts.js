import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from './Pagination'
import { paginate } from './paginate'

export class FetchProducts extends Component {
    state = {
        products: [],
        currentPage: 1,
        pageSize: 4
    }



    populateProductsData = async () => {

        const response = await fetch('api/productsapi')
        const data = await response.json()


        this.setState({ products: data })

    }

    componentDidMount = () => {
        this.populateProductsData()
    }



    render() {
        let contents = this.renderProductsTable(this.state.products)

        return (
            <div>
                <h1 id="tableLabel">Products</h1>
                <p>This is product data </p>
                <p>
                    <Link to="/addproduct">Create New</Link>
                </p>
                {contents}


                {/* //Code for Pagination*/}
                <Pagination itemCount={this.state.products.length}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handlePageChange} />
            </div>
        )
    }

    renderProductsTable = products => {
        //Code for pagination
        const de = paginate(this.state.products,
            this.state.currentPage,
            this.state.pageSize)



        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product #</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {de.map(product =>
                        <tr key={product.id}>
                            <td></td>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button
                                    onClick={id => this.handleEdit(product.id)}
                                >Edit
                                </button>
                                <button
                                    onClick={id => this.handleDelete(product.id)}
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
        this.props.history.push("/products/edit/" + id)
    }

    handleDelete = id => {
        if (!window.confirm("Do you want to delete product with id: " + id)) {
            return
        }
        else {
            fetch('api/productsapi/' + id, { method: 'delete' })
                .then(data => {
                    this.setState({
                        products: this.state.products.filter(rec => {
                            return rec.id != id
                        })
                    })
                })
        }
    }

}