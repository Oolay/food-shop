import React from "react";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import withStyles from "react-jss";
import "antd/dist/antd.css";

import foodShopLogo from "../foodShopLogo2.png";
const { Header } = Layout;

const styles = {
    logo: {
        height: "50px",
        width: "50px",
        float: "left",
        margin: "8px",
        marginRight: "36px"
    }
};

class NavBar extends React.Component<{
    classes: any;
    handleMenuClick(view: "shoppingList" | "recipeBook" | "pantry"): () => void;
}> {
    render() {
        const { classes } = this.props;

        return (
            <Layout>
                <Header>
                    <img className={classes.logo} src={foodShopLogo} />
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
            </Layout>
        );
    }
}

export default withStyles(styles)(NavBar);
