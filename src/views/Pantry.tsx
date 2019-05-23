import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import AddItemForm from "../components/AddItemForm";
import Input from "antd/lib/input";

type Item = {
    id?: number;
    name: string;
    size: number;
    unit: string;
};

type PantryItem = {
    id?: number;
    itemId: number;
    stock: number;
};

type ItemFormData = {
    name: string;
    size: number;
    unit: string;
    count: number;
};

type PantryDataUrl = "http://localhost:3000/pantry";
type ItemDataUrl = "http://localhost:3000/items";

const pantryDataUrl: PantryDataUrl = "http://localhost:3000/pantry";
const itemDataUrl: ItemDataUrl = "http://localhost:3000/items";

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
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Size",
                dataIndex: "size",
                key: "size"
            },
            {
                title: "Unit",
                dataIndex: "unit",
                key: "unit"
            },
            {
                title: "Stock",
                dataIndex: "stock",
                key: "stock"
            },
            {
                title: "Recipes",
                dataIndex: "recipes",
                key: "recipes",
                render: (text: string, record: Item) => {
                    return <Button>{`recipes with ${record.name}`}</Button>;
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
        const itemDataResponse = await fetch(itemDataUrl);
        const itemData = await itemDataResponse.json();
        const pantryDataResponse = await fetch(pantryDataUrl);
        const pantryData = await pantryDataResponse.json();

        const tableData = pantryData.map((pantryItem: PantryItem) => {
            const item = itemData.find(
                (item: Item) => pantryItem.itemId === item.id
            );

            if (item.unit === "whole") {
                if (item.name.slice(-1) === "s") {
                    item.unit = item.name.toLowerCase();
                } else {
                    item.unit = item.name.toLowerCase() + "s";
                }
            }
            return { ...item, key: item.id, stock: pantryItem.stock };
        });

        this.setState({
            tableData
        });
    };

    public postItemData = async (
        url: ItemDataUrl | PantryDataUrl,
        data: Item | PantryItem
    ) => {
        await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    public async componentDidMount() {
        await this.fetchTableData();
        this.setState({
            loading: false
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

    public checkMatch = (newItem: Item) => {
        const matchedItem: Item | undefined = this.state.tableData.find(
            (item: Item) =>
                newItem.name === item.name && newItem.size === item.size
        );

        return { match: matchedItem ? true : false, item: matchedItem };
    };

    public fetchItemId = async (itemFormData: ItemFormData) => {
        const itemDataResponse = await fetch(itemDataUrl);
        const itemData = await itemDataResponse.json();

        const item = itemData.find(
            (item: Item) =>
                itemFormData.name === item.name &&
                itemFormData.size === item.size
        );

        return item.id;
    };

    public handleFormAddItem = async () => {
        this.setState({
            loading: true
        });
        if (this.formRef) {
            const form: any = this.formRef.props.form;
            form.validateFields(
                async (err: {}, newItemFromForm: ItemFormData) => {
                    if (err) {
                        return;
                    }
                    const newItemData = {
                        name: newItemFromForm.name,
                        size: newItemFromForm.size,
                        unit: newItemFromForm.unit
                    };

                    await this.postItemData(itemDataUrl, newItemData);
                    const newItemId = await this.fetchItemId(newItemFromForm);
                    const newPantyItem = {
                        itemId: newItemId,
                        stock: newItemFromForm.count
                    };
                    await this.postItemData(pantryDataUrl, newPantyItem);

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
