import { useEffect, useState, CSSProperties } from "react";
import { useAxios } from "../data/useAxios";
import { useParams } from "react-router-dom";
import { Col, Divider, Row, Typography, Image, Rate, Grid } from "antd";
import { IDetail, MovieComponentProps } from "../types/detail";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export const MovieComponent = <T extends IDetail>({
    fetchEndpoint,
    entityName,
    dataMapper,
}: MovieComponentProps<T>) => {
    const axiosInstance = useAxios();
    const { name } = useParams(); 
    const screens = useBreakpoint();
    const [entities, setEntities] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get(fetchEndpoint)
            .then((res) => setEntities(dataMapper ? dataMapper(res.data) : res.data))
            .catch((error) => console.error(`Error fetching ${entityName}:`, error))
            .finally(() => setIsLoading(false));
    }, [axiosInstance, fetchEndpoint, dataMapper, entityName]);

    if (isLoading) return <Text>Loading...</Text>;

    const selectedEntity = entities.find((entity) => entity.name === name);
    if (!selectedEntity)
        return <Text style={{ color: "white", textAlign: "center" }}>Diesen {entityName} gibt es leider nicht mehr!</Text>;

    const iframeStyles: CSSProperties = {
        width: "100%",
        maxWidth: screens.lg ? "800px" : screens.md ? "600px" : "100%",
        aspectRatio: "16 / 9",
        position: "relative",
        margin: "0 auto",
    };

    return (
        <Row style={{ width: "100%", minHeight: "90vh", overflowY: "auto", padding: "2rem" }}>
            <Col span={24} style={{ textAlign: "center", padding: "2rem" }}>
                <article style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Title level={1}>{selectedEntity.name}</Title>
                    {selectedEntity.bewertung && (
                        <Rate
                            allowHalf
                            disabled
                            value={parseFloat(selectedEntity.bewertung)}
                            style={{ fontSize: 40, margin: "1rem auto" }}
                        />
                    )}
                    {selectedEntity.trailer && (
                        <div style={iframeStyles}>
                            <iframe
                                src={selectedEntity.trailer}
                                title="YouTube video player"
                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    )}
                    <Paragraph style={{ color: "lightgray", textAlign: "center" }}>© Universal Studios</Paragraph>
                    <Divider />
                    <Row justify="space-around" style={{ marginTop: "2rem" }}>
                        <Col xs={24} md={8} style={{ textAlign: "center" }}>
                            <Image
                                src={selectedEntity.bild}
                                alt="Entity Poster"
                                preview={false}
                                style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                            />
                        </Col>
                        <Col xs={24} md={14}>
                            <Paragraph>{selectedEntity.beschreibung}</Paragraph>
                        </Col>
                    </Row>
                </article>
            </Col>
        </Row>
    );
};
