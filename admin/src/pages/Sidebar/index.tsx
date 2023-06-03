import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "../../data/SidebarMenuData";
import { GiLaurelCrown } from "react-icons/gi";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Link to="/">
          <GiLaurelCrown />
        </Link>
      </LogoContainer>
      {SidebarData.map((item) => {
        const Icon: any = item.icon;
        return (
          <Link to={item.path} key={item.id}>
            <Icon />
          </Link>
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #262626;
  height: 100%;

  a {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    gap: 4rem;
    border-bottom: 1px solid white;
    font-size: 1.6rem;
    text-decoration: none;
    color: white;

    &:hover {
      background-color: #333333;
    }
  }
`;

const LogoContainer = styled.div`
  background-color: #000000;
`;
