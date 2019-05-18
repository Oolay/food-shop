import React from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import "antd/dist/antd.css";

const { Header } = Layout;

class NavBar extends React.Component<{
    handleMenuClick(view: "shoppingList" | "recipeBook" | "pantry"): () => void;
}> {
    render() {
        return (
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["shoppingList"]}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item
                        key="shoppingList"
                        onClick={this.props.handleMenuClick("shoppingList")}
                    >
                        Shopping lists
                    </Menu.Item>
                    <Menu.Item
                        key="recipeBook"
                        onClick={this.props.handleMenuClick("recipeBook")}
                    >
                        Recipe book
                    </Menu.Item>
                    <Menu.Item
                        key="pantry"
                        onClick={this.props.handleMenuClick("pantry")}
                    >
                        Pantry
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}

export default NavBar;
