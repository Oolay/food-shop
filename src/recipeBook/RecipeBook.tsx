import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";

type Recipe = {
    id: number;
    name: string;
    serves: number;
    ingredients: number[];
};

const recipeDataURL = "http://localhost:3000/recipes";

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
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Serves",
                dataIndex: "serves",
                key: "serves"
            },
            {
                title: "Ingredients",
                dataIndex: "ingredients",
                key: "ingredients",
                render: (text: string, record: Recipe) => {
                    return <Button>{`${record.name}'s  ingredients`}</Button>;
                }
            },
            {
                title: "Cost",
                dataIndex: "cost",
                key: "cost"
            },
            {
                title: "Savings",
                dataIndex: "savings",
                key: "savings"
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action"
            }
        ];
    }

    public fetchTableData = async (url: string) => {
        const recipeDataResponse = await fetch(url);
        const recipeData = await recipeDataResponse.json();
        const tableData = recipeData.map((recipe: Recipe) => {
            return { ...recipe, key: recipe.id };
        });

        return tableData;
    };

    public async componentDidMount() {
        const tableData = await this.fetchTableData(recipeDataURL);

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
