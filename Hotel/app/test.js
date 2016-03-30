'use strict'
var SqlRequest = new require('./sqlRequest');
var request = new SqlRequest({
   login : 'admin',
   password : 'admin'
});

let data = {
   Id : 28,
   FullName : 'SomeName',
   Passport : 'Passport',
   Sex : 0
};

let data1 = {
   Id : 28,
   FullName : '2222',
   Passport : '32423424',
   Sex : 0
};

request.updateClient(data, data1).then(()=> {
   console.log('success');
   //request.deleteClient(data).then(() => {
   //   console.log('Success');
   //}).catch(console.log);
}).catch(console.log);

