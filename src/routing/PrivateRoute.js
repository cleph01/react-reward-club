import { Redirect } from "react-router";
import { Route } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
        <Route
            exact
            {...rest}
            render={({ location }) => {
                return isAuthenticated === true ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
}

export default PrivateRoute;
