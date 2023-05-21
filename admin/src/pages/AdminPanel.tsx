import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const AdminPanel = () => {
  return (
    <Container>
      <Sidebar />
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Container>
  );
};

export default AdminPanel;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Dashboard = styled.div`
  flex: 1;
  padding: 0.5rem 2rem;
  width: 100%;
  height: 100%;
`;
