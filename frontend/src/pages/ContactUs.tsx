import { Button, Col, Flex, Form, Input, Row, Typography } from "antd";
import { IContactFormValues } from "../types/contactUs";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAxios } from "../data/useAxios";

const { Title, Paragraph } = Typography;

// Error handling utility
const handleError = (err: unknown): Error | string => {
    if (err instanceof Error) {
        return err;
    }
    return "An unknown error occurred.";
};

const extractErrorMessage = (err: Error | string | null): string => {
    return err instanceof Error ? err.message : err || "";
};

export const ContactUs: React.FC = () => {
    const axiosInstance = useAxios();
    const [form] = Form.useForm();

    const handleSubmit = async (values: IContactFormValues) => {
        try {
            const response = await axiosInstance.post("/new-message", values);
            if (response.status === 201) {
                toast.success("Nachricht erfolgreich gesendet", { autoClose: false });
                form.resetFields();
            }
        } catch (err: unknown) {
            const processedError = handleError(err);
            toast.error("Nachricht konnte nicht versickt werden, bitte überprüfen Sie Ihre eingaben!");
            console.error(extractErrorMessage(processedError));
        }
    }

    return (
        <Row style={{ width: "100%", padding: "2rem" }} justify="center">
            <ToastContainer />
            <Col xs={24} md={16} lg={12}>
                <Title level={1} style={{ textAlign: "center", marginBottom: "1rem" }}>
                    Kontaktieren Sie uns
                </Title>
                <Paragraph style={{ textAlign: "center", marginBottom: "2rem" }}>
                    Zögern Sie nicht, uns bei Fragen, Feedback oder Unterstützung zu kontaktieren. Wir freuen uns, von Ihnen zu hören!
                </Paragraph>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{ backgroundColor: "#f9f9f9", padding: "2rem", borderRadius: "8px" }}
                >
                    <Form.Item
                        label="Dein Name"
                        name="name"
                        rules={[{ required: true, message: "Bitte geben Sie Ihren Namen ein" }]}
                    >
                        <Input placeholder="John Doe" />
                    </Form.Item>

                    <Form.Item
                        label="E-Mail Adresse"
                        name="email"
                        rules={[
                            { required: true, message: "Bitte geben Sie Ihre E-Mail-Adresse ein" },
                            { type: "email", message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" },
                        ]}
                    >
                        <Input placeholder="john@doe.com" />
                    </Form.Item>

                    <Form.Item
                        label="Nachricht"
                        name="message"
                        rules={[{ required: true, message: "Bitte geben Sie Ihre Nachricht ein" }]}
                    >
                        <Input.TextArea rows={5} placeholder="Schreiben Sie hier Ihre Nachricht..." />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Nachricht senden
                        </Button>
                    </Form.Item>
                </Form>

                <Flex vertical style={{ marginTop: "2rem", textAlign: "center" }}>
                    <Title level={4}>Unsere Kontaktdaten</Title>
                    <Paragraph>
                        <strong>Adresse:</strong> 123 Filmstraße, Filmstadt, CA 90210
                    </Paragraph>
                    <Paragraph>
                        <strong>E-Mail:</strong> support@moviewebsite.com
                    </Paragraph>
                    <Paragraph>
                        <strong>Telefon:</strong> +1 (800) 555-1234
                    </Paragraph>
                </Flex>
            </Col>
        </Row>
    );
};