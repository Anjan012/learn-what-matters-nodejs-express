module.exports.greeteee = function () { // the module exports an object with a method greeteee
    console.log("Hello from greet2!");
}

// Alternative way to export the same functionality: both approaches are valid and achieve the same result
// const greeteee = function () {
//     console.log("Hello from greet2!");
// }

// module.exports = {
//     greeteee: greeteee
// };