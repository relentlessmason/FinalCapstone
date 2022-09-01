import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {postMeal, deleteMeals, fetchMeals, addToken, deleteUser} from '../../Redux/actionCreators'
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

    // MEALS
    fetchMeals: ()=>{dispatch(fetchMeals())},
    deleteMeals: ()=> {dispatch(deleteMeals())},
    postMeal: (mealName, categoryId, timeOfDayId, description, recipe, ingredients) =>dispatch(postMeal(mealName, categoryId, timeOfDayId, description, recipe, ingredients))

    
    
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    handleDeleteMeals=(id)=>{
        this.props.deleteMeals(parseInt(id))
    }

    

    componentDidMount(){
        this.props.fetchMeals();
    }

  

    render(){
        return(
            <div className='container_x'>

                <div className='header_container'>
                    <h1 className='header_title'>meal please!</h1>
                {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>

                        </div>  
                    : 
                        <Link to='/login'>Home | </Link>
                }
                    
                </div>
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
                    fetchMeals={this.props.fetchMeals}
                    deleteMeal={this.props.deleteMeal}
                    handleDeleteMeals={this.handleDeleteMeals}
                    />}/>

                    
                    <Redirect to='/login'/>
                    

                </Switch>
            </div>
        )
        
    }
    
} 



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));