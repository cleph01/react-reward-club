import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import YouTubeEmbed from "../components/YouTubeEmbed";

import "./styles/post_grid.scss";

function PostGrid(props) {
    return (
        <div className="follow-grid-container">
            <ImageList sx={{ width: 500, height: 450 }}>
                {props.itemData.map((item, i) => (
                    <ImageListItem key={i}>
                        {item.youtubeId ? (
                            <YouTubeEmbed youtubeId={item.youtubeId} />
                        ) : (
                            <img
                                src={`${item.img}`}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        )}

                        <ImageListItemBar
                            title={`${item.caption.slice(0, 10)}...`}
                            subtitle={item.businessName}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default PostGrid;
