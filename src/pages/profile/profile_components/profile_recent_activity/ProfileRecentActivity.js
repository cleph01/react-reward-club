import { Link } from "react-router-dom";
import "../../styles/profile_recent_activity.scss";

function ProfileRecentActivity({ userId }) {
    return (
        <div className="profile__recent-activity">
            <Link to={`/post/${userId}/new`}>
                <div className="post-shoutout-btn">Post a Shoutout</div>
            </Link>
        </div>
    );
}

export default ProfileRecentActivity;
