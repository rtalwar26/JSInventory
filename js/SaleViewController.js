var currentSalesPage = 0;


function listSales()
{
    $("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    contentdiv.setAttribute('class', 'Product');
    var sale = new Sale();

var pageSize = 5;

var groupByStr = "select salesid,customer_name,date,sum(price*quantity) as totalPrice from sales group by salesid"+" ORDER BY id DESC"+" limit "+(pageSize*currentSalesPage)+","+pageSize;



  var salesResults ;

 var data = sale.sql(groupByStr,function(status,results){
   
        //alert('status is '+status);

        if(status)
        {
            // alert('read status is ' + status+'and result is'+results.rows.length);
            var table = document.createElement('table');
            table.setAttribute('width', '100%');
            table.innerHTML = '<tr><th>Customer Name</th><th>Sales id</th><th>Total Price</th><th>Date</th></tr>';
            contentdiv.appendChild(table);
            salesResults=results;
            for (var i=0; i<results.rows.length; i++)
            {
               


var salesElement = results.rows.item(i);
                      var htmlRow = document.createElement('tr');
                     
                      var str = '<td>'+salesElement['customer_name']+'</td><td><a href = \"#\" onclick=\"viewSale();\">'+salesElement['salesid']+'</a></td><td>'+salesElement['totalPrice']+'</td><td>'+salesElement['date']+'</td>';

//var str ='<td>'+i+'</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td>';
                         var tableRow = document.createElement('tr');
                         if(i%2)
                            tableRow.setAttribute('class', 'altrow');
                         tableRow.innerHTML = str;
                         table.appendChild(tableRow);

             }
             
            var saleNew = new Sale();

saleNew.sql("select count(DISTINCT salesid) as count from sales",function(status,results){

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
            
            if(i == (currentSalesPage +1))
            {
              divStr +="<a onclick=\"salePageClicked();\"href=\"#\"><b>"+i+"</b></a>";
            }
            else{
             divStr +="<a onclick=\"salePageClicked();\"href=\"#\">"+i+"</a>";
             }
             
          }
            tempDiv.innerHTML=divStr;
            
            contentdiv.appendChild(tempDiv);
            
              $("#contentdiv").fadeIn('fast');
              
              
              }});
          }
          
          
    });



  




}

function salePageClicked(){
var target = event.target;

currentSalesPage = target.innerHTML-1;
listSales();

}
function viewSale(){
  var target = event.target;

    saleView(target.innerHTML);
}

function saleView(id)
{
   $("#contentdiv").fadeOut(0);
       var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    contentdiv.setAttribute('class', 'Product');
   var aggregatePrice =0;
    var sale = new Sale();
var productIds = [];
var saleResults;
    sale.read("salesid="+id, 0, 100, function(status,results){

        if(status){
           
for(var i =0;i<results.rows.length;i++)
{
var saleElement = results.rows.item(i); 
productIds.push(saleElement["product_id"]);
}

saleResults= results;

var strId = '('+productIds.join(',')+')';


var product = new Product();
    product.read("id in "+strId, 0, 100, function(status,results){

        if(status){
        var table = document.createElement('table');
            table.setAttribute('width', '100%');
            table.innerHTML = '<tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total Price</th></tr>';
            contentdiv.appendChild(table);
        
        for(var j = 0 ; j<saleResults.rows.length;j++){
        
        var saleItem = saleResults.rows.item(j);
        
        var productItem ;
        
        for(k=0;k<results.rows.length;k++)
        {
        productItem = results.rows.item(k);
        
        if(productItem["id"]==saleItem["product_id"])
        break;
    
        }
          var htmlRow = document.createElement('tr');
                     aggregatePrice = aggregatePrice + productItem['price']*saleItem['quantity'];
                      var str = '<td>'+productItem['name']+'</td><td>'+saleItem['quantity']+'</td><td>'+productItem['price']+'</td><td>'+(productItem['price']*saleItem['quantity'])+'</td>';

//var str ='<td>'+i+'</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td>';
                         var tableRow = document.createElement('tr');
                         if(j%2)
                            tableRow.setAttribute('class', 'altrow');
                         tableRow.innerHTML = str;
                         table.appendChild(tableRow);

}

var saleItem = saleResults.rows.item(0);
var tempDiv = document.createElement("div");

var divText="<p><b>Customer Name: </b>"+saleItem["customer_name"]+"</p>";
divText+="<p><b>Customer Address: </b>"+saleItem["customer_address"]+"</p>";
divText+="<p><b>Customer Phone: </b>"+saleItem["customer_phone"]+"</p>";
divText+="<p><b>Order Date: </b>"+saleItem["date"]+"</p>";
divText+="<p><b>Order Total: </b>"+aggregatePrice+"</p>";

tempDiv.innerHTML=divText;

contentdiv.appendChild(tempDiv);

        }
        });
        
       
    $("#contentdiv").fadeIn('fast');

        }
    }
);


}

