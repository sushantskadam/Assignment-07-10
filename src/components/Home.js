import React, { Component } from 'react'
import axios from 'axios'
import Edit from './Edit';
import Notfound from './Notfound';

import{BrowserRouter as Router,Route,Switch,Link,Redirect} from 'react-router-dom'
const client = axios.create({
    baseURL:"http://localhost:3001/employees"
})
export class Home extends Component {
    constructor(props){
        super(props)
        this.state={empData:[],id:'',ename:'',age:0,city:'',gender:'',salary:0,flag:0}
    }

    handler=(event)=>{
        const{name,value}= event.target
        this.setState({[name]:value})
    }

    componentDidMount=async()=>{
        client.get()
        .then(res=>{
            this.setState({empData:res.data,flag:1})
        })
        .catch(err=>{
            console.log(err)
        }) 
        
    } 

    empDelete=async(id,event)=>{
        client.delete(`/${id}`)
            .then(res=>{
            client.get()
             .then(res=>{
                this.setState({empData:res.data})
              })
            })
        }

        clickhandler=()=>{
            this.setState({flag:1})
        }

    render() {
        // if(!this.state.flag) {
        //     return <Redirect to="/edit"/>
        //      }
        return (
            <>
             
            <Router>
            {/* {this.state.flag==0? */}
                <table className="table">
                <thead className="thead-dark ">
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>CITY</th>
                        <th>GENDER</th>
                        <th>SALARY</th>
                        {/* <th >ACTION</th> */}
                        <th >ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.empData.length>0?
                    this.state.empData.map((emp,i)=>
                    <tr key={i}>
                        <td>{emp.id}</td>
                        <td>{emp.ename}</td>
                        <td>{emp.age}</td>
                        <td>{emp.city}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.salary}</td>                   
                        {/* <td><button className="btn btn-success" onClick={()=>this.clickhandler()}><Link to="/edit">Update</Link></button></td> */}
                        <td><button className="btn btn-danger" onClick={()=>this.empDelete(emp.id)}>Delete</button></td>
                        
                    </tr>)
                    
                    : <p>no user found</p>}
                </tbody>
            </table>
            
            <Switch>
            
          {/* <Route path="/edit" exact component={Edit}></Route> */}
   
          </Switch>
    
            </Router>
    
            </>
        )
    }
}

export default Home
