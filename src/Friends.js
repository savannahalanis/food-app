import React, { useEffect, useState } from 'react';
import { db } from './Firebase.js'
import { getDocs, collection, updateDoc, doc, getDoc, where, query } from 'firebase/firestore';



const Friends = (props) => {
    const { user } = props;
    const [userList, setUserList] = useState([]);
    const postCollection = collection(db, "Users")

    const getUsers = async () => {
        try{
          const data = await getDocs(postCollection);
          const filteredUsers = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id,
          }));
          setUserList(filteredUsers)
          console.log(filteredUsers);
        } catch (err) {
          console.error(err);
        };
    };

    const addFriend = async (friend) => {
      const friendId = friend.id;
    
      console.log('Friend:' + friend.uid);
      console.log('User:' + user.uid);

      const userQuery = query(collection(db, "Users"), where("uid", "==", user.uid));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userDoc = doc(db, "Users", userQuerySnapshot.docs[0].id);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        if (!userData.friends || !userData.friends.includes(friendId)) {
          const updatedFriendsArray = [...(userData.friends || []), friendId];

          await updateDoc(userDoc, { friends: updatedFriendsArray });
        } else {
          console.log("FriendId already exists in friends array");
        }
      } else {
        console.log("User document not found");
      }
    };
    

    useEffect(() => {
        getUsers();
    }, [])

    return(
        <div>
            {userList.map((curr_user, index) => (
                <div key={index}>
                    {curr_user.uid !== user.uid && (                        
                         <button onClick={() => addFriend(curr_user)}>{curr_user.displayName}</button>                  
                    )}
                </div>
            ))}
        </div>
    );
};

export default Friends;