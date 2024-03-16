const fs = require('fs-extra');
const Promise = require("bluebird");
Promise.reduce
(["n1.txt", "n2.txt"], 
 function(total, fileName) {
    console.log(total)
    return fs.readFile(fileName, "utf8").then(function(contents) {
        let a = total
        a.push(parseInt(contents,10));
        return a 
    });
 }, [])


.then(function(total) {
     console.log(total)
});
