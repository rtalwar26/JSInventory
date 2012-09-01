window.onload = function()
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

   myDB.transaction(
    function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS files(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, filedata_id INTEGER NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);', [], nullDataHandler, errorHandler);
        transaction.executeSql('CREATE TABLE IF NOT EXISTS filedata(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, datablob BLOB NOT NULL DEFAULT "");', [], nullDataHandler, errorHandler);
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
