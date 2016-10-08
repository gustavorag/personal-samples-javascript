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



