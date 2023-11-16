import React, { useEffect, useState } from 'react';
import { db } from './Firebase.js'
import {getDocs, collection, addDoc} from 'firebase/firestore'

const FoodPost = () => {
    const [postList, setPostList] = useState([]);
    const postCollectionRef = collection(db, "Food_Post")

    //NEW POST STATES
    const [newTitle, setTitle] = useState('');
    const [newImage, setImage] = useState('');
    const [newText, setText] = useState('');
    const [newVeg, setVeg] = useState(false);

    const getPostList = async () => {
        try{
          const data = await getDocs(postCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
          }));
          setPostList(filteredData)
          console.log(filteredData);
        } catch (err) {
          console.error(err);
        };
      }
      useEffect(() => {
        getPostList();
      }, [])

    const onSubmitPost = async () => {
        try{
          await addDoc(postCollectionRef, {
            title: newTitle, 
            text: newText, 
            image: newImage,
            veg: newVeg,
          });
          getPostList();
        }catch(err){
          console.error(err);
        }
    }    

    return(
        <div>
            <div><input type="text" placeholder="Title" value={newTitle} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Text" value={newText} onChange={(e) => setText(e.target.value)} />
                <input type="text" placeholder="Image" value={newImage} onChange={(e) => setImage(e.target.value)} />
                <input type="checkbox" checked={newVeg} onChange={(e) => setVeg(e.target.checked)} />
                <label>Veg</label>
                <button onClick={onSubmitPost}>Submit Post</button>
            </div>
            <div>
                {postList.map((post, index) => (
                    <div key={index}>
                        <h1>{post.title}</h1>
                        <img src={post.image} width="100" height="100"></img>
                        <p>{post.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodPost;