//Code Examples:

function forLoopSum(init) {
  let sum = init;

  for(let i = 0; i < 10; i++) {
    sum += i;
  }

  console.log(sum);
}

function arrExample() {
  let arr = []; //An empty array

  for(let i = 0; i < 10; i += 2) {
    arr.push(i);
  }

  console.log(arr);
}

function jsonExample() {
  let dog = {
    name: "Fido",
    age: 13,
    type: "Irish Setter",
    owners: ["Alice", "Bob", "Charlie"]
  }

  console.log(dog.name);
  console.log(dog["age"]);
  dog.speak = "Woof!";
  console.log(dog["speak"]);
  console.log(dog);
}

console.log("Hello World!");

forLoopSum(0);
arrExample();
jsonExample();
