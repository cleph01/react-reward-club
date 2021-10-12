import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import "./styles/post_grid.scss";

function PostGrid(props) {
    return (
        <div className="follow-grid-container">
            <ImageList sx={{ width: 500, height: 450 }}>
                {props.itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default PostGrid;
