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

    const low_price = 5;
    const high_price = 10
    const today = (new Date(Date.now())).toISOString().split("T")[0];

    const getMarketplaceList = async (type, helperValue = 0, extraValue = 0) => { // types of (default, price, day), helperValue is extra info if needed
        try {

            // filter
            console.log("helperValue - " + helperValue)
            console.log("extraValue - " + extraValue)
                
            if (type == "specificDate") {
                const data = await getDocs(query(collection(db, "Selling_Post"),
                    where("date", ">=", helperValue)
                  ));

                  console.log("Got past preData")


                if (data.empty) {
                    alert("no posts for this day!")
                    console.log(helperValue.toDate().toLocaleDateString())
                    return;
                } else {
                    console.log("snapshot not empty")
                }

                const posts = data.docs.filter(doc => doc.data().date.toDate() <= extraValue).map(async (doc) => {
                    var postData = { ...doc.data(), id: doc.id };
                    postData.userName = await getNameFromID(postData.uid);
                    return postData;
                });
                getMarketplaceListHelper(posts)
            } else {
                const data = await getDocs(query(collection(db, "Selling_Post"), where("date", ">=", currentDate()), orderBy(filterBy)));
                    const posts = data.docs.map(async (doc) => {
                        var postData = { ...doc.data(), id: doc.id };
                        postData.userName = await getNameFromID(postData.uid);
                        return postData;
                    });
                getMarketplaceListHelper(posts)
            }


            /*
            console.log("before if statements")

            if (type == "default") {
                console.log("default")
                getMarketplaceListHelper(posts);
            } else if (type == "price") {
                console.log("hit price");
                switch(helperValue) {
                    case 0:
                        console.log("hit 0")
                        const price_posts = posts.filter(post => post.price < low_price);
                        getMarketplaceListHelper(price_posts)
                        break;
                    case 1:
                        console.log("TODO - fixme teehee")
                        break;
                    case 2:
                        posts = posts.filter(post => post.price > high_price);
                        break;
                }
            } else if (type == "specificDate") {
                console.log("helperValue is - " + helperValue)
                const price_posts = posts.filter(post => post.date == helperValue)
            } else {
                console.log("fell thru else")
            }
            */
    
        } catch (error) {
            console.error('Error fetching marketplace data:', error);
        }
    };

    const getMarketplaceListHelper = async (posts) => {
        const resolvedPosts = await Promise.all(posts);
            setMarketplaceList(resolvedPosts);
    }


    useEffect(() => {
        getMarketplaceList("default", 0); // address this
    }, []);

    const handleFilter = () => {
        console.log("handled filter")
        console.log(filterBy)
        if (filterBy === 'date') {
            getMarketplaceList("default", 0);
        } else if (filterBy === 'low') {
            console.log("setting filterBy")
            getMarketplaceList("price", 0)
        } else if (filterBy === 'medium') {
            
        } else if (filterBy === 'high') {
        } else {
            console.log("specificDate")

            const filterByDate = new Date(filterBy);
            filterByDate.setHours(0, 0, 0, 0);  // Set to the start of the selected day
            const filterByDatePlusDay = Timestamp.fromDate(filterByDate);
            
            const filterByDateNext = new Date(filterBy);
            filterByDateNext.setDate(filterByDateNext.getDate() + 1);  // Set to the start of the next day
            filterByDateNext.setHours(0, 0, 0, 0);
            const filterByDatePlusDayNext = Timestamp.fromDate(filterByDateNext);

            const sortedByPrice = [...marketplaceList].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            setMarketplaceList(sortedByPrice);

            getMarketplaceList("specificDate", filterByDate, filterByDatePlusDay)
        }
    };

    function dateToTimestamp(dateString) {
        const currentDate = new Date(dateString);
        currentDate.setHours(0, 0, 0, 0); 
        const currentDateTimestamp = Timestamp.fromDate(currentDate);
        return currentDateTimestamp; 
    }

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

            console.log(dateToTimestamp(newDate))
  
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

    function twentyFourHourToTwelve(dateString) {
        var [hour, minute] = dateString.split(':'); 
        hour = parseInt(hour)
        var ending = ""
        if (parseInt(hour) < 12 ) {
            var ending = "AM";
        } else if (parseInt(hour) == 12 ) {
            var ending = "PM";
        } else {
            hour = hour-12;
            ending = "PM";
        }
        var newDateString = String(hour) + ":" + minute + " " + ending;
        return newDateString;

    }
  
    return(
        <div>
            <div>
                <h1>Marketplace Post</h1>
            </div>
            <div>
                <p>Filter by price!!!</p>
                <select value={filterBy} onChange={(e => {setFilterBy(e.target.value)})}>
                    <option value="low"> &lt;{low_price} </option>
                    <option value="medium"> {low_price}-{high_price} </option>
                    <option value="high"> &gt;{high_price} </option>
                </select>
                <button onClick={handleFilter}>Search</button>
            </div>
            <div>
                <br />
                <p>Or filter by date!!</p>
                <input type="date" required min={today} onChange={(e) => {setFilterBy(e.target.value)}}/>
                <button onClick = {handleFilter}>Search</button>

            </div>
            <div>
                <h2>Submit a Marketplace Post</h2>
                <input type="text" required placeholder="Contact Info" onChange={(e) => {setContactInfo(e.target.value)}}/>
                <input type="text" required placeholder="Contact Type" onChange={(e) => {setContactType(e.target.value)}}/>
                <input type="time" required placeholder="Start Hour" onChange={(e) => {setStartHour(e.target.value)}}/>
                <input type="time" required placeholder="End Hour" onChange={(e) => {setEndHour(e.target.value)}}/>
                <input type="number" required placeholder="Price" pattern="^\d*(\.\d{0,2})?$" onChange={(e) => {setPrice(e.target.value)}}/>
                <input type="date" required min={today}  placeholder="Day Available" onChange={(e) => {setDate(e.target.value)}}/>
                <button onClick={onSubmitMarketplacePost}>Submit Marketplace Post</button>
            </div>
            <div>
                <h2>Current Marketplace</h2>
                {marketplaceList.map((post, index) =>
                    <div key={index}>
                        <p>
                            user = {post.userName}<br />

                            contact info ({post.contactType}) = {post.contactInfo}<br />
                            from time {twentyFourHourToTwelve(post.startHour)} - {twentyFourHourToTwelve(post.endHour)}<br />
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