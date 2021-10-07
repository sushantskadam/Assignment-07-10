import React, { Component } from 'react'
import axios from 'axios'
const regForName = /^[a-zA-Z ]{2,100}$/;
const client = axios.create({
    baseURL:"http://localhost:3001/employees"
})
export class Add extends Component {
    constructor(props){
        super(props)
        this.state={
            empData:[],
            id:'',
            ename:'',
            age:0,
            city:'',
            gender:'',
            salary:0 ,
            
            errors:{ename:'',age:'',city:'',gender:'',salary:'',success:''},
            enames:[],
            ages:[],
            cities:[],
            genders:[],
            salaries:[]
            
    }
    }

    handler=(event)=>{
        const{name,value}= event.target
        this.setState({[name]:value})
        let errors=this.state.errors;

        switch(name){
                
            case 'ename':
                errors.ename=regForName.test(value)?'':'Name is not valid';
                break;
            case 'age':
                errors.age=value<18?'Enter Age Above 18':'';
                break;
            case 'city':
                errors.city=regForName.test(value)?'':'Enter Valid City';
                break;
            case 'gender':
                errors.gender=value==="male"||value==="female"||value==="Male"||value==="Female"?'':'Please Enter Male or Female';
                break;
            case 'salary':
                errors.salary=value<5000?'Please Enter Valid Salary':'';
                break;
        }
        this.setState({errors,[name]:value},()=>{
            console.log(errors)
        })

    }
    validate=(errors)=>{
        let valid=true;
        Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
        return valid;
    }

    componentDidMount=async()=>{
        client.get()
        .then(res=>{
            this.setState({empData:res.data})
        })
        .catch(err=>{
            console.log(err)
        }) } 

    addEmp=async(event)=>{
            event.preventDefault();

            if(this.validate(this.state.errors)&&(document.getElementById("ename").value!=='')&&(document.getElementById("age").value!=='')&&(document.getElementById("city").value!=='')&&(document.getElementById("gender").value!=='')&&(document.getElementById("salary").value!==''))
            {
                
                console.log(this.state)
                var enames = this.state.enames;
                 enames.push(this.state.ename);
                 var ages = this.state.ages;
                 ages.push(this.state.age);
                 var cities = this.state.cities;
                 cities.push(this.state.city)
                 var genders = this.state.genders;
                 genders.push(this.state.gender);
                 var salaries = this.state.salaries;
                 salaries.push(this.state.salary)
                

                 this.setState({
                 enames: enames,
                 ename: "", 
                 ages: ages,
                 age:"",
                 genders:genders,
                 gender:"",
                 cities:cities,
                 city:"",
                 salaries:salaries,
                 salary:"",
                 
                 success:'Application form submitted'
 
                 
                 });

                 let formData={"ename":this.state.ename,"age":this.state.age,"city":this.state.city,"gender":this.state.gender,"salary":this.state.salary}
                 client.post("/",formData)
                 .then(res=>{
                      client.get()
                     .then(res=>{
                         this.setState({empData:res.data})
                         alert("Employee Data Added")
                         })
                     })
                     document.getElementById('myForm').reset();

                 // document.getElementById("myForm").reset();
            }
            else {
                alert("Please Enter Valid Data");
            }

           

            }
    render() {
        const {errors}=this.state;
        return (
            <div>
                <form className="container" id="myForm" >
            <div class="form-group" >
                <label for="ename"><b>Name</b></label>
                <input type="text" class="form-control" id="ename"  name="ename" placeholder="Enter Name" onChange={this.handler.bind(this)}/>
                {errors.ename.length>0 && 
                    <small className="form-text"  style={{color:'red'}}>{errors.ename}</small>}
            </div>
           
                    
            <div class="form-group">
                <label for="age"><b>Age</b></label>
                <input type="number" class="form-control" id="age" name="age"  placeholder="Enter Age" onChange={this.handler.bind(this)}/>
                {errors.age.length>0 && 
                    <small className="form-text"  style={{color:'red'}}>{errors.age}</small>}
            </div>
            <div class="form-group" >
                <label for="city"><b>City</b></label>
                <input type="text" class="form-control" id="city"  name="city" placeholder="Enter City" onChange={this.handler.bind(this)}/>
                {errors.city.length>0 && 
                    <small className="form-text"  style={{color:'red'}}>{errors.city}</small>}
            </div>
            <div class="form-group">
                <label for="gender"><b>Gender</b></label>
                <input type="text" class="form-control" id="gender"  name="gender" placeholder="Enter Gender" onChange={this.handler.bind(this)}/>
                {errors.gender.length>0 && 
                    <small className="form-text"  style={{color:'red'}}>{errors.gender}</small>}
            </div>
            <div class="form-group">
                <label for="salary"><b>Salary</b></label>
                <input type="number" class="form-control" id="salary" name="salary"  placeholder="Enter Salary" onChange={this.handler.bind(this)}/>
                {errors.salary.length>0 && 
                    <small className="form-text"  style={{color:'red'}}>{errors.salary}</small>}
            </div>
           
            <div>
                {errors.success.length>0 && 
                <div className="alert alert-success" role="alert">{errors.success}</div>}<br/>
                    </div>
            <button type="submit" name="submit" class="btn btn-primary" onClick={this.addEmp}>Submit</button>
           
            </form>
            </div>
        )
    }
}

export default Add
