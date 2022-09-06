import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMeals, addToken, addUser } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import './Login.css'


const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(addToken()),
  addUser: () => dispatch(addUser()),
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogin = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);
    const userToken = userWithToken.data.token

    localStorage.setItem('token', userToken)

    axios.defaults.headers.common['Authorization'] = userToken;
    
    console.log(userToken);

    this.props.dispatch(fetchMeals());

    await this.props.dispatch(addToken(userToken));
    await this.props.dispatch(addUser(userWithToken.data.user));

     

   
  };

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="login_entity">
        <h1 className="login_header">Please Sign In</h1>
        <div className='spacer'></div>
        <label class="sr-only" className="login_username_label">Username</label>
        <input className="login_username"
          type="text"
          id="username"
          name="username"
          class="form-control"
          placeholder="Username"
          v-model="user.username"
          onChange={this.handleInputChange}
          required
        />
        <div className='spacer'></div>
        <label class="sr-only" className="login_password_label">Password</label>
        <input className="login_password"
          type="password"
          id="password"
          name="password"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          onChange={this.handleInputChange}
          required
        />
        <div className='spacer'></div>
        <Link to="/register" className="login_signup">Need an account?</Link>
        <button type="submit" className="submit" onClick={this.handleLogin}>
          Sign in
        </button>
      </div>
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Login));
