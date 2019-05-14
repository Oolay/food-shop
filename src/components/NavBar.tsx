import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";

import styles from "./styles/NavBar.module.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class NavBar extends React.Component<any, any> {
    render() {
        return (
            <Layout>
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["shoppingList"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item
                            key="shoppingList"
                            onClick={this.props.handleShoppingListClick}
                        >
                            Shopping list
                        </Menu.Item>
                        <Menu.Item
                            key="recipeBook"
                            onClick={this.props.handleRecipeBookClick}
                        >
                            Recipe book
                        </Menu.Item>
                        <Menu.Item
                            key="pantry"
                            onClick={this.props.handlePantryClick}
                        >
                            Pantry
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
}

export default NavBar;
