###THIS

In Javascript the **"this"** reference has a different behavior compared to another languages such Java, C++, C#. 
The _Object_ that is held within **"this"** depends on "how" the method that contains the "this" will be called.

Example:

```javascript

var bar = "I'm Global Var";

function foo(){
  console.log("Bar is: "+this.bar);
}

var anObject = {
  var bar = "I'm anObject"
  var foo = foo
}

var anotherObject = {
  var bar = "I'm anotherObject"
}

foo();
anObject.foo();
foo.call(anotherObject);
new foo();

```
and the console output:

```
> Bar is: I'm Global Var
> Bar is: I'm anObject
> Bar is: I'm anotherObject
> Bar is: undefined
```
