A function could be created as a Object, like this:

```javascript

var sum = new Function('a', 'b', 'return a+b;');
console.log(sum(1,2));

var callAlert = new Function('a', 'b', 'alert("I received "+a+" and "+b);');
callAlert(1,2) //An alert will be showed
```
