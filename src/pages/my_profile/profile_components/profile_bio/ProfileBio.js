import "../../styles/profile_bio.scss";

function ProfileBio({ user }) {
    console.log("User at Bio: ", user);

    const dateJoined = user.created.toDate().toDateString();
    return (
        <div className="profile__bio">
            <div className="profile__bio-textArea">
                {user.aboutMe || "Tell Us Something About You"}
            </div>
            <div className="profile__bio-joined">Joined: {dateJoined}</div>
        </div>
    );
}

export default ProfileBio;
