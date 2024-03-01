const express = require("express");
const app = express();
const PORT = 4000;
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(session({
    secret: "My secret",
    name: "My site",
    resave: true,
    saveUninitialized: true
}))

app.use(express.urlencoded({extended:true}));

const users = [
    {userID: "01", username:"tom", password:"123"}
]

app.get('/', async(req,res) => {
    if(req.session.isAuth) {
        res.redirect('/profile');
    }else {
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/', async(req,res) => {

    const {username, password} = req.body;

    const user = users.find((item) => item.username === username && item.password === password);

    if(!user) {

        res.send("Invalid credentials");

    } else {
        req.session.userID = user.userID;
        req.session.isAuth = true;
        res.redirect('/profile')
    }
});

app.get('/profile', async(req,res) => {

    if(req.session.isAuth) {

        res.sendFile(__dirname + '/profile.html');   

    } else {

        res.redirect('/');

    }
});

app.listen(PORT, () => {

    console.log(`Server is running on ${PORT}`);

});