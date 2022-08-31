import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {postMeal, fetchMeals, addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {actions} from 'react-redux-form';
import TEST from '../TEST'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        meal: state.meal
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},

    //IMPLEMENT ON BACKEND FIRST
    postMeal: (mealName, categoryId, timeOfDayId, description, recipe, ingredients) =>dispatch(postMeal(mealName, categoryId, timeOfDayId, description, recipe, ingredients)),

    fetchMeals: ()=>{dispatch(fetchMeals())}
    
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    componentDidMount(){
        this.props.fetchMeals();
    }

    render(){
        return(
            <div>
                {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>

                        </div>  
                    : 
                        <Link to='/login'>Home | </Link>
                }
                <Switch>
                    <Route path='/login' component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/home' component={this.props.token.token !== undefined ? () => 
                    <Home
                    meal={this.props.meal}
                    /> : null}/>

                    {/* TEST PATH  */}
                    <Route path='/test' component={() => 
                    <TEST
                    meal={this.props.meal}
                    postMeal={this.props.postMeal}
                    />}/>

                    
                    <Redirect to='/login'/>
                    

                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));