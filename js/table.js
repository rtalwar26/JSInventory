

var UITableView =  function(delegateObject)
{

    this.view= document.createElement("table");
    this.delegate=delegateObject ;


    //    this.makeTable = function(delegate)
    //    {
    //        this.table =


    //  var num = tableViewNumberOfRows.call(delegate,this);


 var num = this.delegate.tableViewNumberOfRows(this);

    //  var num = 3;
    var string = "";
    for(var i = 0;i< num;i++)
    {

        var cell = this.delegate.rowAtIndex(this,i);

        this.view.appendChild(cell);
    //string = string + "<tr><td>name</td><td>value</td></tr>";
    }
    ////this.table.innerHTML= string;

this.reloadData = function()
{
//    var table = this.view;

//alert("table is" +this.view);
    while (this.view.hasChildNodes()) {
        this.view.removeChild(this.view.firstChild);
    }

    var num = this.delegate.tableViewNumberOfRows(this);

    //  var num = 3;
    var string = "";
    for(var i = 0;i< num;i++)
    {

        var cell = this.delegate.rowAtIndex(this,i);

        this.view.appendChild(cell);
    //string = string + "<tr><td>name</td><td>value</td></tr>";
    }





}
}

