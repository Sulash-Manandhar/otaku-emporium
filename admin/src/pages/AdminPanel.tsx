import { styled } from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  logOut: () => void;
}

const AdminPanel: React.FC<Props> = (props) => {
  const { logOut } = props;
  return (
    <Container>
      <Sidebar />
      <Dashboard>
        <Outlet />
      </Dashboard>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        closeOnClick
        theme="light"
        pauseOnHover
        draggable={false}
        hideProgressBar={true}
      />
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
  overflow: auto;
`;
