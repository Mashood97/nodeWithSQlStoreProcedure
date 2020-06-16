const sqlDb = require('../core/db');
const sql = require('mssql');
const httpMsgs = require('../core/httpMsgs');
const util = require('util');

exports.insertIntoCompanySP = async function (req, resp, reqBody) {

    try {
        if (!reqBody) throw new Error('Input not valid');
        var data = JSON.parse(reqBody);
        if (data) {
            const pool = await sqlDb.poolPromise;
            const result = await pool.request()
                .input('companyName', sql.VarChar(50), data.companyName)
                .input('companyTotalEmp', sql.Int, data.companyTotalEmp)
                // .input('@responseMessage',sql.VarChar(50),value)
                .output('responseMessage', sql.VarChar(50))
                .execute('spAddToCompanys',function (err, recordsets, returnValue) {
                    // ... error checks
                    if (err) {
                        httpMsgs.show500(req, resp, err);
                    }
                    else {
                        console.dir(recordsets);
                        httpMsgs.send200(req, resp);
                    }
                    
                });
        }
        else {
            throw new Error('Input not valid');
        }
    }
    catch (ex) {
        console.log(ex);
        httpMsgs.show500(req, resp, ex);
    }



}