var systemDB;

function getDB()
{
    return systemDB;
}
/*! Initialize the systemDB global variable. */
function initDB()
{


    try {
        if (!window.openDatabase) {
            alert('not supported');
        } else {
            var shortName = 'inventory1';
            var version = '1.0';
            var displayName = 'My Important Database';
            var maxSize = 65536; // in bytes
            var myDB = openDatabase(shortName, version, displayName, maxSize);



        // You should have a database instance in myDB.

        }
    } catch(e) {
        // Error handling code goes here.
        if (e == INVALID_STATE_ERR) {
            // Version number mismatch.
            alert("Invalid database version.");
        } else {
            alert("Unknown error "+e+".");
        }
        return;
    }
    //createTables(myDB);
    systemDB = myDB;

}


var Model =  function()
{

    this.name = "Model";
    this.tableName = "models";
    this.createTableString="";
    var delgate;
    var readcallback ;
    var deletecallback;
    this.nullDataHandler = function(){}
    this.validation = null;
    this.validationErrors = null;
    this.errorHandler = function(transaction, error)
    {
        // error.message is a human-readable string.
        // error.code is a numeric error code
        alert('Oops.  Error was '+error.message+' (Code '+error.code+')');

        // Handle errors here
        var we_think_this_error_is_fatal = true;
        if (we_think_this_error_is_fatal) return true;
        return false;
    }
    this.validate = function(data)
    {

        var arr ;

        if(!data)
            return false;

        if(!data[this.name])
            return false;

        arr = data[this.name];





        for(var i in arr)
        {

            //for(var element in inputItem)
            //    {

            var validationrule = this.validation[i]['rule'];
            //if(element.getAttribute("id")==i)
            //

            var flag = true;

            if(validationrule === "alphanumeric")
            {
                var alregex = /^[0-9A-Za-z]+$/;
                flag = alregex.test(arr[i]);
            }
            else if(validationrule === "numeric")
            {
               // var numregex = /^\s*\d+\s*$/;
var numregex = /^-{0,1}\d+$/;
                flag = numregex.test(arr[i]);

            }
            else if(validationrule === "email")
            {
                var emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                flag = emailregex.test(arr[i]);

            }
            else if(validationrule === "decimal")
            {
                var decregex = /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/;
                flag = decregex.test(arr[i]);

            }
else if(validationrule === "notempty")
{
flag=arr[i].length;
}


            if(!flag)
            {
                var errorArray= new Array();
                errorArray.push(this.validation[i]['message']);


                this.validationErrors = errorArray;

                //formcallback(false);
                return false;
            }


        //formcallback(true);
        //            alert(model.validation[i]['rule']);

        //    }
        //alert(inputItem.toString());
        }
            
        return true;

    }


    this.getTableName = function()
    {
        var tableName = this.name;
        tableName = tableName.toLowerCase();

        var length  = tableName.length;
        var ch = tableName[length-1];

        if(ch != 'y')
        {
            return (tableName+"s");
        }
        else
        {
            var sliced = tableName.slice(0,(length-1));

            return (sliced+"ies");
        }

        var string = new String(ch);

        return string;
    }

    this.deleteHandler = function(transaction,results)
    {

    
        // Previous insert failed. Bail.

        //alert(results.rowsAffected)
        deletecallback(results.rowsAffected);
 



    }
    this.dataHandler = function(transaction, results)
    {
        // Handle the results

        readcallback(this.name,results);

        var string = "Green shirt list contains the following people:\n\n";

        for (var i=0; i<results.rows.length; i++) {
            // Each row is a standard JavaScript array indexed by
            // column names.
            var row = results.rows.item(i);
        //alert(row);

        //string = string + row['name'] + " (ID "+row['id']+")\n";
        }
    }

    this.del =function(whereclause,delcallback)
    {
        var sql = "DELETE from "+ this.getTableName()+" where "+whereclause;

        var db =systemDB;
        var product = this;

        deletecallback = delcallback;
        db.transaction(   //read transaction
            function (transaction) {

                transaction.executeSql(sql, [], product.deleteHandler, product.errorHandler);
            }
            );

    }

this.download = function(page,userid,url,func)
{
var db = systemDB;
        var product = this;
         var dataStr="";
var modelName = product.name;
var pageSize = 5;

     dataStr+="data[tableName]="+product.getTableName()+"&";
     dataStr+="data[pageSize]="+pageSize+"&";
     dataStr+="data[page]="+page+"&";
      dataStr+="data[userid]="+userid+"&";
                    $.ajax({
  type: 'POST',
  url: "",
  data: dataStr,
dataType:"json",
  success: function(result){
var json= jQuery.parseJSON(result);


  //console.log("response of pages",html);
if(json['response']['status']==1){
 if(json['data'].length != 0)
{

for(var i in json['data'])
{

var record = json['data'][i]['Record'];

var modelData=jQuery.parseJSON(record["text"]);
modelData['restore']=1;
var saveData = [];
saveData[modelName]=modelData;

 //var tmpproduct = new Product();

                product.save(saveData, function(status,result){

                    if(status){
                        //alert(tableName+' syncedown successfully');
                    }
                    else if(tmpproduct.validationErrors[0])
                    {
                        alert(tmpproduct.validationErrors[0]);
product.validationErrors=[];
                    }
                });


}

 product.download(page+pageSize,userid,url,func);


}
else
{
  func(true,json.response.mesg);
}
}
else{
func(false,json.response.mesg);
//func(false,json.response.mesg);
}
  //product.upload(page+pageSize,userid,url,func);
  },
  error:function(error){
  alert("error"+error);
  },
  dataType: "html"
});


     
}
this.upload = function(page,userid,url,func)
{
var pageSize = 5;
var sqlStr = "SELECT * from "+this.getTableName()+" order by id asc limit "+page+","+pageSize;

        var db = systemDB;
        var product = this;
         var dataStr="";
        db.transaction(
            function (transaction) {

                transaction.executeSql(sqlStr, [], function(transaction,result){
                    //func(true,result);
                    
                    if(result.rows.length == 0){
                    
                    if(page==0)
                        {                     
                            dataStr+="data[syncStart]=1&";
                        }

                     dataStr+="data[syncComplete]=1&";
                      dataStr+="data[tableName]="+product.getTableName()+"&";
                        dataStr+="data[userid]="+userid+"&";
                        
                        
                     $.ajax({
  type: 'POST',
  url: "",
  data: dataStr,
dataType:"json",
  success: function(result){
var json= jQuery.parseJSON(result);
 
if(json['response']['status']==1)
  func(true,json.response.mesg);
else{
func(false,json.response.mesg);
return;
 }
  },
  error:function(error){
  alert("error"+error);
  },
  dataType: "html"
});


                    return;
                    }
                    var idStr="";
                    
                   var data=[];
                  
                    for(var i =0;i<result.rows.length;i++)
                    {
                    var row =  result.rows.item(i);
                    
                    for(var j in row)
                    {
                    var key="data["+product.getTableName()+"]["+i+"][";
                      // var key=""+"Page"+"."+i+".";
                    key+=j+"]";
                    dataStr+=key+"="+encodeURIComponent(row[j])+"&";
                    
                    //data[key]= row[j];
                    }
                    
                    
                    //idStr+=row["id"];
                    //data.push(row);
                    }
                    
                    if(page==0)
                        {                     
                            dataStr+="data[syncStart]=1&";
                        }
                       
                        
//                    dataStr+="data[syncComplete]=0&";
                      dataStr+="data[tableName]="+product.getTableName()+"&";
                        dataStr+="data[userid]="+userid+"&";
                    //alert(idStr);
                    data=[];
                    data=[{hello:"world"}];
                    $.ajax({
  type: 'POST',
  url: "",
  data: dataStr,
  success: function(html){
   console.log("response of pages",html);
var json= jQuery.parseJSON(html);
 
if(json['response']['status']==1)
  func(true,json.response.mesg);
else{
func(false,json.response.mesg);
return;
 }


 
  //alert(html);
  product.upload(page+pageSize,userid,url,func);
  },
  error:function(error){
  alert("error"+error);
  },
  dataType: "html"
});
                    
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
  var errorArray= new Array();
                errorArray.push(errorstr );


                product.validationErrors = errorArray;
                    func(false,errorstr);
                }
                );
            }
            );

}

this.syncDown = function(userid,url,func){
var page = 0;
this.download(page,userid,url,func);
}
this.sync = function(userid,url,func)
{




var page = 0;

this.upload(page,userid,url,func);
        





}
this.sql=function(str,func)
{
 var sqlstr = str;
//var sqlstr = "select * from products;"
        var product = this;
        var db = systemDB;


//        db.transaction(   //read transaction
//            function(transaction) {
//
//                transaction.executeSql('create table hello(id INTEGER,name TEXT);',[], function(transaction,results){alert('love');}, function(transaction,error){alert('error');});
//
//                 }
//    );
var data = null;
        db.transaction(
            function (transaction) {

                transaction.executeSql(sqlstr, [], function(transaction,result){
                    data = result;
                    func(true,result);
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
                    func(false,errorstr);
                }
                );
            }
            );

                return data;
}

    this.read= function(whereclause,offset,limit,func)
    {
        
        var sqlstr = 'SELECT * from '+ this.getTableName()+' where '+whereclause+' limit '+offset+','+limit+';';
//var sqlstr = "select * from products;"
        var product = this;
        var db = systemDB;


//        db.transaction(   //read transaction
//            function(transaction) {
//
//                transaction.executeSql('create table hello(id INTEGER,name TEXT);',[], function(transaction,results){alert('love');}, function(transaction,error){alert('error');});
//
//                 }
//    );
var data = null;
        db.transaction(
            function (transaction) {

                transaction.executeSql(sqlstr, [], function(transaction,result){
                    data = result;
                    func(true,result);
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
                    func(false,errorstr);
                }
                );
            }
            );

                return data;

 }

this.edit = function(data,func)
{
var id = data[this.name]['id'];

var arr = data[this.name];
var str = "";
for(var i in arr)
    {
        if(i==='id')
            continue;
        
        str =str+i+" = \""+data[this.name][i]+'\",';
    }

        str = str.slice(0, str.length-1);

        var sqlString = "UPDATE "+this.getTableName()+" set "+str+" where id = "+id+";";

        if(!this.validate(data)){
            func(false,"Error occurred");
            return false;
        }
        var db = systemDB;
        var product = this;
        db.transaction(
            function (transaction) {

                transaction.executeSql(sqlString, [], function(transaction,result){
                    func(true,result);
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
  var errorArray= new Array();
                errorArray.push(errorstr );


                product.validationErrors = errorArray;
                    func(false,errorstr);
                }
                );
            }
            );


}

this.truncate = function(func)
{
var sqlString = "delete from "+this.getTableName()+" where 1=1;";
var db = systemDB;

      var product = this;
        db.transaction(   //save transaction
            function (transaction) {

                transaction.executeSql(product.createTableString, [], product.nullDataHandler, product.errorHandler);
            }
            );
            
            
 db.transaction(
            function (transaction) {

                transaction.executeSql(sqlString, [], function(transaction,result){
                    func(true,result);
                    
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');
                    func(false,errorstr);
                   
                }
                );
            }
            );


}
    this.save = function(data,func)
    {

if(data[this.name]['restore'])
{
delete(data[this.name]['restore']);
}
else if(data[this.name]['id'])
    {
        this.edit(data,func);
        return;
    }
        //delgate=delegate;
        callback=func;
        var db = systemDB;

        var string = "";
        var names = "";
        var values = "";

        var arr = data[this.name];

        for(var i in arr)
        {
            string = string+i;
            names = names +i+",";
            values = values +"\""+arr[i]+"\",";
        }
        names = names.slice(0, names.length-1);
        values = values.slice(0,values.length-1);
    
   
        var sqlString = "insert into "+this.getTableName()+"("+names+") values("+values+");";

        var product = this;
        db.transaction(   //save transaction
            function (transaction) {

                transaction.executeSql(product.createTableString, [], product.nullDataHandler, product.errorHandler);
            }
            );



        if(!this.validate(data)){
            func(false,"Error occurred");
            return false;
        }
        db.transaction(
            function (transaction) {

                transaction.executeSql(sqlString, [], function(transaction,result){
                    func(true,result);
                },
                function(transaction,error)
                {
                    var errorstr = ('Oops.  Error was '+error.message+' (Code '+error.code+')');

  var errorArray= new Array();
                errorArray.push(errorstr );


                product.validationErrors = errorArray;
                    func(false,errorstr);
                }
                );
            }
            );

        return true;
    }

    this.submitForm = function(event)
    {
        var button = event.target;

        var form = button.parentNode;
        
        alert(this.value);
        for(var i in this.validation)
        {

            var inputItem = form.getElementById(i);
            alert(inputItem.value);
        }
    //alert("submit was catched"+form);
    }
this.formStart = function(name)
{
            var form = document.createElement("form");
        form.setAttribute('class',name);

        return form;
}

this.formEnd = function(form,title,callback)
{
     var submit = document.createElement("input");
        submit.setAttribute('name', 'submit');
        submit.setAttribute("type", "button");
        submit.setAttribute("value", title);
submit.setAttribute('class', 'submit');
       // form.appendChild(submit);

        var model = this;
        submit.onclick = function(){

          //  var form = this.parentNode;
            var arr = new Array();
            arr[model.name]=new Array();
            for(var x in form.elements){
                //alert("hell"+x);
                var element = form.elements[x];


                if(!(typeof element === "object"))
                    continue;
                if(form.elements[x].getAttribute('type') === 'button')
                    continue;
                if(!element)
                    continue;

                //alert(element);
         var elementName =       form.elements[x].getAttribute('name')

         var nameArray = elementName.split(".");

 if(nameArray.length>1)
{
    if(!arr[model.name][nameArray[0]])
       arr[model.name][nameArray[0]]=[];

   arr[model.name][nameArray[0]].push(form.elements[x].value);
}
else{
                arr[model.name][form.elements[x].getAttribute('name')]=form.elements[x].value;
}
//alert('dh'+form.elements[x].getAttribute('name')+' '+form.elements[x].value);
//alert(arr[model.name][form.elements[x].getAttribute('name')]);
            }
//alert(arr[model.name]['customer_id']);

//for(var i in arr)
   // alert("hii"+i);
            callback(arr);

        };

        return submit;
}


this.createFormField = function(name,attributes)
{

    var ptag= document.createElement('p');
            var label = document.createElement("label");
            label.innerHTML = name;

if(attributes && attributes['label'])
    label.innerHTML = attributes['label'];

    var inputElement = document.createElement('input');
inputElement.setAttribute('type', 'textfield');
inputElement.setAttribute('class', 'textfield');
inputElement.setAttribute('name', name);

    for(var i in attributes)
        {

if(i==='css')
    {
        inputElement.setAttribute('class', attributes[i]);
        continue;
    }
            if(i==='options' || i==='label')
                continue;

if(attributes[i]==='hidden')
    label.innerHTML='';

            inputElement.setAttribute(i, attributes[i]);
        }

ptag.appendChild(inputElement);

ptag.appendChild(label);

        return ptag;
}
    this.createForm = function(data,formcallback)
    {

        var arr=null;
        if(data)
            arr = data[this.name];

        var form = document.createElement("form");
        form.setAttribute('class', this.name);
        for(var i in this.validation )
        {

var ptag= document.createElement('p');

            var inputElement = document.createElement("input");
            inputElement.setAttribute("type", "textfield");
            inputElement.setAttribute("id", i);
            inputElement.setAttribute("name", i);
inputElement.setAttribute('class', 'textfield')
            if(arr && arr[i])
            {
                inputElement.setAttribute('value', arr[i]);
            }
            var label = document.createElement("label");
            label.innerHTML = i;

ptag.appendChild(inputElement);

            ptag.appendChild(label);
            form.appendChild(ptag);

            //form.appendChild(inputElement);
        //            form.appendChild(document.createElement("br"));
        }

       
     
        return form;
    }


}
