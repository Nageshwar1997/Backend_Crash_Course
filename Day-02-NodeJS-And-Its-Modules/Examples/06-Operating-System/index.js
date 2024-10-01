const os = require("os");
// console.log("OS", os);
console.log("OS Type:", os.type());
console.log("OS Platform:", os.platform());
console.log("OS Release:", os.release());
console.log("Total Memory:", os.totalmem() / 1024 / 1024 / 1024); // in GB
console.log("Free Memory:", os.freemem() / 1024 / 1024 / 1024); // in GB
console.log("CPU Architecture:", os.arch());
console.log("Number of CPUs:", os.cpus().length);
console.log("Home Directory:", os.homedir());
console.log("Hostname:", os.hostname());
console.log("User Info:", os.userInfo());
console.log("User Name:", os.userInfo().username);
console.log("Version:", os.version());
console.log("EOL:", os.EOL);
console.log("Network Interfaces:", os.networkInterfaces());
console.log("Uptime:", os.uptime()/60/60); // in hours