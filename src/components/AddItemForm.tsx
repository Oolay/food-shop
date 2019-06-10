import React from "react";
import Modal from "antd/lib/modal";
import Form, { FormComponentProps } from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";

interface Props extends FormComponentProps {
    visible: boolean;
    onCancel: () => void;
    wrappedComponentRef: (name: Input | null) => void;
    onAddItem: () => void;
}

interface State {
    sizeDisabled: boolean;
}

class AddItemForm extends React.Component<Props, State> {
    state = {
        sizeDisabled: false
    };

    public checkNoUnitSelect = (option: string) => {
        if (option === "-") {
            this.setState({
                sizeDisabled: true
            });
        }
    };

    render() {
        const { visible, onCancel, onAddItem, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                title="Add item to Pantry"
                visible={visible}
                okText="Add item"
                onCancel={onCancel}
                onOk={onAddItem}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        {getFieldDecorator("name", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input the name of the item"
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="Units">
                        {getFieldDecorator("unit", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please imput the unit of the size"
                                }
                            ]
                        })(
                            <Select onChange={this.checkNoUnitSelect}>
                                <Select.Option value="g">g</Select.Option>
                                <Select.Option value="kg">kg</Select.Option>
                                <Select.Option value="ml">ml</Select.Option>
                                <Select.Option value="L">L</Select.Option>
                                <Select.Option value="-">None</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Size">
                        {getFieldDecorator("size", {
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input the size (fraction, weight or volume) of the item"
                                }
                            ]
                        })(
                            <InputNumber
                                min={0}
                                disabled={this.state.sizeDisabled}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label="Count">
                        {getFieldDecorator("count", {
                            rules: [
                                {
                                    required: true,
                                    message:
                                        "Please input the number of this item to be added"
                                }
                            ]
                        })(<InputNumber min={1} />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<Props>()(AddItemForm);
