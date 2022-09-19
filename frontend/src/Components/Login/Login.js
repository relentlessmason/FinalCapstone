import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMealsByUser, fetchMealPlansByUserId, addToken, addUser } from "../../Redux/actionCreators";
import { baseUrl } from "../../Shared/baseUrl";
import axios from "axios";
import "./Login.css";

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
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler = (event) => {
    event.preventDefault(); 
    this.handleLogin();
  }

  handleLogin = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const userWithToken = await axios.post(baseUrl + "/login", data);
    const userToken = userWithToken.data.token;

    localStorage.setItem("token", userToken);

    axios.defaults.headers.common["Authorization"] = userToken;

    await this.props.dispatch(addToken(userToken));
    await this.props.dispatch(addUser(userWithToken.data.user));
    await this.props.dispatch(fetchMealsByUser(userWithToken.data.user.id));
    await this.props.dispatch(fetchMealPlansByUserId(userWithToken.data.user.id));

    this.props.history.push('/home');


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
        <form onSubmit={(e)=> {
          this.submitHandler(e)
        }}> 

        <h1 className="login_header">Please Sign In</h1>
        <div className="spacer"></div>
        <label className="sr-only login_username_label">
          username
        </label>
        <input
          className="login_username"
          type="text"
          id="username"
          name="username"
          class="form-control"
          placeholder="username"
          v-model="user.username"
          onChange={this.handleInputChange}
          required
        />
        <div className="spacer"></div>
        <label className="sr-only login_password_label">
          password
        </label>
        <input
          className="login_password form-control"
          type="password"
          id="password"
          name="password"
          placeholder="password"
          v-model="user.password"
          onChange={this.handleInputChange}
          required
        />
        <div className="spacer"></div>
        <Link to="/register" className="login_signup">
          need an account?
        </Link>
        <button type="submit" className="submit" >
          Sign In
        </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Login));
