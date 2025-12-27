
## The Core Concept

**Prototype = Sharing**

Instead of every object having its own copy of functions, they all point to one shared object (the prototype) where those functions live. This saves memory and enables inheritance.

---

## The Problem Prototypes Solve

```javascript
// ❌ BAD - Each user has their own copy of sayHello
let user1 = {
  name: "Alice",
  sayHello: function() { console.log("Hi, I'm " + this.name); }
};

let user2 = {
  name: "Bob",
  sayHello: function() { console.log("Hi, I'm " + this.name); }
};
// If we create 100 users, we have 100 copies of the same function!
```

```javascript
// ✅ GOOD - All users share one sayHello function via prototype
function User(name) {
  this.name = name;
}

User.prototype.sayHello = function() {
  console.log("Hi, I'm " + this.name);
};

let user1 = new User("Alice");
let user2 = new User("Bob");

user1.sayHello();  // "Hi, I'm Alice"
user2.sayHello();  // "Hi, I'm Bob"

console.log(user1.sayHello === user2.sayHello);  // true (same function!)
```

---

## Real-World Analogy

Think of it like a **shared recipe book**:

- Each chef (object) has their own name and ingredients (properties)
- But they all share one recipe book (prototype) with cooking methods
- When a chef needs a recipe, they look in the shared book instead of carrying their own copy

```javascript
let recipeBook = {
  makePasta: function() { console.log("Boil water, add pasta..."); }
};

let chef1 = { name: "Alice" };
let chef2 = { name: "Bob" };

chef1.__proto__ = recipeBook;
chef2.__proto__ = recipeBook;

chef1.makePasta();  // "Boil water, add pasta..."
chef2.makePasta();  // "Boil water, add pasta..."
```

---

## The Two Key Terms

### 1. `__proto__` (The Link)

- **Every object has this**
- It's the actual connection from your object to the shared prototype
- It points to another object where JavaScript looks for properties

```javascript
let animal = {
  eats: true,
  walk() { console.log("Animal walks"); }
};

let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;  // Link rabbit to animal

console.log(rabbit.jumps);  // true (found on rabbit)
console.log(rabbit.eats);   // true (found on rabbit.__proto__ which is animal)
rabbit.walk();              // "Animal walks"
```

**How JavaScript looks up properties:**
1. Does `rabbit` have `eats`? No.
2. Check `rabbit.__proto__` (which is `animal`). Yes! Found it.

### 2. `prototype` (The Shared Object)

- **Only constructor functions have this**
- It's an object that becomes the `__proto__` for all instances created with `new`
- This is where you put shared methods

```javascript
function Dog(name) {
  this.name = name;
}

// Add methods to Dog.prototype (the shared object)
Dog.prototype.bark = function() {
  console.log(this.name + " says: Woof!");
};

let dog1 = new Dog("Buddy");
let dog2 = new Dog("Max");

// Both dogs' __proto__ points to Dog.prototype
console.log(dog1.__proto__ === Dog.prototype);  // true
console.log(dog2.__proto__ === Dog.prototype);  // true

dog1.bark();  // "Buddy says: Woof!"
dog2.bark();  // "Max says: Woof!"
```

---

## The Relationship Diagram

```
Constructor Function (Dog)
    |
    | has a property called
    ↓
Dog.prototype (an object)
    - bark: function
    - walk: function
    ↑              ↑
    |              |
    | __proto__    | __proto__
    |              |
  dog1           dog2
  name: "Buddy"  name: "Max"
```

**Key Point:** Instances link to the constructor's `.prototype` object, NOT to the constructor itself.

```javascript
console.log(dog1.__proto__ === Dog);           // ❌ false
console.log(dog1.__proto__ === Dog.prototype); // ✅ true
```

---

## What Happens When You Use `new`

```javascript
let alice = new Person("Alice");

// Behind the scenes, JavaScript does this:
let alice = {};                          // 1. Create empty object
alice.__proto__ = Person.prototype;      // 2. Link to prototype
Person.call(alice, "Alice");             // 3. Run constructor with 'this' = alice
```

---

## Complete Example

```javascript
// Constructor function
function Car(brand, model) {
  // Properties unique to each car
  this.brand = brand;
  this.model = model;
  this.speed = 0;
}

// Methods shared by all cars (on prototype)
Car.prototype.accelerate = function() {
  this.speed += 10;
  console.log(this.brand + " speed: " + this.speed + " km/h");
};

Car.prototype.brake = function() {
  this.speed -= 10;
  console.log(this.brand + " speed: " + this.speed + " km/h");
};

Car.prototype.getInfo = function() {
  return this.brand + " " + this.model;
};

// Create instances
let car1 = new Car("Toyota", "Camry");
let car2 = new Car("Honda", "Civic");

car1.accelerate();  // "Toyota speed: 10 km/h"
car2.accelerate();  // "Honda speed: 10 km/h"

console.log(car1.getInfo());  // "Toyota Camry"

// Verify they share methods
console.log(car1.accelerate === car2.accelerate);  // true
```

---

## Built-in Prototypes

Every object in JavaScript has a prototype chain:

```javascript
let person = {
  name: "John",
  age: 25
};

// Where did toString come from?
console.log(person.toString());  // "[object Object]"

// It came from Object.prototype
console.log(person.__proto__ === Object.prototype);  // true
console.log(Object.prototype.toString);  // function toString() {...}
```

**Prototype Chain:**
```
person
  ↓ __proto__
Object.prototype (has toString, hasOwnProperty, etc.)
  ↓ __proto__
null (end of chain)
```

---

## Modern Way: ES6 Classes

Classes are just syntactic sugar over prototypes. They work the same way under the hood:

```javascript
class Dog {
  constructor(name) {
    this.name = name;  // Own property
  }
  
  // This goes on Dog.prototype
  bark() {
    console.log(this.name + " says: Woof!");
  }
}

let dog = new Dog("Buddy");
console.log(dog.__proto__ === Dog.prototype);  // true

// Methods are still on the prototype
console.log(Dog.prototype.bark);  // function bark() {...}
```

---

## Key Takeaways

1. **`__proto__`** = The actual link from an object to its prototype (every object has this)
2. **`prototype`** = A property on constructor functions that becomes the `__proto__` for instances
3. **Instances don't link to the constructor**, they link to **constructor.prototype**
4. **Prototypes enable sharing** = One copy of methods in memory, used by all instances
5. **Prototype chain** = JavaScript looks up properties through `__proto__` links until found or reaches null

---

## When to Put Things on Prototype

```javascript
function Person(name, age) {
  // ✅ Unique data - put directly on instance
  this.name = name;
  this.age = age;
}

// ✅ Shared methods - put on prototype
Person.prototype.greet = function() {
  console.log("Hi, I'm " + this.name);
};

Person.prototype.isAdult = function() {
  return this.age >= 18;
};
```

**Rule of thumb:**
- **Own properties** = Data unique to each instance (name, age, id)
- **Prototype** = Methods and properties shared by all instances

---

## Common Gotcha

```javascript
function Counter() {
  this.count = 0;
}

// ❌ WRONG - This creates one shared count
Counter.prototype.count = 0;

// ✅ RIGHT - Each instance has its own count
function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function() {
  this.count++;
};
```

---

## Summary in One Sentence

**Prototypes let objects share methods through a `__proto__` link to a shared object, saving memory and enabling inheritance.**