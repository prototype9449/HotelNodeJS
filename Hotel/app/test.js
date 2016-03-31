'use strict'
var SqlContext = new require('./repositories/sqlContext');
var request = new SqlContext({
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

request.Clients().updateClient(data, data1).then(()=> {
   console.log('success');
   //request.deleteClient(data).then(() => {
   //   console.log('Success');
   //}).catch(console.log);
}).catch(console.log);

