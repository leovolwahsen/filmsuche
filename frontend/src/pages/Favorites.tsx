import { Button, Flex, Form, Input, InputNumber, Typography } from "antd";
import { CardComponent } from "../components/CardComponent";
import { useFavorites } from "../data/useFavorites";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAxios } from "../data/useAxios";
import { IFavorites } from "../types/favorites";

const { Title } = Typography;

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

export const Favorites: React.FC = () => {
    const { favorites, isLoading } = useFavorites();
    const axiosInstance = useAxios();
    const [form] = Form.useForm();

    const handleSubmit = async (values: IFavorites) => {
        try {
            const response = await axiosInstance.post("/new-favorite", values);
            if (response.status === 201) {
                toast.success("Neuen Favoriten Film erfolgreich hinzugefügt", { autoClose: false });
                form.resetFields();
            }
        } catch (err: unknown) {
            const processedError = handleError(err);
            toast.error("Neuen Favoriten Film konnte nicht gespeichert werden, bitte überprüfen Sie Ihre eingaben!");
            console.error(extractErrorMessage(processedError));
        }
    }

    if (isLoading) return <div>Loading...</div>;

    return (
        <Flex vertical align="center" justify="center" style={{ width: "100%", padding: "2rem" }}>
            <ToastContainer />
            <Title level={2}>Favoriten</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{
                    maxWidth: 700,
                    width: "100%",
                    padding: "1rem 3rem",
                    border: "1px solid #e0e0e0",
                    borderRadius: 8,
                    margin: "2rem 0",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Title level={5}>Hier könnnen Sie weitere Filme hinzufügen</Title>
                <Form.Item
                    label="Filmname"
                    name="name"
                    rules={[{ required: true, message: "Bitte geben Sie den Namen des Film an" }]}
                >
                    <Input placeholder="The Glatiator" />
                </Form.Item>

                <Form.Item
                    label="Bild"
                    name="bild"
                    rules={[{ required: true, message: "Bitte geben Sie eine URL für das Bild ein" }]}
                >
                    <Input placeholder="https://bespiel.com/bild.jpg" />
                </Form.Item>

                <Form.Item
                    label="Bewertung"
                    name="bewertung"
                    rules={[
                        {
                            required: true,
                            message: 'Bitte bewerten Sie den Film auf einer Skala von 0 bis 10, wobei 10 "sehr zufrieden" bedeutet.'
                        },
                        {
                            pattern: /^\d+(\.\d+)?$/,
                            message: "Bitte geben Sie eine valide Zahl an (z.B., 1 oder 1.5)",
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Geben Sie eine Zahl ein (z.B., 1 oder 1.5)"
                        min={0}
                        max={10}
                        step={0.1}
                        style={{ width: '100%' }}
                    />
                </Form.Item>


                <Form.Item
                    label="Beschreibung"
                    name="beschreibung"
                    rules={[{ required: true, message: "Bitte geben Sie eine Beschreibung des Film's an" }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Trailer"
                    name="trailer"
                    rules={[{ required: true, message: "Bitte geben Sie den trailer Link des Film's an" }]}
                >
                    <Input placeholder="https://www.youtube-nocookie.com/embed/8vvYFwO0VQQ" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Neuen Film speichern
                    </Button>
                </Form.Item>
            </Form>
            <Flex wrap="wrap" justify="center" gap={50}>
                {favorites.map((favorite) => (
                    <CardComponent
                        key={favorite._id}
                        data={favorite}
                        linkPath={(favorite) => `/favorites/${favorite.name}`}
                        title={(favorite) => favorite.name}
                        image={(favorite) => favorite.bild}
                    />
                ))}
            </Flex>
        </Flex>
    );
};