import FormatDateOnly from "../../others/FormatDateOnly";
import useOnWorkOutData from "../../hooks/useOnWorkOutData";
import { getFormattedDate } from "@others/dateUtilities";
import Loader3 from "../../components/ui/loader3/Loader3";

const ByClientsOnWorkout = ({ index }) => {
  const { data, isLoading, error, isPending } = useOnWorkOutData({
    date: getFormattedDate(),
    trigger: false,
  });

  if (isLoading) {
    return <Loader3 />;
  }

  const { usersOnline, dayPassUsersOnline } = data;

  //   dayPassUsersOnline

  return usersOnline?.map((user, index) => (
    <>
      {/* <div className="row body" key={user?.id}>
        <div className="col-1">
          <div className="body-col">{index + 1}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{user?.user}</div>
        </div>
        <div className="col-2">
          <div className="body-col">
            {FormatDateOnly(user?.date_subscribed)}
          </div>
        </div>
        <div className="col-2">
          <div className="body-col">{user?.gym_rate_desc}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{user?.trainer}</div>
        </div>
        <div className="col-1">
          <div className="body-col">{user?.extended_session}</div>
        </div>
        <div className="col-2">
          <div className="body-col">{user?.per}</div>
        </div>
      </div> */}
      <h2>Hello</h2>
    </>
  ));
};

export default ByClientsOnWorkout;
