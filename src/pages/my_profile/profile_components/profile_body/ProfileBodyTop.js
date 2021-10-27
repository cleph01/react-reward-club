import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import WebIcon from "@mui/icons-material/Web";

import "../../styles/profile_body_top.scss";

function ProfileBodyTop({ user }) {
    console.log("User at Body Top: ", user);
    return (
        <div className="profile-body__top">
            <Avatar
                src={user.avatarUrl}
                alt={user.displayName}
                sx={{ width: 56, height: 56 }}
            />

            <div className="profile__personal-details">
                <div className="name">@{user.displayName}</div>

                <div className="email"> {user.email}</div>
            </div>
            <Stack
                className="socials__wrapper"
                direction="row"
                spacing={1}
                style={{
                    display:
                        Object.keys(user.socials).length > 0 ? "block" : "none",
                }}
            >
                {user.socials.facebook && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.facebook}
                    >
                        <IconButton aria-label="facebook-icon">
                            <FacebookIcon className="facebook" />
                        </IconButton>
                    </a>
                )}
                {user.socials.instagram && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.instagram}
                    >
                        <IconButton aria-label="instagram-icon">
                            <InstagramIcon className="instagram" />
                        </IconButton>
                    </a>
                )}
                {user.socials.linkedIn && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.linkedIn}
                    >
                        <IconButton aria-label="linkedIn-icon">
                            <LinkedInIcon className="linkedin" />
                        </IconButton>
                    </a>
                )}
                {user.socials.twitter && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.twitter}
                    >
                        <IconButton aria-label="twitter-icon">
                            <TwitterIcon className="twitter" />
                        </IconButton>
                    </a>
                )}
                {user.socials.youtube && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.youtube}
                    >
                        <IconButton aria-label="youtube-icon">
                            <YouTubeIcon className="youtube" />
                        </IconButton>
                    </a>
                )}
                {user.socials.github && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.github}
                    >
                        <IconButton aria-label="github-icon">
                            <GitHubIcon className="github" />
                        </IconButton>
                    </a>
                )}
                {user.socials.web && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={user.socials.web}
                    >
                        <IconButton aria-label="webpage-icon">
                            <WebIcon className="web" />
                        </IconButton>
                    </a>
                )}
            </Stack>
        </div>
    );
}

export default ProfileBodyTop;
