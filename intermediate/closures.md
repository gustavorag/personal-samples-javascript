###CLOSURES

This is one of the most important characteristics of javascript. A function in javascript can be stored on a 
variable and therefore it can retain values received as parameters even after its execution. Each "instance"
of the function will have its own references of parameters and local variables.

Look at this function:

```javascript
function  defineMultiplier(x){

     function multiply(y){
              return y*x;
     };
     return multiply;
}
```

How it works:

**defineMultiplier** is a function that receives a parameter called "x". Within this function, another one is defined:
**multiply**, that receive the "y" parameter and then multiplies this one by the "x" parameter received by **defineMultiplier**.
This new function is returned by **defineMultiplier**. What happens when **defineMultiplier** creates the **multiply** 
function and return it, is a defefinition of an function that receives a parameter "y" and multiplies it by a fixed value
held on "x", no matter how many times it will be called. Supose that "x" value is 10. The **multiply** function returned 
by **defineMultiplier** will be:

```javascript
function multiply(y){
    return y*10;
};
```
Thereby, you can create different "instances" of **multiply**, each one with its own multiplier value (10, 5, 1, etc).

```javascript
var multiTen = defineMultiplier(10); //Return function multiply(y){return y*10;};
var multiFive = defineMultiplier(5); //Return function multiply(y){return y*5;};

console.log('Multiply Ten (3): '+multiTen(3));
console.log('Multiply Ten (5): '+multiTen(5));

console.log('Multiply Five (3): '+multiFive(3));
console.log('Multiply Five (5): '+multiFive(5));
```

Console output:
```bash
> Multiply Ten (3): 30
> Multiply Ten (5): 50
> Multiply Five (3): 15
> Multiply Five (5): 25
```

Another form of use clousured functions is:

```javascript
function multiply(multiplier){
   var sum = 0;
   return function(factor){
       for(var i = 0; i < multiplier; i++){
         	sum += factor;
       }
       return sum;
    }
}

console.log(multiply(2)(2)) // 2 times 2
console.log(multiply(2)(4)) // 2 times 4

```
###HOISTING

When a variable is declared using the key word **"var"**, its scope is moved to the top of its closure.
For example, the declarations below has the same result:

```javascript
function foo(){
     a = 3;
     var a;
}
//Is the same of:

function bar(){
     var a;
     a = 3;
}
```
Even the var **"a"** being declared in the end of the **"foo()"** method, this var will be considered since the beginning of the **"foo()"** method. This characteristic is called **"Hoisting"**. Here is another example:

```javascript

var a = 100

function foo(){
     a = 3;
     console.log(a) //This will show "3"
     var a;
      
}
console.log(a) //this will show "100" because the "var a" declaration above will create a new "a" 
               //variable for all "foo()" scope even being after the "a=3" atribuitio
```

Using **"Hoisting"** is not a good practice due it could make the code hard to be understood.

###LET DECLARATION

The **"let"** declaration is a new (ES6) alternative for use instead **"var"** keyword. Differently from **"var"**,
**"let"** will create a variable if a limited scope:

```javascript

"use strict";
function foo(){
  var a = "Global"
  var count = 1;
  console.log("A before loop: "+a);
  while(count < 2){
    let b = 100;
    count++
    a = a+" Reference"
    console.log("A inside loop: "+a);
  }
  try{
    console.log("B after loop: "+b); //Error
    console.log("A after loop: "+a);
  }catch(err){
    console.log("Error catched: "+err)
  }
}

foo();

function bar(){
  var a = "Global"
  var count = 1;
  console.log("A before loop: "+a);
  console.log("B before loop: "+b); //Undefined, but will not get an error.
  while(count < 2){
    var b = 100; //"B" will be considered from beginning of bar method, but will receive "100" value only inside the "while"
    count++
    a = a+" Reference"
    console.log("A inside loop: "+a);
  }
  try{
    console.log("B after loop: "+b); 
    console.log("A after loop: "+a);
  }catch(err){
    console.log("Error catched: "+err)
  }
}

bar();

```
The console output will be:

```bash
>A before loop: Global
>A inside loop: Global Reference
>Error catched: ReferenceError: b is not defined
>A before loop: Global
>B before loop: undefined
>A inside loop: Global Reference
>B after loop: 100
>A after loop: Global Reference
```
