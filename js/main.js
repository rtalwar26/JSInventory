var mainNameSpace = {
    numberofrows : null,
    readResults : null,
    tableView:null

}
var loggedIn = false;

//var editProductId=-1;
var currentProductPage = 0;

//var numberofrows = 5;
// var tableView;
// var readResults;
window.onload = function()
{

    initDB();

    //var model = new Model();
    var product = new Product();

    var arr = new Array();
    //arr['id']=13;
    arr['name']="nokiac3";
    arr['price']=100.00;
    arr['colour']="gold";

    var productArr = new Array();

    productArr['Product']=arr;

    //    product.save(productArr,function(status,mesg){
    //
    //        alert('status is '+status);
    //    });

    //product.read("1 = 1", 0, 10, readcallback);

    //product.del('id > 5', delcallback)
    //alert("tablaaae name is "+product.getTableName());

    //alert(product.name);
    //    var contentdiv = document.getElementById("contentdiv");
    //
    //    var  temptableView = new UITableView(this);
    //    mainNameSpace.tableView = temptableView;

    //   function tableViewNumberOfRows(table)
    //    {
    //
    //        return 3;
    //    }
    //    mainNameSpace.tableView.view.setAttribute("id", "productsTable");
    //    contentdiv.appendChild(mainNameSpace.tableView.view);



    //    var button = document.createElement("input");
    //    button.setAttribute("value", "clickme");
    //    button.setAttribute("type", "button");
    //
    //    button.name="click me";
    //    button.onclick = function(){
    //        mainNameSpace.tableView.reloadData();
    //    };


    //    var createbutton = button.cloneNode(false);
    //    createbutton.setAttribute("value", "create new product");
    //
    //    createbutton.onclick = createNewProduct;
    //
    //    contentdiv.appendChild(button);
    //    contentdiv.appendChild(createbutton);
    $('#nav a').bind('click', navLinkPressed);


    //delete tableView;

}
function rajat(status,result)
{
    alert('status is' + status);
}
function navLinkPressed(){


    var name;

    if(event.target)
        name = event.target.getAttribute('name');

    if(name === "addNewProduct")
        createNewProduct();

    else if(name === "listProducts")
        listProducts();

      else if(name === "listCustomers")
        listCustomers();
      else if(name === "addNewCustomer")
        createNewCustomer();
    else if(name === "addNewSale")
        createNewSale();
else if(name === "listSales")
listSales();
else if(name === "searchProduct")
searchProduct();
else if(name === "searchCustomer")
searchCustomer();
else if(checkLogin() && name === "syncUp")
{
syncUp();
}
else if(checkLogin() && name === "syncDown"){

syncDown();
}
    else
        {
        //alert('not available');
        }



}

function checkLogin()
{
return false;
if(!loggedIn)
{
window.location = "https://accounts.google.com/o/oauth2/auth?client_id=702786231667-3miqhdhjpgtsjjl6o2r4faenosm4vopf.apps.googleusercontent.com&redirect_uri=http://www.delvelogic.com/JSInventory/index.php&scope=https://www.google.com/m8/feeds&response_type=code";
  
  return false;

}

return true;

}
function syncUp()
{

 var product= new Product();
product.sync("2323","2",function(status,result){
alert("completed syncup "+result+" with status "+status);
var sale = new Sale();
sale.sync("2323","2",function(status,result){
alert("completed syncup "+result+" with status "+status);
var customer = new Customer();
customer.sync("2323","2",function(status,result){
alert("completed syncup "+result+" with status "+status);
});
});

});
}

function syncDown()
{

 var product= new Product();
product.truncate(function(status,result){

product.syncDown ("2323","2",function(status,result){
alert("completed syncdown products "+result);
 var sale= new Sale();
sale.truncate(function(status,result){

sale.syncDown ("2323","2",function(status,result){
alert("completed syncdown sales"+result);
 var customer= new Customer();
customer.truncate(function(status,result){

customer.syncDown("2323","2",function(status,result){
alert("completed syncdown customers "+result);
});


});


});


});
});
});
}


