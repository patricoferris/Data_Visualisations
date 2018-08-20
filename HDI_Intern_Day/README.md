# An Introduction to Programming Concepts, JavaScript and D3.js
----------------------------------
JavaScript is very like Python in many ways and Java in many ways. Like Python it is dynamically typed. You can't just type a variable name though you have to add one of three keywords to the initialisation.

```javascript
//This is a comment in JavaScript

//A variable - don't really use this anymore because there are issues with scoping (not catastrophic if you do)
var myVar = "Hello World";
//A constant is declared once and cannot be changed during the execution of the program
const myConstant = 42;
// 'let' is a fairly new addition to the language - it is block scopes i.e. it is related to any { } that surround it
let myOtherVar = true;
```

Functions in JavaScript are very similar to those in python, they have a name, some arguments and then curly braces to enclose the function. You may have already noticed as well that in JavaScript we end statements with semi-colons, sometimes code will still run without them but probably incorrectly so definitely use them! Finding where you've forgotten them will become the greatest task you've every encountered... enjoy...

```javascript
//Declare a function with the 'function' keyword, the name, and the arguments in round brackets and then the function code inside curly-brackets
//Remember to put semi-colons after every statement. The indentation is stylistic not necessary for runnable code but definitely good for readable code.

function sum(a, b) {
  return a + b;
}

console.log(sum(3, 4)); // 7 in the console - the logging statement is the same as print - great for debugging
```

For loops are a little more verbose in Javascript than Python (there are actually other ways of working around this). This format [below] is by far the most used and also easily understood.

```javascript  
//The For-loop - an initial count, and exclusive upper-bound, the 'incrementor'
let sum = 0;

for(let i = 0; i < 10; i++) {
  sum += i;
}

console.log(sum);
```

Arrays are very similar to Python as well, just some of the method words are different.

```javascript
let arr = []; //An empty array

for(let i = 0; i < 10; i += 2) {
  arr.push(i);
}

console.log(arr);
console.log(arr.length);
```

Finally we have javascript objects (where it seems a lot more like Java and other OOP languages). An object is simply a data-structure with a set of properties. These properties are key-value pairs. There are a couple of ways of creating objects, but the one I think is probably most intuitive and easy to understand and read, is using the 'javascript object notation' format (JSON).

```javascript
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
```

JSON notation is only used for data though, it offers no functionality or really any ability to be re-used in a programming sense. All of the data you use with Javascript, however, will probably be in this format. If we want to create objects which are reusable and contain functionality then defining them either as a Class or a constructor function is better.

An instance of a Class is an object.

```javascript
Class Dog {
  constructor(name, age, type) {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  speak() {
    console.log("Woof!");
  }

  getAge() {
    return this.age;
  }
}

//Remeber to use the keyword new when declaring a new instance of a class
let Fido = new Dog('Fido', 13, 'Irish Setter');

console.log(Fido.name); //Fido

Fido.speak(); //Woof

console.log(Fido.getAge()); //13
```

I could go on at this point, but I think we want to look at some of the data visualisation concepts and how to use D3 so I'll leave you some links to learn some more about Javascript and programming concepts in general:
- [MDN](https://developer.mozilla.org/en-US/) - the go-to guide for all things web-related in terms of documentation and explanations
- [OOP](https://stackify.com/oop-concept-inheritance/?utm_referrer=https%3A%2F%2Fwww.google.co.uk%2F) - some of the major concepts in OOP like inheritance, immutability, encapsulation, code-reuse and modularity
- [Javascript](https://www.youtube.com/watch?v=fju9ii8YsGs) - Derek Banas does great, comprehensive programming videos
