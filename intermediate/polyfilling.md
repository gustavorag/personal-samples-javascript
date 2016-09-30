### POLYFILLING

This technique is used as an alternative to the problem created when new functionalities are added to the Javascript but are
incompatible to old browsers. The usage of it is: first is checked if the functionality exists. If not, a similar funcionality
is created to do the same function but using compatible code with the old browser and then this functionality is returned to 
be used.

Let's take, for exemple, the new ES6 Number function called **"isNaN()"**. In previous ES version, there is a global function
called **isNaN()** thar has a differente working. While **Number.isNaN** will return true only to NaN valeu types or wrong 
arithmetic expressions (0/0), the global **"isNaN()"** will return true to ant param that is not a number type or can not be
converted to a valid number type.

Old browsers that does not support ES6 will not recognize the **isNaN()** function on Number object. Thus, to use this function 
safely we can use the polyfilling approache in this way:

```javascript
if(!Number.isNaN){ 
    Number.isNaN = function isNaN(x){
          Return x !== x;
    };
}	
```

What happens here is that if the object **"Number"** does not have the **isNaN()** function, we create this function with the
expected behavior and inject it on the **"Number"** object with the same name of the **ES6** definition.
