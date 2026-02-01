const MathOperations = require("./math");

const math = new MathOperations();

const a = 10;
const b = 5;

const sum = math.add(a, b);
const difference = math.subtract(a, b);

console.log(`Hello Liam. The math operations are: sum=${sum}, difference=${difference}`);