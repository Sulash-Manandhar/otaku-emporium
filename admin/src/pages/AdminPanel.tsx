import { Flex, Box, SystemStyleObject } from "@chakra-ui/react";
import Sidebar from "@src/components/Sidebar";
import { Outlet } from "react-router-dom";
interface Props {
  logout: () => void;
}

const OutletContainer: SystemStyleObject = {
  flex: 1,
  padding: ["0.75rem", "2rem"],
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "gray.200",
  display: "flex",
  flexDir: "column",
  gap: 1,
};

const AdminPanel: React.FC<Props> = (props) => {
  const { logout } = props;
  return (
    <Flex width="100%" height="100%">
      <Sidebar logout={logout} />
      <Box sx={OutletContainer}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminPanel;
