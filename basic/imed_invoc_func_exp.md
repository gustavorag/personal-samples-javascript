###IMMEDIATELY INVOKED FUNCTION EXPRESSIONS - IIFEs

In Javascript is possible to execute a function directly soon after your declaration.

See this example:

```javascript
var foo = function func(){
 //do something
}

foo(); //Calling the function.
```
Any function in Javascript is called by the name of the function following by open and close parenthesis **"()"**. 
Optionally could be passed parameters between the parenthesis. The name of the function works like a block definition as well
a **"()"** block - ("An String "+70).length is the same as "An String 70".length, both returns 12. Thus, if we declare a function within a **"()"** block, this function could be invoked immediately after your
definition, using the normal way to call a function: **"()"**.

Example

```javascript
( //Here I'm openning the block for hold  all the function definition.
  function foo(paramA){
    console.log('Printing the param A: '+paramA) ;
  }
)("This is the Param A"); //Here I close the block that contains all the function definition and call the function immediately after.
```

!NOTE: You can **NOT** call this function later unless you "save" its definition on a variable:

```javascript
var fooFunc ;
(
 fooFunc = function foo(paramA){
    console.log('Printing the param A: '+paramA) ;
  }
)("This is the Param A");

fooFunc("Late invocation");
```
