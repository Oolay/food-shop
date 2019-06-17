import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import InputNumber from "antd/lib/input-number";
import AddItemForm from "../components/AddItemForm";
import Input from "antd/lib/input";
import tableApiMethods from "../api/tableApi";

const pantryTableMethods = tableApiMethods("pantry");

type ItemRow = {
    primeId: number;
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
    sizeDisabled: boolean;
}

class Pantry extends React.Component<{}, State> {
    private columns: TableProps<ItemRow>["columns"];
    private formRef: Input | undefined | null;
    constructor(props: {}) {
        super(props);
        this.state = {
            tableData: [],
            loading: true,
            formVisible: false,
            sizeDisabled: false
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
                key: "pantryCount",
                render: (text: string, entry: ItemRow) => {
                    return (
                        <InputNumber
                            size="small"
                            value={entry.pantryCount}
                            onChange={this.handleStockChange(
                                entry.primeId,
                                entry
                            )}
                        />
                    );
                }
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
        const tableData = await pantryTableMethods.fetchTableData();
        this.setState({
            loading: false,
            tableData
        });
    }

    public handleDeleteClick = (entry: ItemRow) => async () => {
        await pantryTableMethods.deleteTableEntry(entry)();
        const tableData = await pantryTableMethods.fetchTableData();

        this.setState({
            tableData
        });
    };

    public handleStockChange = (entryId: number, entry: ItemRow) => async (
        value: number | undefined
    ) => {
        if (value) {
            await pantryTableMethods.updateTableEntry(entryId, {
                ...entry,
                pantryCount: value
            })();
            const tableData = await pantryTableMethods.fetchTableData();

            this.setState({
                tableData
            });
        }
    };

    public handleAddItemClick = () => {
        this.setState({
            formVisible: true
        });
    };

    public handleFormCancel = () => {
        this.setState({
            formVisible: false,
            sizeDisabled: false
        });
    };

    public checkNoUnitSelect = (option: string) => {
        if (option === "-") {
            this.setState({
                sizeDisabled: true
            });
        } else {
            this.setState({
                sizeDisabled: false
            });
        }
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

                    await pantryTableMethods.createTableEntry(newPantryItem);

                    const tableData = await pantryTableMethods.fetchTableData();

                    form.resetFields();

                    this.setState({
                        loading: false,
                        sizeDisabled: false,
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
                    checkNoUnitSelect={this.checkNoUnitSelect}
                    sizeDisabled={this.state.sizeDisabled}
                />
            </React.Fragment>
        );
    }
}

export default Pantry;
