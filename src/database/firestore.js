import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCK4ksB5h2NHXg-Tb1rjl_GMu6hMmt3pOI",
    authDomain: "enchantedentaglement.firebaseapp.com",
    databaseURL: "https://enchantedentaglement.firebaseio.com",
    projectId: "enchantedentaglement",
    storageBucket: "enchantedentaglement.appspot.com",
    messagingSenderId: "1061023385723"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default db
/* Get from store example
// 0npKxqE9No516CI94KH2
var docRef = db.collection("users").doc("0npKxqE9No516CI94KH2");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

// Add to store example
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
*/
