import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import {
  fetchMealAccount,
  postMealAccount,
  postMeal,
  deleteMeals,
  fetchMealsByUser,
  addToken,
  deleteUser,
  fetchMealPlansByUserId,
  postMealPlan,
  deleteMealPlan,
  fetchMealByMealId,
  updateMeal,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actions } from "react-redux-form";
import Header from "../Header/Header";
import Search from "../Search/Search";
import AddRecipe from "../AddRecipe/AddRecipe";
import Favorites from "../Favorites/Favorites";
import CalendarBuild from "../Calendar/Calendar";
import Pantry from "../Pantry/Pantry";
import GroceryList from "../GroceryList/GroceryList";
import Footer from "../Footer/Footer";
import Recipes from "../Recipes/Recipes";
import IndividualRecipe from "../Recipes/IndividualRecipe";
import ReturnToLoginComponent from "../ReturnToMain/ReturnToLoginComponent";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    meal: state.meal,
    mealAccount: state.mealAccount,
    mealPlan: state.mealPlan
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },

  fetchMealsByUser: (id) => {
    dispatch(fetchMealsByUser(id));
  },

  deleteMeals: (id) => {
    dispatch(deleteMeals(id));
  },
  postMeal: (
    mealName,
    categoryId,
    timeOfDayId,
    description,
    recipe,
    ingredients,
    userId
  ) =>
    dispatch(
      postMeal(
        mealName,
        categoryId,
        timeOfDayId,
        description,
        recipe,
        ingredients,
        userId
      )
    ),
  updateMeal: (
    id,
    mealName,
    categoryId,
    timeOfDayId,
    description,
    recipe,
    ingredients
  ) => {
    dispatch(
      updateMeal(
        id,
        mealName,
        categoryId,
        timeOfDayId,
        description,
        recipe,
        ingredients
      )
    );
  },

  fetchMealPlansByUserId: (id) => {
    dispatch(fetchMealPlansByUserId(id));
  },
  fetchMealByMealId: (id) => {
    dispatch(fetchMealByMealId(id));
  },

  postMealPlan: (mealId, dayOfWeek) =>
    dispatch(postMealPlan(mealId, dayOfWeek)),

  deleteMealPlan: (id) => dispatch(deleteMealPlan(id)),

  // MEAL ACCOUNTS
  fetchMealAccount: () => {
    dispatch(fetchMealAccount());
  },
  postMealAccount: (mealId, userId) =>
    dispatch(postMealAccount(mealId, userId)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.addToken("");
    this.props.deleteUser();
    localStorage.removeItem("token");
  };

  handleDeleteMeals = (id) => {
    this.props.deleteMeals(parseInt(id));
  };

  componentDidMount() {
    this.props.fetchMealAccount();
    this.props.fetchMealsByUser(this.props.user.id);
    this.props.fetchMealPlansByUserId(this.props.user.id);
  }

  render() {
    return (
      <div className="App">
        <Header
          userId={this.props.user.id}
          fetchMealsByUser={this.props.fetchMealsByUser}
          handleLogout={this.handleLogout}
          fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
          mealPlan={this.props.mealPlan}
        />

        {this.props.token.token !== undefined ? (
          <div classname="navigator">
            <Link to="/home">Home | </Link>
            <Link to="/login" onClick={this.handleLogout}>
              logout
            </Link>
          </div>
        ) : (
          <Link to="/login">Home | </Link>
        )}

        <Switch>
          <Route path="/login" component={() => 
          <Login 
          fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
          userId={this.props.user}
          />} />
          <Route path="/register" component={() => <Register />} />
          <Route
            path="/home"
            onClick={()=>{
              this.props.fetchMealPlansByUserId(this.props.user.id)
            }}
            component={
              this.props.token.token !== undefined
                ? () => 
                <Home 
                meal={this.props.meal} 
                user={this.props.user} 
                fetchMealsByUser={this.props.fetchMealsByUser}
                fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                />
                : () => <ReturnToLoginComponent />
            }
          />

          <Route
            path="/search"
            component={
              this.props.token.token !== undefined
                ? () => <Search />
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/add-recipe"
            component={
              localStorage.getItem("token") != undefined
                ? () => (
                    <AddRecipe
                      user={this.props.user}
                      fetchMealsByUser={this.props.fetchMealsByUser}
                      postMeal={this.props.postMeal}
                      postMealPlan={this.props.postMealPlan}
                      userId={this.props.user.id}
                    />
                  )
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/recipes"
            component={
              localStorage.getItem("token") != undefined
                ? () => (
                    <Recipes
                      postMealPlan={this.props.postMealPlan}
                      user={this.props.user}
                      fetchMealsByUser={this.props.fetchMealsByUser}
                      meal={this.props.meal}
                      deleteMeals={this.props.deleteMeals}
                    />
                  )
                : () => <ReturnToLoginComponent />
            }
          />

          <Route
            onClick={() => {
              // this.props.fetchMealsByUser(this.props.user.id)
            }}
            path="/recipe/:id"
            component={
              localStorage.getItem("token") != undefined
                ? () => (
                    <IndividualRecipe
                      fetchMealByMealId={this.props.fetchMealByMealId}
                      meal={this.props.meal.meal}
                      postMealPlan={this.props.postMealPlan}
                      deleteMealPlan={this.props.deleteMealPlan}
                      deleteMeals={this.props.deleteMeals}
                      fetchMealsByUser={this.props.fetchMealsByUser}
                      userId={this.props.user.id}
                      updateMeal={this.props.updateMeal}
                    />
                  )
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/favorites"
            component={
              this.props.token.token !== undefined
                ? () => <Favorites />
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/calendar"
            component={
              this.props.token.token !== undefined
                ? () => <CalendarBuild />
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/grocery-list"
            component={
              this.props.token.token !== undefined
                ? () => <GroceryList />
                : () => <ReturnToLoginComponent />
            }
          />
          <Route
            path="/pantry"
            component={
              this.props.token.token !== undefined
                ? () => <Pantry />
                : () => <ReturnToLoginComponent />
            }
          />

          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