function searchCustomer()
{
$("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";

var selectTag = document.createElement('p');
selectTag.innerHTML = "Search Customer by name";


var inputField = document.createElement('input');

inputField.setAttribute('class','textfield');
inputField.setAttribute('type','textfield');
inputField.setAttribute('name','searchField');

contentdiv.appendChild(selectTag);

contentdiv.appendChild(inputField);

var divTag = document.createElement("div");

divTag.innerHTML = "<a id=\"customerEditLink\" onclick=\"customerEdit();\" name =\"-1\" href=\"#\">View & Edit</a>";

contentdiv.appendChild(divTag);
    $("#contentdiv").fadeIn('fast');





//----------------------------autocomplete---------------------------------/
 $(inputField ).autocomplete(
    {
        source:function(req,add){
            var optionsArray = [];
            var customer= new Customer();
            var data = customer.read("name like '%"+req['term']+"%'",0,100,function(status,results){
                if(status)
                {
                    for (var i=0; i<results.rows.length; i++) // for (var i=0; i<results.rows.length; i++)
                    {
                        var row = results.rows.item(i);

var optionString =row['name'];

//var optionString = "name:"+row['name']+" colour:"+row['colour']+" quantity:"+row['quantity']+" price:"+row['price'];

                        optionsArray.push(optionString);

                    }
                    add(optionsArray);

                }
            });

        },
        select: function(e, ui) {

var row;
var element=$(this);
            var customer= new Customer();

            var data1 = customer.read("name like '"+ui.item.value+"'",0,100,function(status,results){
if(status)
    {
                                 row = results.rows.item(0);

//editProductId = row["id"];
$('#customerEditLink').attr('name',row["id"]);
    }
            });




        },

        //define select handler
        change: function(e,ui) {
$('#customerEditLink').attr('name',-1);
        //prevent 'to' field being updated and correct position
        //$("#to").val("").css("top", 2);
        }
    });

//----------------------------autocomplete---------------------------------/

}

function searchProduct()
{
$("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";



var selectTag = document.createElement('p');
selectTag.innerHTML = "Search Product by name";


var inputField = document.createElement('input');

inputField.setAttribute('class','textfield');
inputField.setAttribute('type','textfield');
inputField.setAttribute('name','searchField');

contentdiv.appendChild(selectTag);

contentdiv.appendChild(inputField);

var divTag = document.createElement("div");

divTag.innerHTML = "<a id=\"searchProductLink\" onclick=\"productEdit();\" name =\"-1\" href=\"#\">View & Edit</a>";

contentdiv.appendChild(divTag);
    $("#contentdiv").fadeIn('fast');





//----------------------------autocomplete---------------------------------/
 $(inputField ).autocomplete(
    {
        source:function(req,add){
            var optionsArray = [];
            var product = new Product();
            var data = product.read("name like '%"+req['term']+"%'",0,100,function(status,results){
                if(status)
                {
                    for (var i=0; i<results.rows.length; i++) // for (var i=0; i<results.rows.length; i++)
                    {
                        var row = results.rows.item(i);

var optionString =row['name'];

//var optionString = "name:"+row['name']+" colour:"+row['colour']+" quantity:"+row['quantity']+" price:"+row['price'];

                        optionsArray.push(optionString);

                    }
                    add(optionsArray);

                }
            });

        },
        select: function(e, ui) {

var row;
var element=$(this);
            var product = new Product();

            var data1 = product.read("name like '"+ui.item.value+"'",0,100,function(status,results){
if(status)
    {
                                 row = results.rows.item(0);

//editProductId = row["id"];
$('#searchProductLink').attr('name',row["id"]);
    }
            });




        },

        //define select handler
        change: function(e,ui) {
$('#searchProductLink').attr('name',-1);
        //prevent 'to' field being updated and correct position
        //$("#to").val("").css("top", 2);
        }
    });

//----------------------------autocomplete---------------------------------/

}

function listProducts()
{
    $("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    contentdiv.setAttribute('class', 'Product');
    var product = new Product();


var pageSize = 5;

  

    var data = product.read("1=1",currentProductPage*pageSize,pageSize,function(status,results){

        //alert('status is '+status);

        if(status)
        {
            // alert('read status is ' + status+'and result is'+results.rows.length);
            var table = document.createElement('table');
            table.setAttribute('width', '100%');
            table.innerHTML = '<tr><th>Name</th><th>Colour</th><th>Quantity</th><th>Price</th><th>Actions</th></tr>';
            contentdiv.appendChild(table);
            for (var i=0; i<results.rows.length; i++)
            {
                var htmlRow = document.createElement('tr');



                var row = results.rows.item(i);

                var str = '<td>'+row['name']+'</td><td>'+row['colour']+'</td><td>'+row['quantity']+'</td><td>'+row['price']+'</td><td><a onclick=\"productEdit();\" name =\"'+row['id']+'\" href="#">Edit</a><a onclick=\"productDelete();\" name =\"'+row['id']+'\" href="#">Delete</a></td>';

                var tableRow = document.createElement('tr');
                if(i%2)
                    tableRow.setAttribute('class', 'altrow');
                tableRow.innerHTML = str;
                table.appendChild(tableRow);

                //        var label = document.createElement('p');
                //        label.innerHTML = row['name']+' '+row['colour']+' '+row['price'];
                //        contentdiv.appendChild(label);
                //contentdiv.write(row['name']);
            }

 var productNew = new Product();

productNew.sql("select count(*) as count from products",function(status,results){

        //alert('status is '+status);

        if(status)
        {
            // alert('read status is ' + status+'and result is'
            var row = results.rows.item(0);
            var totalCount = row["count"];
             var pages = totalCount/pageSize +1;
            var tempDiv = document.createElement("div");
            var divStr="<b>Pages:  </b>";
            for(var i =1;i<=pages;i++){
            
            if(i == (currentProductPage+1))
            {
              divStr +="<a onclick=\"pageClicked();\"href=\"#\"><b>"+i+"</b></a>";
            }
            else{
             divStr +="<a onclick=\"pageClicked();\"href=\"#\">"+i+"</a>";
             }
             
          }
            tempDiv.innerHTML=divStr;
            
            contentdiv.appendChild(tempDiv);
            
              $("#contentdiv").fadeIn('fast');
              
              
              }});
            
          
        }
    });



}

function pageClicked(){
var target = event.target;

currentProductPage = target.innerHTML-1;
listProducts();

}

function productDelete()
{
var target = event.target;
var product = new Product();
product.del("id = "+target.getAttribute('name')+";");
    
    alert('delete '+target.getAttribute('name'));
}

function productEdit(){

    var target = event.target;

    editProduct(target.getAttribute('name'));
}

function editProduct(id)
{
    var product = new Product();

    product.read("id="+id, 0, 1, function(status,results){

        if(status){
            var data=[];
            data['Product'] = results.rows.item(0);

            var product = new Product();
            var string = "";
            //for(var i in product.validation)
            //    {
            //        string = string + i;
            //    }
            //alert("creating new product"+ string);
            $("#contentdiv").fadeOut(0);

            var contentdiv = document.getElementById("contentdiv");
            contentdiv.innerHTML="";


            var form = product.formStart('Product');

            form.appendChild(product.createFormField('name', {value:data['Product']['name']}));
            form.appendChild(product.createFormField('colour', {value:data['Product']['colour']}));
                        form.appendChild(product.createFormField('quantity', {value:data['Product']['quantity']}));

            form.appendChild(product.createFormField('price', {value:data['Product']['price']}));
            form.appendChild(product.createFormField('id', {type:'hidden',value:id}));
            form.appendChild(product.formEnd(form, 'Edit Product', function(data){

                var tmpproduct = new Product();

                tmpproduct.save(data, function(status,result){

                    if(status){
                        alert('Product edited successfully');
                    }
                    else if(tmpproduct.validationErrors[0])
                    {
                        alert(tmpproduct.validationErrors[0]);
                    }
                });
                //  alert("hey baby"+data['Product']['name'].toString());


            }));
            

               contentdiv.appendChild(form);
    $("#contentdiv").fadeIn('fast');

        }
    }
);


}



function errorHandler(transaction, error)
{
    // error.message is a human-readable string.
    // error.code is a numeric error code
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');

    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}

/*! This is used as a data handler for a request that should return no data. */
function nullDataHandler(transaction, results)
{
}

function createNewProduct()
{

    var product = new Product();
    var string = "";
    //for(var i in product.validation)
    //    {
    //        string = string + i;
    //    }
    //alert("creating new product"+ string);
    $("#contentdiv").fadeOut(0);

    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    var data = new Array();
    data['Product'] = [];
    data['Product']['id']=1;
    data['Product']['name']='nike';

    var form = product.formStart('Product');

    form.appendChild(product.createFormField('name', {}));
    form.appendChild(product.createFormField('colour', {}));
        form.appendChild(product.createFormField('quantity', {}));

    form.appendChild(product.createFormField('price', {}));
    form.appendChild(product.formEnd(form, 'Create Product', function(data){

        var tmpproduct = new Product();

        tmpproduct.save(data, function(status,result){

            if(status){
                alert('Product added successfully');
            }
            else if(tmpproduct.validationErrors[0])
            {
                alert(tmpproduct.validationErrors[0]);
            }
        });
        //  alert("hey baby"+data['Product']['name'].toString());


    }));

    contentdiv.appendChild(form);
    $("#contentdiv").fadeIn('fast');


    //    contentdiv.appendChild(product.createForm(null,function(data){
    //
    //        alert("hey baby"+data['Product'].toString());
    //    }
    //
    //    ));

}

function formcallback(formdata)
{
    alert("form submit status is "+status);
}
function delcallback(flag)
{
    if(flag)
    {
        alert("deletion was successfull "+flag);
    }
    else{
        alert("deletion failed "+flag);
    }
}
function readcallback(modelname,results)
{
    var string = "";
    for (var i=0; i<results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by
        // column names.
        var row = results.rows.item(i);
        //alert(row);

        string = string + row['name'] + " (ID "+row['id']+")\n";
    }

    var globals = document.getElementById("page_globals");
    if(globals)
        globals.setAttribute("products", results);

    //alert(string);
    mainNameSpace.readResults = results;
    mainNameSpace.tableView.reloadData();

    //alert(string);
}
//alert("main is "+this.toString());

function tableViewNumberOfRows(table)
{
    //var globals = document.getElementById("page_globals");
    //
    //if(!globals)
    //    {
    //        return 0;
    //    }
    //var results = globals.getAttribute("products");
    var product = new Product();

    //var data =product.read("1==1", 0, 100, null);

    //    if(mainNameSpace.readResults)
    //        return mainNameSpace.readResults.rows.length;

    return 0;
}

function rowAtIndex(table,i)
{
    //var globals = document.getElementById("page_globals");
    //var results = globals.getAttribute("products");

    var rowdata = mainNameSpace.readResults.rows.item(i);

    var row = document.createElement("tr");
    row.innerHTML = "<td>"+i+"</td><td>"+ rowdata['name']+"</td><td>"+rowdata['colour']+"</td>"+"<td>"+rowdata['price']+"</td>";
    row.setAttribute("id", rowdata['id']);
    return row;
}
