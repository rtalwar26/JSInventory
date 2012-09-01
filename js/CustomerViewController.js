var currentCutomerPage = 0;


function listCustomers()
{
    $("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    contentdiv.setAttribute('class', 'Customer');
    var customer = new Customer();




    //   systemDB.transaction(
    //    function (transaction) {
    //        transaction.executeSql('CREATE TABLE IF NOT EXISTS products(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,colour TEXT NOT NULL, price FLOAT NOT NULL);', [], nullDataHandler, errorHandler);
    //       // transaction.executeSql('CREATE TABLE IF NOT EXISTS filedata(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, datablob BLOB NOT NULL DEFAULT "");', [], nullDataHandler, errorHandler);
    //    }
    //);

    //        db.transaction(   //read transaction
    //            function(transaction) {
    //
    //                transaction.executeSql('CREATE TABLE IF NOT EXISTS hello(id INTEGER,name TEXT);',[],datahandler,errorhandler);
    //
    //                 }
    //    );

var pageSize = 5;
    var data = customer.read("1=1",currentCutomerPage*pageSize,pageSize,function(status,results){

        //alert('status is '+status);

        if(status)
        {
            //alert(results.toJSONString());
            // alert('read status is ' + status+'and result is'+results.rows.length);
            var table = document.createElement('table');
            table.setAttribute('width', '100%');
            table.innerHTML = '<tr><th>Name</th><th>Phone</th><th>Address</th><th>Actions</th></tr>';
            contentdiv.appendChild(table);
            for (var i=0; i<results.rows.length; i++)
            {
                var htmlRow = document.createElement('tr');



                var row = results.rows.item(i);

                var str = '<td>'+row['name']+'</td><td>'+row['phone']+'</td><td>'+row['address']+'</td><td><a onclick=\"customerEdit();\" name =\"'+row['id']+'\" href="#">Edit</a><a onclick=\"customerDelete();\" name =\"'+row['id']+'\" href="#">Delete</a></td>';

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
var customertNew = new Customer();

customertNew.sql("select count(*) as count from customers",function(status,results){

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
            
            if(i == (currentCutomerPage+1))
            {
              divStr +="<a onclick=\"customerPageClicked();\"href=\"#\"><b>"+i+"</b></a>";
            }
            else{
             divStr +="<a onclick=\"customerPageClicked();\"href=\"#\">"+i+"</a>";
             }
             
          }
            tempDiv.innerHTML=divStr;
            
            contentdiv.appendChild(tempDiv);
            
              $("#contentdiv").fadeIn('fast');
              
              
              }});

           
        }
    });


    //alert("reached here");
    //for(var i in data)
    //    {
    //        contentdiv.write(data[i]['Product']['name']);
    //    }
    //        var  temptableView = new UITableView(this);
    //    mainNameSpace.tableView = temptableView;
    //
    //       mainNameSpace.tableView.view.setAttribute("id", "productsTable");
    //    contentdiv.appendChild(mainNameSpace.tableView.view);
}
function customerPageClicked(){
var target = event.target;

currentCutomerPage = target.innerHTML-1;
listCustomers();

}
function customerDelete()
{
    var target = event.target;
    alert('delete '+target.getAttribute('name'));
}

function customerEdit(){

    var target = event.target;

    editCustomer(target.getAttribute('name'));
}

function editCustomer(id)
{
    var customer = new Customer();

    customer.read("id="+id, 0, 1, function(status,results){

        if(status){
            var data=[];
            data['Customer'] = results.rows.item(0);

            var customer = new Customer();
            var string = "";
            //for(var i in product.validation)
            //    {
            //        string = string + i;
            //    }
            //alert("creating new product"+ string);
            $("#contentdiv").fadeOut(0);

            var contentdiv = document.getElementById("contentdiv");
            contentdiv.innerHTML="";


            var form = customer.formStart('Cutomer');

            form.appendChild(customer.createFormField('name', {value:data['Customer']['name']}));
            form.appendChild(customer.createFormField('phone', {value:data['Customer']['phone']}));
            form.appendChild(customer.createFormField('address', {value:data['Customer']['address']}));
            form.appendChild(customer.createFormField('id', {type:'hidden',value:id}));
            form.appendChild(customer.formEnd(form, 'Edit Customer', function(data){

                var tmpcustomer = new Customer();

                tmpcustomer.save(data, function(status,result){

                    if(status){
                        alert('Customer edited successfully');
                    }
                    else if(tmpcustomer.validationErrors[0])
                    {
                        alert(tmpcustomer.validationErrors[0]);
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

function createNewCustomer()
{

    var customer = new Customer();
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
    data['Customer'] = [];
    data['Customer']['id']=1;
    data['Customer']['name']='nike';

    var form = customer.formStart('Customer');

    form.appendChild(customer.createFormField('name', {}));
    form.appendChild(customer.createFormField('phone', {}));
    form.appendChild(customer.createFormField('address', {}));
    form.appendChild(customer.formEnd(form, 'Create Customer', function(data){

        var tmpcustomer = new Customer();

        tmpcustomer.save(data, function(status,result){

            if(status){
                alert('Customer added successfully');
            }
            else if(tmpcustomer.validationErrors[0])
            {
                alert(tmpcustomer.validationErrors[0]);
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
        globals.setAttribute("customers", results);

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
