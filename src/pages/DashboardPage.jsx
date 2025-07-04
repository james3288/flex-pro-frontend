
import UseDashBoard from "../customHooks/useDashBoard";

const DashboardPage = ({
  dashboardBg,
  page,
  formDone,
  setFormDone,
  formData,
  setFormData,
  state,
  dispatch,
}) => {

  return (
    <>
      {/* Hero section */}
      <section className="hero-section">
        <div className={`hs-item set-bg ${dashboardBg}`}>
          {
            <UseDashBoard
              page={page}
              formDone={formDone}
              setFormDone={setFormDone}
              formData={formData}
              setFormData={setFormData}
              state={state}
              dispatch={dispatch}
            />
          }
        </div>
      </section>

      {/* end Hero section */}
    </>
  );
};

export default DashboardPage;
