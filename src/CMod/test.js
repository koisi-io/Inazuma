const client = require('./build/Release/client') ;
console.log("beg");
console.log(client.clientStart());
var poi= client.clientWking(3);
console.log(client.clientClose());
