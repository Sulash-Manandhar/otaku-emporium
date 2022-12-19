import { Flex, Tooltip, Avatar, Circle, Badge } from "@chakra-ui/react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserModalContext } from "../../../context/UserModalProvider";
import urls from "../../../routes/urls";
import { getAccessToken, setUserInfo } from "../../../utils/auth";
import { getLoggedInUserAPI } from "../../../utils/requestApi";

const NavIconLink = () => {
  const navigate = useNavigate();
  const { setIsUserModalOpen } = useUserModalContext();
  const access_token = getAccessToken();

  useQuery(["one-time-run", access_token], () => getLoggedInUserAPI(), {
    onSuccess: (res) => {
      setUserInfo(JSON.stringify(res?.data?.user));
    },
    enabled: !!access_token,
    retry: false,
  });

  const handleProfileClick = (e: any) => {
    e.preventDefault();
    const access_token = getAccessToken();
    if (access_token) return navigate(urls.profile);
    setIsUserModalOpen(true);
  };

  return (
    <Flex justifyContent="flex-start" alignItems="center" gap="8px">
      <Tooltip label="Profile" hasArrow>
        <Avatar
          size="sm"
          name="Sulash Manandhar"
          src="https://bit.ly/dan-abramov"
          cursor="pointer"
          onClick={handleProfileClick}
        />
      </Tooltip>
      <Tooltip label="Favourite" hasArrow>
        <Circle
          size="35px"
          bg="red.500"
          color="white"
          position="relative"
          cursor="pointer"
        >
          <AiOutlineHeart />
        </Circle>
      </Tooltip>
      <Tooltip label="Cart" hasArrow>
        <Circle
          size="35px"
          bg="telegram.500"
          color="white"
          position="relative"
          cursor="pointer"
        >
          <Badge
            position="absolute"
            top={-1}
            right={-1}
            variant="subtle"
            colorScheme="linkedin"
            fontSize="10px"
            borderRadius="lg"
          >
            99
          </Badge>
          <AiOutlineShoppingCart />
        </Circle>
      </Tooltip>
    </Flex>
  );
};

export default NavIconLink;
