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
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actions } from "react-redux-form";
import TEST from "../TEST";
import Header from "../Header/Header";
import Search from "../Search/Search";
import AddRecipe from "../AddRecipe/AddRecipe";
import Favorites from "../Favorites/Favorites";
import Calendar from "../Calendar/Calendar";
import Pantry from "../Pantry/Pantry";
import GroceryList from "../GroceryList/GroceryList";
import Footer from "../Footer/Footer";
import Recipes from "../Recipes/Recipes";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    meal: state.meal,
    mealAccount: state.mealAccount,
    mealPlan: state.mealPlan,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => {
    dispatch(addToken());
  },
  deleteUser: () => {
    dispatch(deleteUser());
  },

  // MEALS
  // fetchMeals: () => {
  //   dispatch(fetchMeals());
  // },
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

  fetchMealPlansByUserId: (id) => {
    dispatch(fetchMealPlansByUserId(id));
  },

  postMealPlan: (mealId, dayOfWeek) =>
    dispatch(postMealPlan(mealId, dayOfWeek)),

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
    // this.props.fetchMeals();
    this.props.fetchMealAccount();
    this.props.fetchMealsByUser(this.props.user.id);
    this.props.fetchMealPlansByUserId(this.props.user.id);
  }

  render() {
    return (
      <div className="container">
        <Header
          userId={this.props.user.id}
          fetchMealsByUser={this.props.fetchMealsByUser}
          handleLogout={this.handleLogout}
          fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
        />

        {this.props.token.token !== undefined ? (
          <div classname="navigator">
            <Link to="/home">Home | </Link>
            <Link to="/login" onClick={this.handleLogout}>
              logout
            </Link>
            <Redirect to="/home" />
          </div>
        ) : (
          <Link to="/login">Home | </Link>
        )}

        <Switch>
          <Route path="/login" component={() => <Login />} />
          <Route path="/register" component={() => <Register />} />
          <Route
            path="/home"
            component={
              this.props.token.token !== undefined
                ? () => <Home meal={this.props.meal} user={this.props.user} />
                : null
            }
          />

          <Route path="/search" component={() => <Search />} />
          <Route
            path="/add-recipe"
            component={() => (
              <AddRecipe
                user={this.props.user}
                fetchMealsByUser={this.props.fetchMealsByUser}
                postMeal={this.props.postMeal}
                postMealPlan={this.props.postMealPlan}
              />
            )}
          />
          <Route
            path="/recipes"
            component={() => (
              <Recipes
                user={this.props.user}
                fetchMealsByUser={this.props.fetchMealsByUser}
                meal={this.props.meal}
                deleteMeals={this.props.deleteMeals}
              />
            )}
          />
          <Route path="/favorites" component={() => <Favorites />} />
          <Route path="/calendar" component={() => <Calendar />} />
          <Route path="/grocery-list" component={() => <GroceryList />} />
          <Route path="/pantry" component={() => <Pantry />} />

          {/* TEST PATH  */}
          <Route
            path="/test"
            component={() => (
              <TEST
                mealPlan={this.props.mealPlan}
                fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                postMealPlan={this.props.postMealPlan}
                meal={this.props.meal}
                postMeal={this.props.postMeal}
                fetchMealsByUser={this.props.fetchMealsByUser}
                deleteMeals={this.props.deleteMeals}
                handleDeleteMeals={this.handleDeleteMeals}
                token={this.props.token.token}
                user={this.props.user}
                fetchMealAccount={this.props.fetchMealAccount}
                postMealAccount={this.props.postMealAccount}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
