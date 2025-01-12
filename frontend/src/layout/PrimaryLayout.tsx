import { Flex } from "antd";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";


export const PrimaryLayout: React.FC = () => {

  return (
    <Flex vertical style={{ height: "calc(100vh - 1rem)", width: "100%" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          margin: 0
        }}
      >
        <Navbar />
      </div>
      <Flex style={{ width: "100%", flexGrow: 1, padding: "1rem 0", marginTop: "4rem" }}>
        <Outlet />
      </Flex>
    </Flex>
  )
}