import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserAltSlash } from "react-icons/fa";
import { banUser } from "../../utilities/requestAPI";

interface Props {
  userId: string;
  ban: boolean;
}

const BanUserButton: React.FC<Props> = (props) => {
  const { userId, ban } = props;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["ban-user"],
    mutationFn: () => banUser(userId, !ban),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-list"] }),
  });

  const handleBanUser = () => {
    mutate();
  };

  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm"
      onClick={handleBanUser}
    >
      <FaUserAltSlash /> Ban
    </button>
  );
};

export default BanUserButton;
