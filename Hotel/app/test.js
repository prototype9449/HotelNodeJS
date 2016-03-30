'use strict'
var SqlRequest = new require('./sqlRequest');
var request = new SqlRequest({
   login : 'admin',
   password : 'admin'
});

let data = {
   FullName : 'fsdfsttf',
   Passport : '32423424',
   Sex : 0
};

request.insertClient(data).then(()=> {
   //request.deleteClient(data).then(() => {
   //   console.log('Success');
   //}).catch(console.log);
}).catch(console.log);

