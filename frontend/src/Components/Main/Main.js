import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import {
  postMeal,
  deleteMeals,
  fetchMealsByUser,
  addToken,
  deleteUser,
  fetchMealPlansByUserId,
  postMealPlan,
  deleteMealPlan,
  updateMeal,
  updateMealPlan,
  fetchCategory,
  fetchTimeOfDay,
  fetchPantryByUser,
  postPantry,
  deleteFromPantry,
} from "../../Redux/actionCreators";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";
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
    mealPlan: state.mealPlan,
    category: state.category,
    tod: state.tod,
    pantry: state.pantry,
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

  postMealPlan: (mealId, dayOfWeek) =>
    dispatch(postMealPlan(mealId, dayOfWeek)),

  deleteMealPlan: (id) => dispatch(deleteMealPlan(id)),


  updateMealPlan: (mealPlan) => dispatch(updateMealPlan(mealPlan)),

  fetchCategory: () => {
    dispatch(fetchCategory());
  },
  fetchTimeOfDay: () => {
    dispatch(fetchTimeOfDay());
  },
  fetchPantryByUser: (id) =>{
    dispatch(fetchPantryByUser(id));
  },
  postPantry: (newPantryItem, id) =>{
    dispatch(postPantry(newPantryItem, id));
  },
  deleteFromPantry: (id) =>{
    dispatch(deleteFromPantry(id));
  },
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

  handlePostMeals = async (values, ingredients) => {
    
    await this.props.postMeal(
      values.mealName,
      values.categoryId,
      values.timeOfDayId,
      values.description,
      values.recipe,
      ingredients.toString().replaceAll(',',' '),
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
      id,
      mealName,
      categoryId,
      timeOfDayId,
      description,
      recipe,
      ingredients,
    };

    await this.props.updateMeal(id, newMeal);
    await this.props.fetchMealsByUser(this.props.user.id);
    await this.props.fetchMealPlansByUserId(this.props.user.id);
  };

  handlePostMealPlan = async (values, mealId) => {
    await this.props.postMealPlan(mealId, values.dayOfWeek);
    await this.props.fetchMealPlansByUserId(this.props.user.id);
  };

  handleUpdateMealPlans = async (newMeal) => {
    await this.props.updateMealPlan(newMeal);
    await this.props.fetchMealsByUser(this.props.user.id);
    await this.props.fetchMealPlansByUserId(this.props.user.id);
  };

  handleDeleteMealPlans = (id) => {
    this.props.deleteMealPlan(id);
  };

  handlePostPantry = async (newPantryItem) =>{
    console.log('newPantryItem', newPantryItem);
   await this.props.postPantry(newPantryItem,this.props.user.id);
   await this.props.fetchPantryByUser(this.props.user.id);
  }

  handleDeletePantry = async (id) =>{
    await this.props.deleteFromPantry(id);
  }

  componentDidMount() {
    this.props.fetchMealsByUser(this.props.user.id);
    this.props.fetchMealPlansByUserId(this.props.user.id);
    this.props.fetchCategory();
    this.props.fetchTimeOfDay();
    this.props.fetchPantryByUser(this.props.user.id);
  }

  render() {
    return (
      <div className="App">

        <Header
          userId={this.props.user.id}
          handleLogout={this.handleLogout}
          mealPlan={this.props.mealPlan}
        />

        {/* {this.props.token.token !== undefined ? (
          <div classname="navigator">
            <Link to="/home">Home | </Link>
            <Link to="/login" onClick={this.handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <Link to="/login">Home | </Link>
        )} */}

        <Switch>
          <Route
            path="/login"
            component={() => (
              <Login
                fetchPantryByUser={this.props.fetchPantryByUser}
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
                      category={this.props.category}
                      mealPlan={this.props.mealPlan}
                      meal={this.props.meal}
                      user={this.props.user}
                    />
                  )
                : () => <ReturnToLoginComponent />
            }
          />

          <Route
            path="/add-recipe"
            component={
              localStorage.getItem("token") != undefined
                ? () => (
                    <AddRecipe
                      category={this.props.category.category}
                      tod={this.props.tod.tod}
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
                      handlePostMealPlan={this.handlePostMealPlan}
                      fetchMealPlansByUserId={this.props.fetchMealPlansByUserId}
                      mealPlan={this.props.mealPlan.mealPlan}
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
                      category={this.props.category.category}
                      tod={this.props.tod.tod}
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
                ? () => <Pantry
                pantry={this.props.pantry.pantry}
                handlePostPantry={this.handlePostPantry}
                handleDeletePantry={this.handleDeletePantry}
                fetchPantryByUser={this.props.fetchPantryByUser}
                 />
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
