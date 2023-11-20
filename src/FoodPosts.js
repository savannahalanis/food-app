import React, { useEffect, useState } from 'react';
import { db } from './Firebase.js'
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp} from 'firebase/firestore'

const FoodPost = () => {
    const [postList, setPostList] = useState([]);
    const postCollectionRef = collection(db, "Food_Post")
    

    //NEW POST STATES
    const [newTitle, setTitle] = useState('');
    const [newImage, setImage] = useState('');
    const [newText, setText] = useState('');
    const [newDate, setDate] = useState(null);
    const [newVeg, setVeg] = useState(false);
    const [newLikes, setLikes] = useState(0);

     //SEARCH STATES
     const [searchQuery, setSearchQuery] = useState('');
     const [findVeg, setFindVeg] = useState(false);

    const getPostList = async () => {
        const data = await getDocs(postCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setPostList(filteredData)
    };

    useEffect(() => {
        getPostList();
    }, [])

    const deletePost = async(id) => {
        const postDoc = doc(db, "Food_Post", id)
        await deleteDoc(postDoc);
        setPostList((oldPostList) => oldPostList.filter((post) => post.id !== id));
    }

    const likePost = async(id) => {
      const postDoc = doc(db, "Food_Post", id)
      const posts = postList.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post);
      await updateDoc(postDoc, {likes: postList.find(post => post.id === id).likes + 1});
      setPostList(posts);
    }

    const onSubmitPost = async () => {
        try{
          await addDoc(postCollectionRef, {
            title: newTitle, 
            text: newText, 
            image: newImage,
            date: serverTimestamp(),
            veg: newVeg,
            likes: newLikes,
            comments: {}
          });
          getPostList();
        }catch(err){
          console.error(err);
        }
    };  
    
    const filteredPosts = postList.filter(post =>
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      || post.text.toLowerCase().includes(searchQuery.toLowerCase()))
      && (!findVeg || post.veg == findVeg)
    );

    return(
        <div>
            <div>
                <input type="text" placeholder="Search by Title" onChange={(e) => setSearchQuery(e.target.value)} />
                <input type="checkbox" onChange={(e) => setFindVeg(e.target.checked)}/>
                <br></br>
                <input type="text" placeholder="Title....." onChange={(e) => {setTitle(e.target.value)}}/>
                <input type="text" placeholder="Text...." onChange={(e) => {setText(e.target.value)}}/>
                <input type="text" placeholder="Image" onChange={(e) => (setImage(e.target.value))}/>
                <input type="checkbox" checked={newVeg} onChange={(e) => (setVeg(e.target.checked))} />
                <label>Veg</label>
                <button onClick={onSubmitPost}>Submit Post</button>
            </div>
            <div>
                {filteredPosts.map((post, index) => (
                    <div key={index}>
                        <h1>{post.title}</h1>
                        <img src={post.image} width="100" height="100"></img>
                        <p>{post.text}</p>
                        <button onClick={() => deletePost(post.id)}>Delete Post</button>
                        <button onClick={() => likePost(post.id)}>Like</button>
                        <p>{post.likes}</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default FoodPost;