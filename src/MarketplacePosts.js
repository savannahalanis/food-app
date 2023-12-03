import React, { useEffect, useState } from 'react';
import { db } from './Firebase.js'
import {getDocs, getDoc, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, Timestamp, orderBy, query, limit, where, direction, getFirestore} from 'firebase/firestore'
// TODO: update contact information to grab from user
// TODO: update hours to select hours
// TOOD: update user to automatically be a user
// TODO: update it to display user
// TODO: update date to not allow to pick past dates/times

const MarketplacePost = ({ userID }) => {

    const [marketplaceList, setMarketplaceList] = useState([]);
    const [filterBy, setFilterBy] = useState("date")
    const marketplaceCollectionRef = collection(db, "Selling_Post")

    // NEW POST STATES
    const [newContactInfo, setContactInfo] = useState('');
    const [newContactType, setContactType] = useState('');
    const [newStartHour, setStartHour] = useState('');
    const [newEndHour, setEndHour] = useState('');
    const [newPrice, setPrice] = useState('');
    const [newDate, setDate] = useState('');

    const getMarketplaceList = async () => {
        try {
            const data = await getDocs(query(collection(db, "Selling_Post"), where("date", ">=", currentDate()), orderBy(filterBy)));
            const posts = data.docs.map(async (doc) => {
                const postData = { ...doc.data(), id: doc.id };
                postData.userName = await getNameFromID(postData.uid);
                return postData;
            });
    
            const resolvedPosts = await Promise.all(posts);
            setMarketplaceList(resolvedPosts);
        } catch (error) {
            console.error('Error fetching marketplace data:', error);
        }
    };


    useEffect(() => {
        getMarketplaceList();
    }, []);

    const handleFilter = () => {
        if (filterBy === 'date') {
            getMarketplaceList();
        } else if (filterBy === 'price') {
            const sortedByPrice = [...marketplaceList].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            setMarketplaceList(sortedByPrice);
        }
    };

    const onSubmitMarketplacePost = async () => {

        try{
            if (newEndHour < newStartHour) {
                alert("Start time must be before end time");
                return;
            }

            if ( (newPrice * 100) % 1 || newPrice < 0) {
                alert("Price must have 2 decimals and nonnegative ")
                return;
            }
      
            function removeTrailingZeros(numberString) {
                var periodPos = -1;
                if (numberString.indexOf(".") !== -1) {
                    var decimalPlaces = numberString.length - numberString.indexOf(".") -1;
                } else {
                    return numberString + ".00";
                }
            
                var zeroString = "";

                if (decimalPlaces == 1) {
                    zeroString = "0";
                } else if (decimalPlaces == 0 || decimalPlaces == 0)  {
                    zeroString = "00";
                }

                return numberString + zeroString;
            }

            function dateToTimestamp(dateString) {

                /*
                var dashCounter = 0
                var yearString = ""
                for(var i = 0; i < length(dateString); i++) {
                    if (dateString[i] === "-") {
                        dashCounter++;
                    } else {
                        switch (dashCounter) {
                            case 0 :

                        }
                    }
                }
                */

                const currentDate = new Date(dateString);
                currentDate.setHours(0, 0, 0, 0); 
                const currentDateTimestamp = Timestamp.fromDate(currentDate);
                return currentDateTimestamp; 
            }
  
            await addDoc(marketplaceCollectionRef, {
                contactInfo: newContactInfo,
                contactType: newContactType,
                startHour: newStartHour,
                endHour: newEndHour,
                price: removeTrailingZeros(newPrice),
                uid: userID,
                date: dateToTimestamp(newDate)
            });

            // reload page to (temporarily??) fix issue that "where" and first "orderBy" must be same type
            window.location.reload(false);

            getMarketplaceList();
        }catch(err){
            console.error(err)
        }
    }

    function currentDate() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 
        const currentDateTimestamp = Timestamp.fromDate(currentDate);
        return currentDateTimestamp;        
    };


    const getNameFromID = async(userID) => {

        try {
            const userDocRef = doc(collection(db, 'Users'), userID);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists) {
                return "User not found";
            }

            const username = userDoc.data().displayName;

            return username;
        } catch (err) {
            console.error(err);
        }
    };




    
    return(
        <div>
            <div>
                <h1>Marketplace Post</h1>
            </div>
            <div>
                <select value={filterBy} onChange={(e => {setFilterBy(e.target.value)})}>
                    <option value="date">Date</option>
                    <option value="price">Price</option>
                </select>
                <button onClick={handleFilter}>Search</button>
            </div>
            <div>
                <h2>Submit a Marketplace Post</h2>
                <input type="text" required placeholder="Contact Info" onChange={(e) => {setContactInfo(e.target.value)}}/>
                <input type="text" required placeholder="Contact Type" onChange={(e) => {setContactType(e.target.value)}}/>
                <input type="time" required placeholder="Start Hour" onChange={(e) => {setStartHour(e.target.value)}}/>
                <input type="time" required placeholder="End Hour" onChange={(e) => {setEndHour(e.target.value)}}/>
                <input type="number" required placeholder="Price" pattern="^\d*(\.\d{0,2})?$" onChange={(e) => {setPrice(e.target.value)}}/>
                <input type="date" required min={(new Date(Date.now() - 86400000)).toISOString().split("T")[0]}   placeholder="Day Available" onChange={(e) => {setDate(e.target.value)}}/>
                <button onClick={onSubmitMarketplacePost}>Submit Marketplace Post</button>
            </div>
            <div>
                <h2>Current Marketplace</h2>
                {marketplaceList.map((post, index) =>
                    <div key={index}>
                        <p>
                            user = {post.userName}<br />

                            contact info ({post.contactType}) = {post.contactInfo}<br />
                            from time {post.startHour}-{post.endHour}<br />
                            at ${post.price} <br />
                            {post.date && (
                                <span> Date: {post.date.toDate().toLocaleDateString()} </span>
                            )}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default MarketplacePost;