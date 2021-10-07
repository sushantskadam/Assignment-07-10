import React, { Component } from 'react'
import axios from 'axios'
const client = axios.create({
    baseURL:"http://localhost:3001/employees"
})

export class Edit extends Component {
    constructor(props){
        super(props)
        this.state={empData:[],id:'',ename:'',age:0,city:'',gender:'',salary:0}
    }

    handler=(event)=>{
        const{name,value}= event.target
        this.setState({[name]:value})
    }

    componentDidMount=async()=>{
        client.get()
        .then(res=>{
            this.setState({empData:res.data})
        })
        .catch(err=>{
            console.log(err)
        }) } 

    update(emp){
         this.setState({
            id:emp.id,
            ename:emp.ename,
            age:emp.age,
            city:emp.city,
            gender:emp.gender,
            salary:emp.salary
           
            })
            document.getElementById('ename').value=emp.ename;
            document.getElementById('age').value=emp.age;
            document.getElementById('city').value=emp.city;
            document.getElementById('gender').value=emp.gender;
            document.getElementById('salary').value=emp.salary;
            
        }

    empUpdate=async(event)=>{

        let formData={"ename":this.state.ename,"age":this.state.age,"city":this.state.city,"gender":this.state.gender,"salary":this.state.salary}
        client.put(`/${this.state.id}`,formData)
        .then(res=>{
            client.get()
            .then(res=>{
                this.setState({empData:res.data})
             })
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


    render() {
        return (
            <div>
                <table className="table">
                <thead className="thead-dark ">
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>CITY</th>
                        <th>GENDER</th>
                        <th>SALARY</th>
                        <th>ACTION</th>
                        <th>ACTION</th>
                        
                    </tr>
                </thead>
                <tbody>
                
                <tr>
                        <td></td>
                       <td><input type="text" name="ename" id="ename" onChange={this.handler.bind(this)} placeholder="Name"></input></td>
                       <td><input type="number" name="age" id="age" onChange={this.handler.bind(this)} placeholder="Age"></input></td>
                       <td><input type="text" name="city" id="city" onChange={this.handler.bind(this)} placeholder="City"></input></td>
                       <td><input type="text" name="gender" id="gender" onChange={this.handler.bind(this)} placeholder="Gender"></input></td>
                       <td><input type="number" name="salary" id="salary" onChange={this.handler.bind(this)} placeholder="Salary"></input></td>
                       <td>
                                
                        <button className="btn btn-success" onClick={()=>this.empUpdate()}>Update</button></td>
                    </tr>
            
                    
                    {this.state.empData.length>0?
                    this.state.empData.map((emp,i)=>
                    <tr key={i}>
                        <td>{emp.id}</td>
                        <td>{emp.ename}</td>
                        <td>{emp.age}</td>
                        <td>{emp.city}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.salary}</td>                   
                        <td><button className="btn btn-success" onClick={()=>this.update(emp)}>Update</button></td>
                        <td><button className="btn btn-danger" onClick={()=>this.empDelete(emp.id)}>Delete</button></td>
                        
                    </tr>
                    
                    ) : <p>no user found</p>}
                   
                
                </tbody>
            </table>
  
            </div>
        )
    }
}

export default Edit
