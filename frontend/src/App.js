import {useState} from "react";
import {Button, Form, Input} from "antd";

function App() {
    const [response, setResponse] = useState('')

    const onFinish = (values) => {
        fetch('http://localhost:8080/api', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(values)
        }).then(response => response.json()
            .then(json => setResponse(JSON.stringify(json))))
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 12,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Card Number"
                name="CardNumber"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Card Number!',
                    },
                    {
                        pattern: /^\d+$/,
                        message: "Value should contain just number",
                    },
                    {
                        pattern: /^[\d]{16}$/,
                        message: "Value must be 16 digits",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Expiration Date"
                name="ExpDate"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Expiration Date!',
                    },
                    {
                        pattern: /^[\d]{2}\/[\d]{4}$/,
                        message: "Value should be in format MM/YYYY",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="CVV"
                name="Cvv"
                rules={[
                    {
                        required: true,
                        message: 'Please input your CVV!',
                    },
                    {
                        pattern: /^\d+$/,
                        message: "Value should contain just number",
                    },
                    {
                        pattern: /^[\d]{3}$/,
                        message: "Value must be 3 digits",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Amount"
                name="Amount"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Amount!',
                    },
                    {
                        pattern: /^\d+$/,
                        message: "Value should contain just number",
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 6,
                    span: 12,
                }}
                shouldUpdate
            >
                {({getFieldsValue, getFieldsError}) => {
                    const errors = getFieldsError().filter(error => error.errors.length > 0)
                    const {CardNumber, ExpDate, Cvv, Amount} = getFieldsValue();
                    const formIsComplete = !!CardNumber && !!ExpDate && !!Cvv && !!Amount;
                    return (
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            disabled={!formIsComplete || errors.length > 0}
                        >
                            Send
                        </Button>
                    );
                }}
            </Form.Item>
            <Form.Item
                label="Response from server"
                name="response"
            >
                {response}
            </Form.Item>
        </Form>
    );
}

export default App;