/*function listSales()
{
    $("#contentdiv").fadeOut(0);
    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
    contentdiv.setAttribute('class', 'Product');
    var sale = new Sale();

sale.sql(,function(status,results){
var groupByStr = "select salesid,customer_name,date,sum(price) as totalPrice from sales group by salesid";
if(status)
{
var element ;

for (var i =0 ; i<results.rows.length;i++)
{
element = results.rows.item(i);
}
}

});

var productArray=[];

  var salesResults ;

 var data = sale.read("1=1",0,100,function(status,results){
   
        //alert('status is '+status);

        if(status)
        {
            // alert('read status is ' + status+'and result is'+results.rows.length);
            var table = document.createElement('table');
            table.setAttribute('width', '100%');
            table.innerHTML = '<tr><th>Customer Name</th><th>Sales id</th><th>Product</th><th>Quantity</th><th>Price</th><th>Date</th></tr>';
            contentdiv.appendChild(table);
            salesResults=results;
            for (var i=0; i<results.rows.length; i++)
            {
               



                var row = results.rows.item(i);

if(!(row['product_id'] in productArray))
productArray.push(row['product_id']);

}

var strId = '('+productArray.join(',')+')';


var product = new Product();
    product.read("id in "+strId, 0, 100, function(status,results){

        if(status){
            var data=[];
            data['Product'] = results.rows.item(0);
            
            
                for(var i =0;i<salesResults.rows.length;i++)
                {
                var salesElement = salesResults.rows.item(i);
            var productElement = [] ;
            productElement['name']='not found';
                    for(j=0;j<results.rows.length;j++)
                    {
                    productElement = results.rows.item(j);
                            if(salesElement['product_id'] == productElement['id'])
                            {
                            break;
                            }
                     }
                      var htmlRow = document.createElement('tr');
                     
                      var str = '<td>'+salesElement['customer_name']+'</td><td>'+salesElement['salesid']+'</td><td>'+productElement['name']+'</td><td>'+salesElement['quantity']+'</td><td>'+salesElement['price']+'</td><td>'+salesElement['date']+'</td>';

//var str ='<td>'+i+'</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td><td>abc</td>';
                         var tableRow = document.createElement('tr');
                         if(i%2)
                            tableRow.setAttribute('class', 'altrow');
                         tableRow.innerHTML = str;
                         table.appendChild(tableRow);

                }
            }
           });

}

  $("#contentdiv").fadeIn('fast');
});



}*/



function saleDelete()
{
    var target = event.target;
    alert('delete '+target.getAttribute('name'));
}

function saleEdit(){

    var target = event.target;

    editCustomer(target.getAttribute('name'));
}

function editSale(id)
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

            form.appendChild(customer.createFormField('name', {
                value:data['Customer']['name']
            }));
            form.appendChild(customer.createFormField('phone', {
                value:data['Customer']['phone']
            }));
            form.appendChild(customer.createFormField('address', {
                value:data['Customer']['address']
            }));
            form.appendChild(customer.createFormField('id', {
                type:'hidden',
                value:id
            }));
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

function saleTableReorder(table)
{
    var childs = table.childNodes;

//alert($("#saleTable"));
//alert($('#saleTable').children('.Product'));
$('#saleTable').find('.Product').each(function(index){
    // $(this).val('rajat');
    $(this).attr('name','product_name.'+index);

    $(this).autocomplete(
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

var name = element.attr('name');

var arr = name.split(".");

var num = parseInt(arr[1]);

var string = "";

for(var i in row)
    {
        string+="<b>"+i+"</b>"+":"+row[i]+" ";
       
    }
//var string = "<b>Id: </b>";
//string+=row['id'];
//string+=" <b>Colour: </b>";
//string+=row['colour'];
//string+=" <b> Price: </b>";
//string+=row['price'];
string+="<input name=\"product_id."+num+"\" type=\"hidden\" value =\""+row['id']+"\">";
string+="<input name=\"price."+num+"\" type=\"hidden\" value =\""+row['price']+"\">";

element.parent().parent().find('.detailDiv').html(string);

    }
            });
//$(this).parent().parent().find('.detailDiv').html(row['colour']);
//$('.Product').each(function(index){
//
//    alert($(this).val());
//});
//alert(e.target);

//alert( $("input[name=product_id."+i+"]"));
//e.target.value = 'rajat';
//e.target.setAttribute("value", "rajat");
//e.target.value = "rajat";
//$(this).value = ui.item.value;
        //create formatted friend
        //			var friend = ui.item.value,
        //				span = $("<span>").text(friend),
        //				a = $("<a>").addClass("remove").attr({
        //					href: "javascript:",
        //					title: "Remove " + friend
        //				}).text("x").appendTo(span);
        //
        //				//add friend to friend div
        //				span.insertBefore("#to");
        },

        //define select handler
        change: function(e,ui) {
//            $('.Product').each(function(index){
//
//    alert($(this).val());
//});
        //prevent 'to' field being updated and correct position
        //$("#to").val("").css("top", 2);
        }
    });
});

