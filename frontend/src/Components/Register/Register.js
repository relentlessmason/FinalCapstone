import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: ''
        }
        
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        if(this.state.password === this.state.confirmPassword){
            axios.post(baseUrl + "/register", data)
        }else{
            alert("Password and Confirm Password must match!!!")
        }
    }

    render(){
        return(
            <div className='register_entity'>
                <h1 className='register_header'>create account</h1>
                <div className='spacer'></div>
                <label class="sr-only">username</label>
                <input
                    className='register_input'
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder="username"
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                <div className='spacer'></div>
                <label class="sr-only">password</label>
                <input
                    className='register_input'
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder="password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                <div className='spacer'></div>
                <input
                    className='register_input'
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    class="form-control"
                    placeholder="confirm password"
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                <div className='spacer'></div>
                <Link to="/login">have an account?</Link>
                <button type="submit" onClick={this.handleSubmit} className="submit">Sign up</button>
            </div>
        )
    }
}

export default Register;