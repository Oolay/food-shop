import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";

type ItemList = {
    id: string;
    date: string;
    items: { id: number; count: number }[];
};

interface State {
    tableData: ItemList[];
    loading: boolean;
}

class ShoppingList extends React.Component<{}, State> {
    private columns: TableProps<ItemList>["columns"];
    constructor(props: {}) {
        super(props);
        this.state = {
            tableData: [],
            loading: true
        };

        this.columns = [
            {
                title: "Date",
                dataIndex: "date",
                key: "date"
            },
            {
                title: "Items",
                dataIndex: "items",
                key: "items",
                render: (text: string, record: ItemList) => {
                    return <Button>{`view items`}</Button>;
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

    async componentDidMount() {
        this.setState({
            loading: false
        });
    }

    getTableDisplay = () => {
        if (!this.state.loading) {
            return (
                <React.Fragment>
                    <Button>Add shopping list</Button>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.tableData}
                    />
                    ;
                </React.Fragment>
            );
        }

        return <Spin size="large" />;
    };
    render() {
        return this.getTableDisplay();
    }
}

export default ShoppingList;
