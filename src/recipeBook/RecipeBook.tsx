import React, { useState, useEffect } from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import tableApiMethods, {
    ExistingTableEntry,
    ExistingRecipeEntry
} from "../api/tableApi";
import AddRecipeForm from "../components/AddRecipeForm";
import RecipeIngredientView from "../components/RecipeIngredientView";
import useEntryDetaillModal from "../hooks/useEntryDetailModal";

const recipeBookTableMethods = tableApiMethods("recipeBook");

export type Recipe = {
    primeId: number;
    recipeName: string;
    serves: number;
};

const RecipeBook = (props: {}) => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getRecipeIngredientDisplay = (
        entry: ExistingTableEntry
    ) => async () => {
        const recipeIngredients = await recipeBookTableMethods.viewEntryDetails(
            entry.primeId
        );
    };

    const {
        modalVisible,
        onShowModal,
        onCancel,
        modalTableData
    } = useEntryDetaillModal(getRecipeIngredientDisplay);

    const fetchRecipeTableData = () => {
        const fetchData = async () => {
            const tableData = await recipeBookTableMethods.fetchTableData();
            setTableData(tableData);
            setLoading(false);
        };
        fetchData();
    };
    useEffect(fetchRecipeTableData, []);

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
            render: (text: string, entry: ExistingRecipeEntry) => {
                return (
                    <Button onClick={onShowModal(entry)}>{`${
                        entry.recipeName
                    }'s  ingredients`}</Button>
                );
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
            <RecipeIngredientView
                visible={modalVisible}
                onCancel={onCancel}
                tableData={modalTableData}
            />
            ;
            <AddRecipeForm
                formInputCallback={recipeBookTableMethods.createTableEntry}
                fetchRecipeTableData={fetchRecipeTableData}
            />
            {getTableDisplay()}
        </React.Fragment>
    );
};

export default RecipeBook;
