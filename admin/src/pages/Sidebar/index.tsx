import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { SidebarData } from "../../data/SidebarMenuData";
import { GiLaurelCrown } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
interface Props {
  logOut: () => void;
}

const Sidebar: React.FC<Props> = (props) => {
  const { logOut } = props;

  return (
    <SidebarContainer>
      <NavContainer>
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
      </NavContainer>
      <NavContainer noborder>
        <div className="logout-container" onClick={logOut}>
          <IoLogOut />
        </div>
      </NavContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #262626;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface NavContainerProps {
  noborder?: boolean;
}

const NavContainer = styled.div<NavContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  a,
  .logout-container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    gap: 4rem;
    border-bottom: ${(props) => !props.noborder && "1px solid white"};
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
