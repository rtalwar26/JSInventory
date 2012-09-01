//*******************************************************************//
//Class Customer Implementation

var Customer = function(){

}

Customer.prototype = new Model();
Customer.prototype.constructor = Customer;
Customer.prototype.name = "Customer";
Customer.prototype.createTableString = 'CREATE TABLE IF NOT EXISTS customers(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,phone TEXT NOT NULL,address TEXT NOT NULL);';


Customer.prototype.validation = {

    id:{
        rule:"numeric",
        message:"id should be numeric"
    },
    name:{
        rule:"alphanumeric",
        message:"Customer name should not contain special characters"
    },
    phone:{
        rule:"text",
        message:"phone should be in valid format should not contain special characters"
    },
    address:{
        rule:"text",
        message:"address should be in valid format"
    }



}
//*******************************************************************//