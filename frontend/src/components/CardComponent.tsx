import { Card, Col, Flex, Image } from "antd";
import { Link } from "react-router-dom";
import { ICardComponentProps } from "../types/card";

export const CardComponent = <T extends unknown>({
    data,
    linkPath,
    title,
    image,
}: ICardComponentProps<T>) => {
    return (
        <Col>
            <Link to={linkPath(data)}>
                <Card title={<div style={{ textAlign: "center" }}>{title(data)}</div>} hoverable style={{ backgroundColor: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 8 }}>
                    <Flex vertical justify="center">
                        <Image
                            src={image(data)}
                            alt="Kinofilm Poster"
                            preview={false}
                            style={{ objectFit: "cover", height: 300 }}
                        />
                    </Flex>
                </Card>
            </Link>
        </Col>
    );
};