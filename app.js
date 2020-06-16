
const server = require('./core/server');

// const sql = require('mssql');
// const settings = require('./settings');

// sql.on('error', err => {
//     // ... error handler
//     console.log(err);
// })


// sql.connect(settings.dbConfig).then(pool => {

//     // Stored procedure

//     return pool.request()
//         .input('companyName', sql.VarChar(50), 'Shangrilla')
//         .input('companyTotalEmp', sql.Int, 100)
//         // .input('@responseMessage',sql.VarChar(50),value)
//         .output('responseMessage', sql.VarChar(50))
//         .execute('spAddToCompanys')
// }).then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err);
//     // ... error checks
// })