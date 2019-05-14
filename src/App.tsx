import React from "react";
import styles from "./App.module.css";

import Pantry from "./views/Pantry";
import RecipeBook from "./views/RecipeBook";
import ShoppingList from "./views/ShoppingList";
import NavBar from "./components/NavBar";

class App extends React.Component<any, any> {
    state = {
        view: "shoppingList"
    };

    getView = () => {
        if (this.state.view === "pantry") {
            return <Pantry />;
        } else if (this.state.view === "recipeBook") {
            return <RecipeBook />;
        } else if (this.state.view === "shoppingList") return <ShoppingList />;
    };

    handleShoppingListClick = () => {
        this.setState({
            view: "shoppingList"
        });
    };

    handlePantryClick = () => {
        this.setState({
            view: "pantry"
        });
    };

    handleRecipeBookClick = () => {
        this.setState({
            view: "recipeBook"
        });
    };

    render() {
        return (
            <React.Fragment>
                <NavBar
                    handleShoppingListClick={this.handleShoppingListClick.bind(
                        this
                    )}
                    handlePantryClick={this.handlePantryClick.bind(this)}
                    handleRecipeBookClick={this.handleRecipeBookClick.bind(
                        this
                    )}
                />
                <div className={styles.viewContainer}>{this.getView()}</div>
            </React.Fragment>
        );
    }
}

export default App;
