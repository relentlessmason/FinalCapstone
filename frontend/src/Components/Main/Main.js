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
  updateMealPlan,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
  updateMeal: (id, newMeal) => {
    dispatch(updateMeal(id, newMeal));
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

  fetchMealAccount: () => {
    dispatch(fetchMealAccount());
  },
  postMealAccount: (mealId, userId) =>
    dispatch(postMealAccount(mealId, userId)),

  updateMealPlan: (mealPlan) => dispatch(updateMealPlan(mealPlan)),
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

  handleDeleteMealPlans = (id) => {
    this.props.deleteMealPlan(id);
  };

  handlePostMeals = async (values) => {
    await this.props.postMeal(
      values.mealName,
      values.categoryId,
      values.timeOfDayId,
      values.description,
      values.recipe,
      values.ingredients,
      this.props.user.id
    );
    await this.props.fetchMealsByUser(this.props.user.id);
  };

  handleUpdateMeals = async (
    id,
    mealName,
    categoryId,
    timeOfDayId,
    description,
    recipe,
    ingredients
  ) => {
    let newMeal = {
      mealName,
      categoryId,
      timeOfDayId,
      description,
      recipe,
      ingredients,
    };

    await this.props.updateMeal(id, newMeal);

    this.props.fetchMealsByUser(this.props.user.id);
  };

  handleUpdateMealPlans = async (newMeal) => {
    await this.props.updateMealPlan(newMeal);

    this.props.fetchMealPlansByUserId(this.props.user.id);
  };

  componentDidMount() {
    this.props.fetchMealsByUser(this.props.user.id);
    this.props.fetchMealPlansByUserId(this.props.user.id);
  }

  render() {
    return (
      <div className="App">
        <Header
          userId={this.props.user.id}
          handleLogout={this.handleLogout}
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
          <Route
            path="/login"
            component={() => (
              <Login
                fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                fetchMealsByUser={this.props.fetchMealsByUser}
                userId={this.props.user}
              />
            )}
          />
          <Route path="/register" component={() => <Register />} />
          <Route
            path="/home"
            component={
              this.props.token.token !== undefined
                ? () => (
                    <Home
                      handleUpdateMealPlans={this.handleUpdateMealPlans}
                      handleDeleteMealPlans={this.handleDeleteMealPlans}
                      mealPlan={this.props.mealPlan}
                      meal={this.props.meal}
                      user={this.props.user}
                    />
                  )
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
                      handlePostMeals={this.handlePostMeals}
                      fetchMealsByUser={this.props.fetchMealsByUser}
                      user={this.props.user}
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
                      fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                      mealPlan={this.props.mealPlan}
                      postMealPlan={this.props.postMealPlan}
                      user={this.props.user}
                      meal={this.props.meal.meal}
                      deleteMeals={this.props.deleteMeals}
                    />
                  )
                : () => <ReturnToLoginComponent />
            }
          />

          <Route
            path="/recipe/:id"
            component={
              localStorage.getItem("token") != undefined
                ? ({ match }) => (
                    <IndividualRecipe
                      fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                      handleDeleteMealPlans={this.handleDeleteMealPlans}
                      handleDeleteMeals={this.handleDeleteMeals}
                      mealPlan={this.props.mealPlan.mealPlan}
                      handleUpdateMeals={this.handleUpdateMeals}
                      onemeal={
                        this.props.meal.meal.filter(
                          (meal) => meal.id == parseInt(match.params.id, 10)
                        )[0]
                      }
                      meal={this.props.meal.meal}
                      postMealPlan={this.props.postMealPlan}
                      deleteMealPlan={this.props.deleteMealPlan}
                      deleteMeals={this.props.deleteMeals}
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
                ? () => (
                    <GroceryList
                      mealPlan={this.props.mealPlan}
                      meal={this.props.meal}
                    />
                  )
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
