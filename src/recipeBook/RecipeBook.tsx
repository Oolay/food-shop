import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import tableApiMethods from "../api/tableApi";

const recipeBookTableMethods = tableApiMethods("recipeBook");

type Recipe = {
    id: number;
    recipeName: string;
    recipeServes: number;
    ingredients: number[];
};

interface State {
    tableData: Recipe[];
    loading: boolean;
}

class RecipeBook extends React.Component<{}, State> {
    private columns: TableProps<Recipe>["columns"];
    constructor(props: {}) {
        super(props);
        this.state = {
            tableData: [],
            loading: true
        };

        this.columns = [
            {
                title: "Name",
                dataIndex: "recipeName",
                key: "recipeName"
            },
            {
                title: "Serves",
                dataIndex: "recipeServes",
                key: "recipeServes"
            },
            {
                title: "Ingredients",
                dataIndex: "recipeIngredients",
                key: "recipeIngredients",
                render: (text: string, record: Recipe) => {
                    return (
                        <Button>{`${record.recipeName}'s  ingredients`}</Button>
                    );
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action"
            }
        ];
    }

    public async componentDidMount() {
        const tableData = await recipeBookTableMethods.fetchTableData();

        this.setState({
            tableData,
            loading: false
        });
    }

    public getTableDisplay = () => {
        if (!this.state.loading) {
            return (
                <Table
                    columns={this.columns}
                    dataSource={this.state.tableData}
                />
            );
        }

        return <Spin size="large" />;
    };

    public handleViewIngredientsClick = () => {
        console.log("ello");
    };

    render() {
        return (
            <React.Fragment>
                <Button>Add recipe</Button>
                {this.getTableDisplay()}
            </React.Fragment>
        );
    }
}

export default RecipeBook;
