import React, { useState, useEffect } from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import tableApiMethods from "../api/tableApi";
import AddRecipeForm from "../components/AddRecipeForm";

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

const RecipeBook = (props: {}) => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const tableData = await recipeBookTableMethods.fetchTableData();
            setTableData(tableData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const columns: TableProps<Recipe>["columns"] = [
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
                return <Button>{`${record.recipeName}'s  ingredients`}</Button>;
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action"
        }
    ];

    const getTableDisplay = () => {
        if (!loading) {
            return (
                <React.Fragment>
                    <Table columns={columns} dataSource={tableData} />
                </React.Fragment>
            );
        }

        return <Spin size="large" />;
    };

    return (
        <React.Fragment>
            <AddRecipeForm />
            {getTableDisplay()}
        </React.Fragment>
    );
};

export default RecipeBook;
