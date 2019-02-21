const CMlib = $.import('xsjs.coffeemachine', 'coffeemachine').coffeemachine;
const cmLib = new CMlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT : {
                    cmLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    cmLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    cmLib.doDelete($.request.parameters.get("cmid"));
                    break;
                }
                case $.net.http.GET : {
                    cmLib.doGet();
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
