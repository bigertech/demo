var os = require('os');
var port = 8888;

function getHost() {
    var IPv4,hostName;
    hostName=os.hostname();
    for(var i=0;i<os.networkInterfaces().en0.length;i++){
        if(os.networkInterfaces().en0[i].family=='IPv4'){
            IPv4=os.networkInterfaces().en0[i].address;
        }
    }
    return hostName;
}
exports.host = getHost;
exports.port = port;






    // var temp = os.networkInterfaces()
    // temp['Local Area Connection'].forEach(function(val, index) {
    //     if (val['family'] === 'IPv4')
    //         host = val['address'];
    // })
    // return host;