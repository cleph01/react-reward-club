import "../../styles/profile_bio.scss";

function ProfileBio({ user }) {
    console.log("User in Bio", user);

    const dateJoined = user.userInfo.created.toDate().toDateString();
    return (
        <div className="profile__bio">
            <div className="profile__bio-textArea">
                {user.userInfo.aboutMe || "Tell Us Something About You"}
            </div>
            <div className="profile__bio-joined">Joined: {dateJoined}</div>
        </div>
    );
}

export default ProfileBio;
