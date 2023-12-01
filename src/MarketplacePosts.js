import React, { useEffect, useState } from 'react';
import { db } from './Firebase.js'
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp} from 'firebase/firestore'
// TODO: update contact information to grab from user
// TODO: update hours to select hours
// TOOD: update user to automatically be a user
// TODO: update it to display user
// TODO: update date to not allow to pick past dates/times

const MarketplacePost = () => {
    const [marketplaceList, setMarketplaceList] = useState([]);
    const marketplaceCollectionRef = collection(db, "Selling_Post")

    // NEW POST STATES
    const [newContactInfo, setContactInfo] = useState('');
    const [newContactType, setContactType] = useState('');
    const [newStartHour, setStartHour] = useState('');
    const [newEndHour, setEndHour] = useState('');
    const [newPrice, setPrice] = useState('');
    const [newUser, setUser] = useState('');
    // idk abt this one
    const [newLocations, setLocations] = useState('');
    const [newDate, setDate] = useState('');
    
    const getMarketplaceList = async() => {
        const data = await getDocs(marketplaceCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setMarketplaceList(filteredData)
    }

    useEffect(() => {
        getMarketplaceList();
    }, [])

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
                console.log(typeof numberString)
                console.log("hit function")
                console.log(numberString)
                var periodPos = -1;
                if (numberString.indexOf(".") !== -1) {
                    var decimalPlaces = numberString.length - numberString.indexOf(".") -1;
                    console.log("hit . in string");
                    console.log(periodPos);
                } else {
                    console.log("hit . not in string");
                    return numberString + ".00";
                }
            
                var zeroString = "";

                if (decimalPlaces == 1) {
                    zeroString = "0";
                    console.log("zero string 0");
                } else if (decimalPlaces == 0 || decimalPlaces == 0)  {
                    zeroString = "00";
                    console.log("zero string 00");
                }

                console.log(numberString + zeroString)

                return numberString + zeroString;
            }
            

            await addDoc(marketplaceCollectionRef, {
                contactInfo: newContactInfo,
                contactType: newContactType,
                startHour: newStartHour,
                endHour: newEndHour,
                price: removeTrailingZeros(newPrice),
                user: newUser,
                date: currentDate()
            });
            getMarketplaceList();
        }catch(err){
            console.error(err)
        }
    }

    function currentDate() {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        const formattedDate = month + "/" + date + "/" + year;
        return formattedDate
    }

    // const filteredMarketplace = markeplaceList.filter();


    return(
        <div>
            <div>
                <h1>Marketplace Post</h1>
            </div>
            <div>
                <h2>Submit a Marketplace Post</h2>
                <input type="text" required placeholder="Contact Info" onChange={(e) => {setContactInfo(e.target.value)}}/>
                <input type="text" required placeholder="Contact Type" onChange={(e) => {setContactType(e.target.value)}}/>
                <input type="time" required placeholder="Start Hour" onChange={(e) => {setStartHour(e.target.value)}}/>
                <input type="time" required placeholder="End Hour" onChange={(e) => {setEndHour(e.target.value)}}/>
                <input type="number" required placeholder="Price" pattern="^\d*(\.\d{0,2})?$" onChange={(e) => {setPrice(e.target.value)}}/>
                <input type="text" required placeholder="User ID" onChange={(e) => {setUser(e.target.value)}}/>

                {/* <input type="date" required min={new Date().toISOString().split("T")[0]} placeholder="Day Available" onChange={(e) => {setDate(e.target.value)}}/> --> */}
                
                <button onClick={onSubmitMarketplacePost}>Submit Marketplace Post</button>
            </div>
            <div>
                <h2>Current Marketplace</h2>
                {marketplaceList.map((post, index) =>
                    <div key={index}>
                        <p>
                            user = {post.user}<br />
                            contact info ({post.contactType}) = {post.contactInfo}<br />
                            from time {post.startHour}-{post.endHour}<br />
                            at ${post.price} <br />
                            {post.date}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default MarketplacePost;