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
         <> <Switch>
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
         

     </Switch></>
        )
        
    }
    
} 



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));