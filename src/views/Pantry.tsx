import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import AddItemForm from "../components/AddItemForm";
import Input from "antd/lib/input";

const pantryDataUrl = "http://localhost:3003/pantry";

type Item = {
    itemId?: number;
    itemName: string;
    itemSize: number;
    itemUnit: string;
};

type PantryItem = {
    id?: number;
    itemId: number;
    itemStock: number;
};

type PantryItemFromForm = {
    name: string;
    size: number;
    unit: string;
    count: number;
};

interface State {
    tableData: Item[];
    loading: boolean;
    formVisible: boolean;
}

class Pantry extends React.Component<{}, State> {
    private columns: TableProps<Item>["columns"];
    private formRef: Input | undefined | null;
    constructor(props: {}) {
        super(props);
        this.state = {
            tableData: [],
            loading: true,
            formVisible: false
        };
        this.columns = [
            {
                title: "Name",
                dataIndex: "itemName",
                key: "itemName"
            },
            {
                title: "Size",
                dataIndex: "itemSize",
                key: "itemSize"
            },
            {
                title: "Unit",
                dataIndex: "itemUnit",
                key: "itemUnit"
            },
            {
                title: "Stock",
                dataIndex: "itemStock",
                key: "itemStock"
            },
            {
                title: "Recipes",
                dataIndex: "recipes",
                key: "recipes",
                render: (text: string, record: Item) => {
                    return <Button>{`recipes with ${record.itemName}`}</Button>;
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action"
            }
        ];
    }

    public fetchTableData = async () => {
        const pantryDataResponse = await fetch(pantryDataUrl);
        const pantryData = await pantryDataResponse.json();
        const tableData = pantryData.map((pantryItem: Item) => {
            if (pantryItem.itemUnit === "whole") {
                pantryItem.itemUnit = pantryItem.itemName + "s";
            }
            return { ...pantryItem, key: pantryItem.itemId };
        });
        return tableData;
    };

    public async componentDidMount() {
        const tableData = await this.fetchTableData();
        this.setState({
            loading: false,
            tableData
        });
    }

    public handleAddItemClick = () => {
        this.setState({
            formVisible: true
        });
    };

    public handleFormCancel = () => {
        this.setState({
            formVisible: false
        });
    };

    public handleFormAddItem = async () => {
        this.setState({
            loading: true
        });
        if (this.formRef) {
            const form: any = this.formRef.props.form;
            form.validateFields(
                async (err: {}, newPantryItemFromForm: PantryItemFromForm) => {
                    if (err) {
                        return;
                    }
                    const newPantryItem = {
                        itemName: newPantryItemFromForm.name,
                        itemSize: newPantryItemFromForm.size,
                        itemUnit: newPantryItemFromForm.unit,
                        pantryCount: newPantryItemFromForm.count
                    };

                    await fetch(pantryDataUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newPantryItem)
                    });
                    await this.fetchTableData();
                    form.resetFields();
                    this.setState({
                        loading: false,
                        formVisible: false
                    });
                }
            );
        }
    };

    public saveFormRef = (formRef: Input | null) => {
        this.formRef = formRef;
    };

    public getTableDisplay = () => {
        if (!this.state.loading) {
            return (
                <React.Fragment>
                    <Button onClick={this.handleAddItemClick}>Add item</Button>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.tableData}
                    />
                </React.Fragment>
            );
        }

        return <Spin size="large" />;
    };

    render() {
        return (
            <React.Fragment>
                {this.getTableDisplay()}
                <AddItemForm
                    visible={this.state.formVisible}
                    onCancel={this.handleFormCancel}
                    onAddItem={this.handleFormAddItem}
                    wrappedComponentRef={this.saveFormRef}
                />
            </React.Fragment>
        );
    }
}

export default Pantry;
