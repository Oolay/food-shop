import React, { ReactElement } from "react";
import styles from "./App.module.css";

import Pantry from "./views/Pantry";
import RecipeBook from "./views/RecipeBook";
import ShoppingList from "./views/ShoppingList";
import NavBar from "./components/NavBar";
import { Layout } from "antd";

const { Content } = Layout;

interface State {
    view: "shoppingList" | "recipeBook" | "pantry";
}

class App extends React.Component<{}, State> {
    public state: State = {
        view: "shoppingList"
    };

    public handleMenuClick = (
        view: "shoppingList" | "recipeBook" | "pantry"
    ) => () => {
        this.setState({
            view
        });
    };

    public getContent = (view: string) => {
        if (view === "shoppingList") {
            return <ShoppingList />;
        } else if (view === "recipeBook") {
            return <RecipeBook />;
        } else if (view === "pantry") {
            return <Pantry />;
        }

        return null;
    };

    render() {
        return (
            <Layout>
                <NavBar handleMenuClick={this.handleMenuClick} />
                <Layout>
                    <Content>{this.getContent(this.state.view)}</Content>
                </Layout>
            </Layout>
        );
    }
}

export default App;
