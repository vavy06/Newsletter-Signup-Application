// you need to add your apiKey , server and list id 


const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");

const app = express();

app.use(express.urlencoded({extended:true}));

//The public folder which holds the CSS
app.use(express.static("public"));



app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({

 apiKey: "",           //  add your api-key here

 server: ""            // add your server
});

//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {


const listId = "";          // add your list id

const subscribingUser = {
    firstName: req.body.firstName ,
    lastName: req.body.lastName , 
    email: req.body.email
   };

//Uploading the data to the server
 async function run() {
     console.log(subscribingUser.firstName ,  subscribingUser.lastName) ;
const response = await mailchimp.lists.addListMember(listId, {
 email_address:  subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});

//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html") ;
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}

//Running the function and catching the errors (if any)

// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the failure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});



app.post("/failure" , function(req , res){
res.redirect("/") ;
}) ;



app.listen(process.env.PORT || 3000) ;

