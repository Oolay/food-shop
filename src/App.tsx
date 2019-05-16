import React, { ReactElement } from "react";
import styles from "./App.module.css";

import Pantry from "./views/Pantry";
import RecipeBook from "./views/RecipeBook";
import ShoppingList from "./views/ShoppingList";
import NavBar from "./components/NavBar";
import { Layout } from "antd";

const { Content } = Layout;

class App extends React.Component<any, any> {
    state: any = {
        view: "shoppingList"
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

    getContent = (view: string): ReactElement | undefined => {
        if (view === "shoppingList") {
            return <ShoppingList />;
        } else if (view === "recipeBook") {
            return <RecipeBook />;
        } else if (view === "pantry") {
            return <Pantry />;
        }
    };

    render() {
        return (
            <Layout>
                <NavBar
                    handleShoppingListClick={this.handleShoppingListClick.bind(
                        this
                    )}
                    handlePantryClick={this.handlePantryClick.bind(this)}
                    handleRecipeBookClick={this.handleRecipeBookClick.bind(
                        this
                    )}
                />
                <Layout>
                    <Content>{this.getContent(this.state.view)}</Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
