
Handling exceptions in Javascript is very similar to Java language.

```javascript
try {
  //TO SOMETHING
}
catch(error) {
    console.log(error.message);
}
finally {
   //TO SOMETHING - It will be always executed, regardless that an exception be threw or not.
}
```
To create customized exception you just need to use "throw" clause to return a message.

```javascript
try {
  var result = doSomething();
  if (result.isNotValid) {
    throw "Put your error here";
  }
}
catch(error) {
    console.log(error.message);
}
```
