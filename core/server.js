var http = require('http');
var settings = require('../settings');
var httpMsgs = require('./httpMsgs');
var company = require('../controllers/company_controller');


http.createServer(function (req, resp) {
    switch (req.method) {
        case 'GET':
            break;
        case 'POST':
            if (req.url === '/PostCompany') {
                var reqBody = '';
                req.on('data', function (data) {
                    reqBody += data;
                    if (reqBody.length > 1e7) //10mb data
                    {
                        httpMsgs.show413(req, resp);
                    }
                });
                req.on("end",  function ()  {
                    company.insertIntoCompanySP(req, resp, reqBody);
                });

            }
            else {
                httpMsgs.show404(req, resp);
            }
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }

}).listen(settings.webPort, function () {
    console.log('Started listening at: ' + settings.webPort);
})