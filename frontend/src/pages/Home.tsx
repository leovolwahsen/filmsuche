import { Typography, Flex, Space } from "antd";

const { Title } = Typography;

export const Home: React.FC = () => {

  return (
    <Flex vertical align="center" justify="center" style={{ width: "100%"}}>
      <Title level={1}>Wilkommen bei der Filmsuche</Title>
      <Space direction="vertical" size="middle">

        <Space direction="vertical" size="middle" style={{ maxWidth: "800px" }}>
          <Title level={5}>Sie können hier Ihre Lieblingsfilme speichern die sie später anschauen möchten.</Title>
        </Space>
      </Space>
        
    </Flex>
  );
};