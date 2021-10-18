import { useContext } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase/firebase_config";

function PrivateRoute({ children, pendingAuth, ...rest }) {
    const { user } = useContext(UserContext);

    return (
        <Route
            exact
            {...rest}
            render={({ location }) => {
                return !!user ? (
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
