import Navbar from "../components/Navbar"
import MarketPlacePosts from "../components/MarketPlacePosts"
import MarketplaceFilter from "../components/MarketplaceFilter"
import {Grid, Button} from "@mui/material"
import { Link } from 'react-router-dom';

export default function Marketplace() {
    return (
        <>
        <Navbar />
        <Grid container spacing={2} sx={{backgroundColor:"#FAF9F6"}}> 
            <Grid item xs={8} md={8}> 
                <MarketPlacePosts/> 
            </Grid>
            <Grid item xs={4} md={4}> 
            <Link to="/marketplaceadd">
                <Button variant = "contained" sx = {{color: "white", mt: "2em", ml: "2em"}}>+ Add Post</Button>
            </Link>
            </Grid>
        </Grid>
    </>
    )
}