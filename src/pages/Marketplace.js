import Navbar from "../components/Navbar"
import MarketPlacePosts from "../components/MarketPlacePosts"
import MarketplaceFilter from "../components/MarketplaceFilter"
import {Grid, Button} from "@mui/material"

export default function Marketplace() {
    return (
        <>
        <Navbar />
        <Grid container spacing={2}> 
            <Grid item xs={8} md={8}> 
                <MarketPlacePosts/> 
            </Grid>
            <Grid item xs={4} md={4}> 
                <Button variant = "contained" sx = {{color: "white", mt: "2em", ml: "2em"}}>+ Add Post</Button>
                <MarketplaceFilter />
            </Grid>
        </Grid>
    </>
    )
}