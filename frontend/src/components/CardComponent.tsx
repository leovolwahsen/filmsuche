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
                <Card title={<div style={{ textAlign: "center" }}>{title(data)}</div>} hoverable>
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