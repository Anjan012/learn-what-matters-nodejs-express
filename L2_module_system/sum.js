// local module
function sum(a, b) {
    return a+ b;
}

function greetWithSum(text, a, b, sum) {
    const result = sum(a,b);

    console.log(`${text} ${result}`);
}

greetWithSum("hello i am greeting sum is:", 5, 10, sum);