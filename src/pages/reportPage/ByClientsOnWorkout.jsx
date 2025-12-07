import FormatDateOnly from "../../others/FormatDateOnly";
import Loader3 from "../../components/ui/loader3/Loader3";
import JollyShapeLoading from "../../components/ui/jollyShapeLoading/JollyShapeLoading";
import formatTimeToString from "@others/formatTimeToString";
import { useReportStore } from "../../store/useReportStore";
import useOnWorkOutDataByDateRange from "../../hooks/useOnWorkOutDataByDateRange";
import Loading5 from "../../components/ui/loading5/Loading5";

const isExpired = (value) => {
  return value === "Expired" ? "red" : "green";
};

const is1990 = (value) => {
  return value?.includes("1990") ? "--:--" : formatTimeToString(value);
};

const ByClientsOnWorkout = ({ index }) => {
  const [cDateFrom, cDateTo] = useReportStore((state) => [
    state.reportData.dateFrom,
    state.reportData.dateTo,
  ]);

  const { data, isLoading, error, isPending } = useOnWorkOutDataByDateRange({
    dateFrom: cDateFrom,
    dateTo: cDateTo,
    trigger: false,
  });

  if (isLoading) {
    return <Loading5 />;
  }

  const { usersOnline, dayPassUsersOnline } = data;

  //   dayPassUsersOnline

  return usersOnline?.map((user, index) => (
    <>
      <div className="row body" key={user?.id}>
        <div className="col-1">
          <div className="body-col">{index + 1}</div>
        </div>
        <div className="col-2">
          <div className="body-col">
            {user?.usersubscription?.flexprouser?.name}
          </div>
        </div>
        <div className="col-2">
          <div className="body-col">{FormatDateOnly(user?.date_log)}</div>
        </div>
        <div className="col-2">
          <div className="body-col">
            {user?.usersubscription?.subscription?.gym_rate_desc}
          </div>
        </div>
        <div className="col-2">
          <div className="body-col">{formatTimeToString(user?.time_in)}</div>
        </div>
        <div className="col-1">
          <div className="body-col">{is1990(user?.time_out)}</div>
        </div>
        <div className="col-2">
          <div
            className="body-col"
            style={{ color: isExpired(user?.extendedSubDays) }}
          >
            {user?.extendedSubDays}
          </div>
        </div>
      </div>
    </>
  ));
};

export default ByClientsOnWorkout;
