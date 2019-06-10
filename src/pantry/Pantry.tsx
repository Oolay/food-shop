import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import AddItemForm from "../components/AddItemForm";
import Input from "antd/lib/input";
import tableUtils from "../utils/table.utils";

const pantryUrl = "http://localhost:3003/pantry";

const pantryTableUtils = tableUtils(pantryUrl);

type ItemRow = {
    itemId: number;
    itemName: string;
    itemSize: number;
    itemUnit: string;
    pantryCount: number;
};

type PantryItemFromForm = {
    name: string;
    size: number;
    unit: string;
    count: number;
};

interface State {
    tableData: ItemRow[];
    loading: boolean;
    formVisible: boolean;
}

class Pantry extends React.Component<{}, State> {
    private columns: TableProps<ItemRow>["columns"];
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
                dataIndex: "pantryCount",
                key: "pantryCount"
            },
            {
                title: "Recipes",
                dataIndex: "recipes",
                key: "recipes",
                render: (text: string, entry: ItemRow) => {
                    return <Button>{`recipes with ${entry.itemName}`}</Button>;
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                render: (text: string, entry: ItemRow) => {
                    return (
                        <a onClick={this.handleDeleteClick(entry)}>Remove</a>
                    );
                }
            }
        ];
    }

    public async componentDidMount() {
        const tableData = await pantryTableUtils.fetchTableData();
        this.setState({
            loading: false,
            tableData
        });
    }

    public handleDeleteClick = (entry: ItemRow) => async () => {
        await pantryTableUtils.deleteTableEntry(entry)();
        const tableData = await pantryTableUtils.fetchTableData();

        this.setState({
            tableData
        });
    };

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

                    await pantryTableUtils.postTableEntry(newPantryItem);

                    const tableData = await pantryTableUtils.fetchTableData();

                    form.resetFields();

                    this.setState({
                        loading: false,
                        formVisible: false,
                        tableData
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
