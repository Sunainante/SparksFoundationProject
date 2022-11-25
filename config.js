const admin = require('firebase-admin');
const { getFirestorre, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./ServiceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const User = db.collection("Users").doc();

module.exports = User;
