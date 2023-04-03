import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, query, orderBy, collection, addDoc, serverTimestamp, Timestamp, startAfter, limit } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyA1EalpASVX2NVo5YSgeKy8U_cHaQJZ21w',
  authDomain: 'wedding-d0995.firebaseapp.com',
  projectId: 'wedding-d0995',
  storageBucket: 'wedding-d0995.appspot.com',
  messagingSenderId: '374651556040',
  appId: '1:374651556040:web:98e8a0b5985c2c6c3a95fd',
});
const firestore = getFirestore();
const commentCollection = collection(firestore, 'comments');
let lastVisible;

async function queryForDocuments() {
  let commentQuery;
  if (lastVisible == undefined) {
  commentQuery = query(
    commentCollection,
    orderBy('time', 'desc'),
    limit(6)
  );
  } else {
    commentQuery = query(
      commentCollection,
      orderBy('time', 'desc'),
      startAfter(lastVisible),
      limit(6)
    );
  }
  const querySnapshot = await getDocs(commentQuery);
  let querySnapshotLength;
  if (querySnapshot.docs.length != 6) {
    load.classList.add("hidden");
    lastVisible = undefined
    querySnapshotLength = querySnapshot.docs.length
  } else {
    lastVisible = querySnapshot.docs[querySnapshot.docs.length-2];
    querySnapshotLength = querySnapshot.docs.length-1
  }
  for (let i = 0; i < querySnapshotLength; i++) {
    let snap = querySnapshot.docs[i];
    let feed = document.createElement("div");
    feed.setAttribute("class", "dialogbox");
    feed.setAttribute("id", snap.id);
    let name = snap.data().name;
    let timeStamp = new Date(snap.data().time.seconds * 1000).toLocaleDateString()
    let comment = snap.data().body;
    feed.innerHTML = "<div class='body'><div class='head'><span class='name'>" + name + 
                      "</span><span class='timestamp'>" + timeStamp + 
                      "</span></div><div class='message'><span>" + comment + "</span></div></div>";    
    document.getElementById("comments").append(feed);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  let input = document.getElementById("name");
  let name = input.value;
  let input2 = document.getElementById("comment");
  let body = input2.value;
  let rsvp = document.getElementById("rsvp");
  let rsvpVal = rsvp.options[rsvp.selectedIndex].value;
  let rsvpAdult = document.getElementById("rsvp-adults");
  let adultVal = rsvpAdult.options[rsvpAdult.selectedIndex].value;
  let rsvpChild = document.getElementById("rsvp-kids");
  let childVal = rsvpChild.options[rsvpChild.selectedIndex].value;
  
  let time = serverTimestamp()
  const newComment = await addDoc(commentCollection, {
    name: name,
    body: body,
    time: time,
    rsvp: rsvpVal == "yes" ? true : false,
    adult: parseInt(adultVal),
    child: parseInt(childVal)
  }); 
    
  input.value = '';
  input2.value = '';
  rsvp.value = '0';
  rsvpAdult.value = '0'; 
  rsvpAdult.disabled = true;
  rsvpChild.value = '0'; 
  rsvpChild.disabled = true;
  window.alert("작성 감사합니다!");
  insertNewComment(name, body);
}

function insertNewComment(name, body) {
  let element = document.getElementById("comments");
  let feed = document.createElement("div");
  feed.setAttribute("class", "dialogbox");
  let timeStamp = new Date().toLocaleDateString()
  feed.innerHTML = "<div class='body'><div class='head'><span class='name'>" + name + "</span><span class='timestamp'>" + timeStamp + "</span></div><div class='message'><span>" + body + "</span></div></div>";    
  element.insertBefore(feed, element.firstChild)
}


document.addEventListener("DOMContentLoaded", function() {
  queryForDocuments();
});

const form = document.getElementById('form');
form.addEventListener("submit", handleSubmit);

const load = document.getElementById("load-button");
load.addEventListener("click", queryForDocuments);

