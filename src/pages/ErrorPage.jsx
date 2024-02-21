import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      {/* <!-- 404 Section Begin --> */}
      <section className="section-404">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-404">
                <h1>404</h1>
                <h3>Opps! This page Could Not Be Found!</h3>
                <p>
                  Sorry bit the page you are looking for does not exist, have
                  been removed or name changed
                </p>

                <Link to="/">
                  <i className="fa fa-home"></i> Go back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- 404 Section End --> */}
    </>
  );
};

export default ErrorPage;
