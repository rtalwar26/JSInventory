//*******************************************************************//
//Class Product Implementation

var Sale = function(){

}

Sale.prototype = new Model();
Sale.prototype.constructor = Sale;
Sale.prototype.name = "Sale";
Sale.prototype.createTableString = 'CREATE TABLE IF NOT EXISTS sales(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,date TEXT NOT NULL,  product_id INTEGER NOT NULL,salesid INTEGER  NOT NULL,quantity INTEGER  NOT NULL, price FLOAT NOT NULL,customer_id INTEGER  NOT NULL,customer_name TEXT NOT NULL,customer_phone TEXT NOT NULL,customer_address TEXT NOT NULL);';


Sale.prototype.validation = {

    id:{
        rule:"numeric",
        message:"id should be numeric"
    },
    product_id:{
        rule:"numeric",
        message:"Product id should be numeric"
    },
    salesid:{
        rule:"numeric",
        message:"salesid should be numeric "
    },
    customer_id:{
        rule:"numeric",
        message:"customer id should be numeric"
    },
     customer_phone:{
        rule:"text",
        message:"customer phone should be text"
    },
     customer_name:{
        rule:"text",
        message:"customer name should be text"
    },
     customer_address:{
        rule:"text",
        message:"customer address should be text"
    },
    quantity:{
        rule:"numeric",
        message:"quantity should be numeric"
    },
    price:{
        rule:"decimal",
        message:"price should be in decimal format"
    },
   date:{
        rule:"text",
        message:"Date should be in proper format"
    }


}
//********************************************************************//