$('#saleTable').find('.Quantity').each(function(index){
        $(this).attr('name','quantity.'+index);

});

}


function createSaleItemRow()
{
    var sale = new Sale();
    var row = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    td1.appendChild(sale.createFormField('product_name', {
        label:'Product',
        css:'Product'
    }));
        var detailDiv = document.createElement('div');
    detailDiv.setAttribute('class', 'detailDiv');
td1.appendChild(detailDiv);
    td1.appendChild(sale.createFormField('quantity', {
        css:'Quantity'
    }));


    var removeButton = document.createElement('a');
    removeButton.setAttribute('href', '#');
    removeButton.innerHTML='Remove';
    removeButton.setAttribute('class', 'removeSaleItem');

    removeButton.onclick= function(){

        var link = event.target;

        var row = link.parentNode.parentNode;
        var parent = row.parentNode;
        parent.removeChild(row);

        saleTableReorder(parent);
    }
    td2.appendChild(removeButton);

    row.appendChild(td1);
    row.appendChild(td2);

    return row;
}


function createNewSale()
{

    var sale = new Sale();
    var string = "";
    //for(var i in product.validation)
    //    {
    //        string = string + i;
    //    }
    //alert("creating new product"+ string);
    $("#contentdiv").fadeOut(0);

    var contentdiv = document.getElementById("contentdiv");
    contentdiv.innerHTML="";
 

    var form = sale.formStart('Sale');
    form.appendChild(sale.createFormField('customer_id', {
        label:'Customer'
    }));

   var detailDiv = document.createElement('div');
    detailDiv.setAttribute('class', 'detailDiv');
form.appendChild(detailDiv);


    form.appendChild(sale.createFormField('date', {'id':'saleDate'}));









    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));


    var saleItemTable = document.createElement('table');
    saleItemTable.setAttribute('id','saleTable');
    var row = createSaleItemRow();
    saleItemTable.appendChild(row);
    form.appendChild(saleItemTable);

    saleTableReorder(saleItemTable);




    var addButton = document.createElement('a');
    //    addButton.setAttribute('href', '');
    addButton.innerHTML='Add';
    addButton.setAttribute('class', 'addSaleItem');
    addButton.onclick= function(){

        saleItemTable.appendChild(createSaleItemRow());

        saleTableReorder(saleItemTable);

    };
    form.appendChild(addButton);

    //    form.appendChild(sale.createFormField('product_id', {label:'Product'}));
    //    form.appendChild(sale.createFormField('quantity', {}));


    form.appendChild(sale.formEnd(form, 'Create Sale', function(data){

//        for(var i in data['Sale']){
//      alert(i+'='+data['Sale'][i]);
//
//
//
//
//        }
var d = new Date();

var productArray = data['Sale']['product_id'];
var dateArray = [];

dateArray['month']= d.getMonth();
dateArray['date']= d.getDate();
dateArray['fullyear']= d.getFullYear();
dateArray['hours']= d.getHours();
dateArray['minutes']= d.getMinutes();
dateArray['seconds']= d.getSeconds();

var salesId = ""+d.getMonth()+d.getDate()+d.getFullYear()+d.getHours()+d.getMinutes()+d.getSeconds();
var count = 0;

var totalCount = productArray.length;
for(var i=0;i< productArray.length;i++)
    {

var dataSale = new Array();
dataSale['Sale']=[];
dataSale['Sale']['product_id']= parseInt(productArray[i]);
dataSale['Sale']['salesid']= salesId;
dataSale['Sale']['customer_id']= parseInt(data['Sale']['customer_id']);
dataSale['Sale']['customer_name']= data['Sale']['customer_name'];
dataSale['Sale']['customer_phone']= data['Sale']['customer_phone'];
dataSale['Sale']['customer_address']= data['Sale']['customer_address'];
dataSale['Sale']['price']= parseFloat(data['Sale']['price'][i]);
dataSale['Sale']['quantity']= parseInt(data['Sale']['quantity'][i]);
dataSale['Sale']['date']=data['Sale']['date'];

  //              var tmpsale = new Sale();
//tmpsale.drop(function(status,mesg){
//alert("Drop mesg"+mesg);
//}
//);

var tmpsale = new Sale();
      tmpsale.save(dataSale, function(status,result){

            if(status){
                //alert('Sale added successfully');
            }
            else //if(tmpsale.validationErrors[0])
            {
alert(result);
                //alert(tmpsale.validationErrors[0]);
            }
        });

 var product = new Product();


    product.read("id="+dataSale['Sale']['product_id'], 0, 1, function(status,results){
    
count ++;

if(count == totalCount)
{
alert("Sale stored successfully");

}
      if(status){
            var data=new Array();
            data['Product']= new Array();
            var resultRead = results.rows.item(0);
            //data['Product'] = results.rows.item(0);
            
            for (var key in resultRead)
            {
            data['Product'][key]= resultRead[key];
            }
            var soldQuant =  parseInt(dataSale['Sale']['quantity']);
            var newQuant = data['Product']['quantity'] - soldQuant;
        //    data['Product']['quantity']= data['Product']['quantity'] - parseInt(dataSale['Sale']['quantity']);
          
         data['Product']['quantity']= newQuant  ;
            var productS = new Product();
            
            productS.save(data,function(status,result){

                if(status){
                //alert('Product edited successfully');
            }
            else if(productS.validationErrors[0])
            {
                alert(productS.validationErrors[0]);
            }

            });
            
    }
    });
    

    }
    //    var tmpcustomer = new Customer();



    //        tmpcustomer.save(data, function(status,result){
    //
    //            if(status){
    //                alert('Customer added successfully');
    //            }
    //            else if(tmpcustomer.validationErrors[0])
    //            {
    //                alert(tmpcustomer.validationErrors[0]);
    //            }
    //        });
    //  alert("hey baby"+data['Product']['name'].toString());


    }));

    contentdiv.appendChild(form);
   

    $("input[name=customer_id]").autocomplete(
    {
        source:function(req,add){
            var optionsArray = [];
            var customer = new Customer();
            var data = customer.read("name like '%"+req['term']+"%'",0,100,function(status,results){
                if(status)
                {
                    for (var i=0; i<results.rows.length; i++) // for (var i=0; i<results.rows.length; i++)
                    {
                        var row = results.rows.item(i);

                        optionsArray.push(row['name']);
 
                    }
                    add(optionsArray);

                }
            });

        },
        select: function(e, ui) {
var row;
var element=$(this);
            var customer = new Customer();

            var data1 = customer.read("name like '"+ui.item.value+"'",0,100,function(status,results){
if(status)
    {
                                 row = results.rows.item(0);

//var name = element.attr('name');

//var arr = name.split(".");

//var num = parseInt(arr[1]);

var string = "";

for(var i in row)
    {
        string+="<b>"+i+"</b>"+":"+row[i]+" ";
       
    }
//var string = "<b>Id: </b>";
//string+=row['id'];
//string+=" <b>Colour: </b>";
//string+=row['colour'];
//string+=" <b> Price: </b>";
//string+=row['price'];
string+="<input name=\"customer_id\" type=\"hidden\" value =\""+row['id']+"\">";
string+="<input name=\"customer_name\" type=\"hidden\" value =\""+row['name']+"\">";
string+="<input name=\"customer_address\" type=\"hidden\" value =\""+row['address']+"\">";
string+="<input name=\"customer_phone\" type=\"hidden\" value =\""+row['phone']+"\">";

element.parent().parent().find('.detailDiv').html(string);

    }
        //create formatted friend
        //			var friend = ui.item.value,
        //				span = $("<span>").text(friend),
        //				a = $("<a>").addClass("remove").attr({
        //					href: "javascript:",
        //					title: "Remove " + friend
        //				}).text("x").appendTo(span);
        //
        //				//add friend to friend div
        //				span.insertBefore("#to");
        });
        
        
    }});



   



    $("#contentdiv").fadeIn('fast',function(){saleTableReorder(saleItemTable);


    $("#saleDate").datepicker();

        var db = systemDB;

//    var sqlString =  "INSERT INTO 'products' SELECT 'rajat' AS 'name', 'red' AS 'colour', '2' AS 'quantity','2.33' AS 'price'  UNION SELECT 'rohit', 'red','2','4.33' UNION SELECT 'aman', 'red','2','4.33' ";
//
//            db.transaction(
//            function (transaction) {
//
//                transaction.executeSql(sqlString, [], function(transaction,result){
//                    alert('success');
//                    //func(true,result);
//                },
//                function(transaction,error)
//                {
//                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
//                    alert(errorstr);
////                    func(false,errorstr);
//                }
//                );
//            }
//            );
});




}
