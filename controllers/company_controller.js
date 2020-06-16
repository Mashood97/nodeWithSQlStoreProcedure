const sqlDb = require('../core/db');
const sql = require('mssql');
const httpMsgs = require('../core/httpMsgs');
const util = require('util');




async function getpool() {
    const pool = await sqlDb.poolPromise;
    const result = await pool.request();
    return result;
}

exports.insertIntoCompanySP = async function (req, resp, reqBody) {

    try {
        if (!reqBody) throw new Error('Input not valid');
        var data = JSON.parse(reqBody);
        if (data) {
            const result = await getpool();
            result.input('companyName', sql.VarChar(50), data.companyName)
                .input('companyTotalEmp', sql.Int, data.companyTotalEmp)
                // .input('@responseMessage',sql.VarChar(50),value)
                .output('responseMessage', sql.VarChar(50))
                .execute('spAddToCompanys', function (err, data) {
                    // ... error checks
                    if (err) {
                        httpMsgs.show500(req, resp, err);
                    }
                    else {
                        console.dir(data['recordset']);
                        httpMsgs.sendJson(req, resp,data['recordset']);
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

exports.getCompanyData = async function (req, resp) {
    try {
        const result = await getpool();
        result.execute('spGetAllCompanies', function (err,data) {

            if (err) {
                httpMsgs.show500(req, resp, err);
            }
            else {
                console.dir(data['recordset']);
                httpMsgs.sendJson(req, resp,data['recordset']);
            }

        });
    }
    catch (ex) {
        console.log(ex);
        httpMsgs.show500(req, resp, ex);
    }
}