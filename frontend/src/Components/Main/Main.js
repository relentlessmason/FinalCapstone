import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import {fetchMealAccount, postMealAccount, postMeal, deleteMeals, fetchMeals, addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {actions} from 'react-redux-form';
import TEST from '../TEST'
import Header from '../Header/Header'
import Search from '../Search/Search'
import AddRecipe from '../AddRecipe/AddRecipe'
import Favorites from '../Favorites/Favorites'
import Calendar from '../Calendar/Calendar'
import Pantry from '../Pantry/Pantry'
import GroceryList from '../GroceryList/GroceryList'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        meal: state.meal,
        mealAccount: state.mealAccount
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())},

    // MEALS
    fetchMeals: ()=>{dispatch(fetchMeals())},
    deleteMeals: ()=> {dispatch(deleteMeals())},
    postMeal: ()=> (mealName, categoryId, timeOfDayId, description, recipe, ingredients) =>dispatch(postMeal(mealName, categoryId, timeOfDayId, description, recipe, ingredients)),

    // MEAL ACCOUNTS
    fetchMealAccount: ()=>{dispatch(fetchMealAccount())},
    postMealAccount: (mealId, userId) => dispatch(postMealAccount(mealId, userId)),
    
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
        
        this.props.fetchMeals(this.props.token.token);
        this.props.fetchMealAccount();
    }

    

  

    render(){

        // const authAxios = axios.create({
        //     baseUrl: baseUrl,
        //     headers:{
        //         Authorization : `Bearer ${this.props.token.token}`
        //     }
        //     })

        return(
            <div className='container'>
               
               
                {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Link to='/test' 
                            >| test</Link> 
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
                    user={this.props.user}
                    /> : null}/>

                    <Route path='/search' component={() => <Search />}/>
                    <Route path='/add-recipe' component={() => <AddRecipe />}/>
                    <Route path='/favorites' component={() => <Favorites />}/>
                    <Route path='/calendar' component={() => <Calendar />}/>
                    <Route path='/grocery-list' component={() => <GroceryList />}/>
                    <Route path='/pantry' component={() => <Pantry />}/>

                    {/* TEST PATH  */}
                    <Route path='/test' component={() => 
                    <TEST
                    meal={this.props.meal}
                    postMeal={this.props.postMeal}
                    fetchMeals={this.props.fetchMeals}
                    deleteMeal={this.props.deleteMeal}
                    handleDeleteMeals={this.handleDeleteMeals}

                    token={this.props.token.token}
                    user={this.props.user}
                    fetchMealAccount={this.props.fetchMealAccount}
                    postMealAccount={this.props.postMealAccount}
                    />}/>

     
     </Switch>
     
     </div>
        )
        
    }
    
} 



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));