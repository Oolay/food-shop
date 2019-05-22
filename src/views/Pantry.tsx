import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";
import AddItemForm from "../components/AddItemForm";
import Input from "antd/lib/input";

type Item = {
    id: number;
    name: string;
    size: number;
    measure: string;
    count?: number;
    cost?: number;
    recipes?: number[];
};

const itemDataURL = "http://localhost:3000/items";

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
                title: "Measure",
                dataIndex: "measure",
                key: "measure"
            },
            {
                title: "Stock",
                dataIndex: "count",
                key: "count"
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

    public fetchTableData = async (url: string) => {
        const itemDataResponse = await fetch(url);
        const itemData = await itemDataResponse.json();
        const tableData = itemData.map((item: Item) => {
            if (item.measure === "whole") {
                item.measure = item.name.toLowerCase() + "s";
            }
            return { ...item, key: item.id };
        });

        this.setState({
            tableData
        });
    };

    public postItemData = async (url: string, data: Item) => {
        await fetch(url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    public async componentDidMount() {
        await this.fetchTableData(itemDataURL);
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

    public handleFormAddItem = async () => {
        this.setState({
            loading: true
        });
        if (this.formRef) {
            const form: any = this.formRef.props.form;
            form.validateFields(async (err: {}, item: Item) => {
                if (err) {
                    return;
                }
                await this.postItemData(itemDataURL, item);
                await this.fetchTableData(itemDataURL);
                form.resetFields();
                this.setState({
                    loading: false,
                    formVisible: false
                });
            });
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
