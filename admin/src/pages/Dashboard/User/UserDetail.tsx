import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../utilities/requestAPI";
import { Wrapper } from "../../../schema/common";
import { UserDetailSchema } from "../../../schema/UserSchema";
import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();

  const { isLoading, data: userDetails } = useQuery<Wrapper<UserDetailSchema>>({
    queryKey: [`get-user-${userId}`],
    queryFn: () => getUserDetails(userId),
  });

  return isLoading ? (
    "Loading"
  ) : (
    <Card>
      <Header>
        <FaUserCircle />
        {userDetails?.data.name}
      </Header>

      <CardBody>
        <CardItem>
          <label htmlFor="email">Email:</label>
          <em> {userDetails?.data?.email}</em>
        </CardItem>
        <CardItem>
          <label htmlFor="email">Gender:</label>
          <span className="text-capitalize"> {userDetails?.data?.gender}</span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">Contact:</label>
          <span className="text-capitalize"> {userDetails?.data?.contact}</span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">Verification:</label>
          <span className="text-capitalize">
            {userDetails?.data?.verification ? "Verified" : "Not Verified"}
          </span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">Ban:</label>
          <span className="text-capitalize">
            {userDetails?.data?.ban ? "Ban" : "Not ban"}
          </span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">City:</label>
          <span className="text-capitalize">
            {userDetails?.data?.address.city}
          </span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">State:</label>
          <span className="text-capitalize">
            {userDetails?.data?.address.state}
          </span>
        </CardItem>
        <CardItem>
          <label htmlFor="email">Zip Code:</label>
          <span className="text-capitalize">
            {userDetails?.data?.address.zip_code}
          </span>
        </CardItem>
      </CardBody>
    </Card>
  );
};

export default UserDetail;

const Card = styled.div`
  padding: 8px;
  border: 1px solid grey;
  background-color: white;
`;
const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
  &::after {
    border-bottom: 1px solid black;
  }
`;

const CardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const CardItem = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;

  label {
    font-weight: 600;
  }
`;
