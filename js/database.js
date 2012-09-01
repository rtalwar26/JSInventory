function Product(message){

    this.id = "";
    this.name = "";
    this.price = "";
    alert(message); //constructor

    this.showPrice = function(){
        alert("Rs. "+this.price);
    }
}

//adding properties and methods outside class definition

Product.prototype.colour = "";
Product.prototype.showColour = function(){

    alert("colour is "+this.colour);
}

// singleton class

var User = function(){
    this.name = "";
    this.password = "";         //this is a singleton class
    this.login = function(){
        return true;
    }

}

User = new User();




var myProduct = new Product();
//alert("class is "+Product.toString());


//Inheritance

var EmailMessage= function(subject)
{
    this.subject = subject;
    this.send = function(){
        alert("something");
    }
}

//Create a new empty class

var EventInvitation = new function(){};

EventInvitation.prototype = new EmailMessage();
EventInvitation.prototype.constructor = EventInvitation;

//Define the subject for all instances of EventInvitation class

EventInvitation.prototype.subject = "You are cordially invited";

//Create an instance

var myEventInvitaiton = new EventInvitation();
myEventInvitaiton.send();
//Inhetitance ended

//Poly morphism

var EmailMessage = function(subject) {
this.subject = subject;
}
// We wish to be able to extend this method later, // so it must be declared using the prototype keyword
 EmailMessage.prototype.send = function() {
     alert("Email message sent!");
 }


// Inherit EventInvitation class from EmailMessage
 var EventInvitation = function() {};
 EventInvitation.prototype = new EmailMessage("You are cordially invited to...");
 EventInvitation.constructor.prototype = EventInvitation;

 // Override the inherited send method
 EventInvitation.prototype.send = function() {
// Add code to the EventInvitation send method
 alert("Event invitation sent!");
// Find and execute the send method from the EmailMessage class //
// this.constructor.prototype refers to the EmailMessage class
this.constructor.prototype.send.call(this);
 }
//Polymorphism

try {

    if (!window.openDatabase)
    {
        alert('not supported');
    }
    else {
        var shortName = 'mydatabase';
        var version = '1.0';
        var displayName = 'My Important Database';
        var maxSize = 65536; // in bytes
        var db = openDatabase(shortName, version, displayName, maxSize);
    // You should have a database instance in db.
    }

} catch(e) {
    // Error handling code goes here.

    if (e == 2)
    { // Version number mismatch.

        alert("Invalid database version.");
    }
    else {
        alert("Unknown error "+e+".");

    }
 
}

alert("Database is: "+db);
 
createTables(db);

function nullDataHandler(transaction,results){}

function createTables(db)
{
    
    db.transaction(
        function(transaction)
        {
          
            transaction.executeSql('CREATE TABLE PEOPLE(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL DEFAULT "NO NAME",shirt TEXT NOT NULL DEFAULT "Purple");',[],nullDataHandler,errorHandler);

 
            transaction.executeSql('insert into PEOPLE(name,shirt) values("Joe","Green");',[],nullDataHandler,errorHandler);

            transaction.executeSql('insert into PEOPLE(name,shirt) values("Rajat","Orange");',[],nullDataHandler,errorHandler);

          var cityList = new Array("delhi","punjab","chandigarh");

          cityList.sort();

           
        }
        );
}


function errorHandler(transaction,error)
{


    var we_think = true;
    if(we_think) return true;
    return false;
}

function buttonHandler()
{

    alert("hey");
}