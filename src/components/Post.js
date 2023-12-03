import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Heart from "react-heart"
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function LikeButton() {
   const [liked, setLiked] = useState(false)

   return (
      <div style={{ width: "2rem" }}> {/*TODO: update like count ONCE onclick*/}
         <Heart isActive={liked} onClick={() => setLiked(!liked)} animationScale={1} style={{ marginTop: '1rem' }} />
      </div>
   );
}

function CommentList() {
   return (
      <List>
         <ListItem disableGutters>
             <ListItemText primary="Joe: omg i agree" /> {/*TODO: pass in value*/}
         </ListItem>
         <ListItem disableGutters>
            <ListItemText primary="Bob: a;idhf;aid askudhfaksjdhfasek hkfks" />
         </ListItem>
         <ListItem disableGutters>
            <ListItemText primary="Mary: YASSSSSSS" />
         </ListItem>
      </List>
   );
}

export const Post = ({user}) => {

   return(
      <>
         <h1>username</h1> <br /> {/*TODO: pass in value*/}
         <img src={user.image} height="500px" width="500px" /> <br />
         <div className="rowcontainer">
            <LikeButton></LikeButton>
            &nbsp;
            <h3>{user.likes} likes</h3>
            </div>
         <h1>{user.title}</h1>
         <h2>{user.text}</h2>
         <div className='rowcontainer'>
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocationOnIcon />}>
            Location: {/*TODO: pass in value*/}
            </Button>
            &nbsp;
            <Button variant="outlined" disableRipple={true} color="primary" size="small" startIcon={<LocalDiningIcon />}>
            Restrictions: {/*TODO: pass in value*/}
            </Button>
         </div>
         <h2>Comments:</h2>
         <TextField label="Add comment:" variant="standard" /> {/*TODO: render comment when press enter*/}
         <CommentList></CommentList>
         <h5>November 31, 3091</h5> {/*TODO: pass in value*/}
         <br /><br />
      </>
)}

export default Post;