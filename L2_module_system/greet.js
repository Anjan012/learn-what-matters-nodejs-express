function greet(name) {
    console.log(`Hello ${name} from the greet module!`);
}

function sub(a,b){
    const res = a>b ? a-b : b-a;
    return res;
}

// module.exports = greet;
module.exports = {greet, sub} // to export multiple functions

// module.exports : returns an object/empty object by default

