import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ListSubheader from "@mui/material/ListSubheader";
import ImageListItem from "@mui/material/ImageListItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import ProductsBarView from "./ProductsBarView";

import "../../styles/product/category.scss";

const categoryData = [
    "Fern",
    "Mushrooms",
    "Tomato basil",
    "Sea star",
    "Bike",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
    "Mas",
];

function CategoryView(props) {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState("Fern");

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const abortController = new AbortController();

        // list({
        //   category: props.categories[0]
        // }).then((data) => {
        //   if (data.error) {
        //     console.log(data.error)
        //   } else {
        //     setProducts(data)
        //   }
        // })
        return function cleanup() {
            abortController.abort();
        };
    }, []);

    const listbyCategory = (category) => (event) => {
        setSelected(category);
        // list({
        //   category: category
        // }).then((data) => {
        //   if (data.error) {
        //     console.log(data.error)
        //   } else {
        //     setProducts(data)
        //   }
        // })
    };

    return (
        <div>
            <Card
                className="card-container"
                style={{ backgroundColor: "#dcdcdc" }}
            >
                <Box sx={{ maxWidth: "100%", bgcolor: "background.paper" }}>
                    <Typography className="tabs-title">
                        Explore by category
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="category tabs"
                        style={{ width: "100%", textAlign: "center" }}
                    >
                        {categoryData.map((tab, i) => (
                            <Tab key={i} label={tab} />
                        ))}
                    </Tabs>
                </Box>

                <ProductsBarView />
                <Divider />
            </Card>
        </div>
    );
}

export default CategoryView;
