import { useQuery } from "@tanstack/react-query";
import { getApparelList } from "../../../utilities/requestAPI";
import { Wrapper } from "../../../schema/common";
import { ApparelListSchema } from "../../../schema/ApparelSchema";
import { PageHeader } from "../../../styled-components/common";
import Spinner from "../../../components/utils/Spinner";
import ApparelListItem from "../../../components/Apparel/ApparelListItem";

const ApparelList = () => {
  const { data, isLoading } = useQuery<Wrapper<ApparelListSchema>>({
    queryKey: ["get-apparel-list"],
    queryFn: () => getApparelList(),
  });

  return (
    <div>
      <PageHeader>Apparel</PageHeader>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Small Size</th>
            <th scope="col">Medium Size</th>
            <th scope="col">Large Size</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {isLoading && <Spinner />}
        {!isLoading && (
          <tbody>
            {data?.data?.apparels?.map((apparel, index) => (
              <ApparelListItem
                key={apparel._id}
                index={index}
                apparel={apparel}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ApparelList;
