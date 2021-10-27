import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import LinkIcon from "@mui/icons-material/Link";
import YouTubeEmbed from "../components/YouTubeEmbed";
import UpcomingMessage from "../components/UpcomingMessage";

import "./styles/post_grid.scss";

function PostGrid({ posts, userId }) {
    return (
        <div className="follow-grid-container">
            {posts.length > 0 ? (
                <ImageList sx={{ width: 500 }}>
                    {posts.map((item, i) => (
                        <ImageListItem key={i}>
                            {item.post.youtubeId ? (
                                <YouTubeEmbed youtubeId={item.post.youtubeId} />
                            ) : (
                                <img
                                    src={`${item.post.imageUrl}`}
                                    srcSet={`${item.post.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.post.title}
                                    loading="lazy"
                                />
                            )}
                            <Link to={`/post/${userId}/${item.postId}`}>
                                <ImageListItemBar
                                    title={`${item.post.caption.slice(
                                        0,
                                        10
                                    )}...`}
                                    subtitle={item.post.businessName}
                                    position="below"
                                    actionIcon={<LinkIcon />}
                                />
                            </Link>
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <UpcomingMessage />
            )}
        </div>
    );
}

export default PostGrid;
