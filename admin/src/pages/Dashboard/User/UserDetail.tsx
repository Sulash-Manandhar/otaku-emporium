import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  return <div>UserDetail{userId}</div>;
};

export default UserDetail;
