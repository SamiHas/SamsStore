import React, { Component } from 'react'

export class Dept {
    constructor() {
        this.deptNo = 0
        this.dName = ""
        this.location = ""
    }
}

export class AddDept extends Component {

    constructor(props) {
        super(props)
        this.initialize()
        /* this.state = {
             title: "",
             //doesn't make difference with-()
             dept: new Dept(),
             loading: true
         }*/
    }

    state = {
        title: "",
        dept: new Dept(),
        loading: true
    }


    //initialize =this.initialize.bind(this)

    async initialize() {
        var deptNo = this.props.match.params["deptNo"]
        if (deptNo > 0) {

            const response = await fetch('/api/deptsapi/' + deptNo)
            const data = await response.json()

            this.setState({
                title: "Edit",
                dept: data,
                loading: false
            })

        }
        else {
            this.state = {
                title: "Create",
                dept: new Dept(),
                loading: false
            }


        }
    }


    componentDidMount() {
        this.initialize()
    }

    /* async initialize()   {
         var deptNo = this.props.match.params["deptNo"]
         if (deptNo > 0) {
             const response = await fetch('/api/deptsapi/' + deptNo)
             const data = await response.json()
 
             this.setState({
                 title: "Edit",
                 dept: data,
                 loading: false
             })
         }
         else {
             this.state = {
                 title: "Create",
                 dept: new Dept(),
                 loading: false
             }
         }
     }*/



    render() {
        let contents = this.state.loading
            ? <p><em>Loading....</em></p>
            : this.renderCreateForm();
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Department</h3>
                <hr />
                {contents}
            </div>
        )
    }

    handleSave = event => {
        event.preventDefault()

        const data = new FormData(event.target)
        if (this.state.dept.deptNo) {
            var response = fetch('api/deptsapi/' +
                this.state.dept.deptNo, { method: 'PUT', body: data })
            // this.props.history.push("/adddept")
        }
        else {
            var response2 = fetch('api/deptsapi',
                { method: 'POST', body: data })
            //this.props.history.push("/fetch-depts")
        }
    }

    handleCancel = event => {
        event.preventDefault()
        this.props.history.push("/fetch-depts")
    }

    renderCreateForm = () => {
        return (
            <form onSubmit={this.handleSave}>
                <div >
                    <input type="hidden" name="deptNo"
                        value={this.state.dept.deptNo} />
                </div>

                <div >
                    <label htmlFor="dName">Name</label>
                    <div >
                        <input type="text" name="dName"
                            defaultValue={this.state.dept.dName} required />
                    </div>
                </div>

                <div >
                    <label htmlFor="location">Location</label>
                    <div >
                        <input type="text" name="location"
                            defaultValue={this.state.dept.location} required />
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