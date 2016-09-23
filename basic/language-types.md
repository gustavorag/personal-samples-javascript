###TYPES AND VALUES IN JS

==========

Variables in Javascript do not have types. Instead, values has types. Today, at ES6 definition, there is six types of values:

- String
- Number
- Boolean
- null or undefined
- Object
- Symbol (introduced by ES6)

The method **typeof**, in javascript, returns a String with the type of the variable inpected. Example:

```javascript
console.log("Testing typeof function:");
var a = "This is a String";
console.log(typeof a); //returns "string";
console.log(typeof b); //returns "undefined";
console.log(typeof 10); //returns "number";
console.log(typeof {name:"user"}); //returns "object";
a = 15;
console.log(typeof a); //returns "number";
```

And here is the output on browser's console:

``` shell
> Testing typeof function: 
> string
> undefined
> number
> object
> number
```
The function **"typeof"** do not looks for the type of the variable (again: variables do not have "type") but rather for the type of the value 
contained on the variable as can be seen when we change the value of **"a"** and call again for **"typeof a"**. 
In this second time is returned **"number"** instead previous **"string"**.

###OBJECTS

**Object** is a type composed by one or more values held in properties. The structure of an javascript object is defined by **JSON - Javascript Object Notation**, which is (in simple way):

```javascript
{
	property1: value,
	property2: value,
	property3: [], //an array
	//...
	propertyN: {another_object}
}
```
The value of properties can be any type listed above (string, number, etc), even another **object** .

####Get property value.
There is two ways to get the value of a property:

1 - name_of_object . name_of_property
2 - name_of_object [ "name_of_property" ]

Example:

```javascript

var objA = {
        name: "User One",
        age: 21,
        phones: [123,456,789],
        address: {street:"West 15th, 231",postalCode:123654}
}

console.log(objA.name);
console.log(objA["age"]);
console.log(objA.phones);
console.log(objA.address);
console.log(objA["address"].street);

```
_Browser's console output:_

``` shell
> User One
> 21
> [123, 456, 789]
> 456
> Object {street: "West 15th, 231", postalCode: 123654}
> West 15th, 231
```

###ARRAYS

Arrays in javascript are very similar to arrays in other languages like Java, C/C++, etc. But in javascript there is a particularity: any type of value can be stored in same array. To get a value on array you must use the notation **"arrayName[positionOfValue]"** (In javascript, positions on array start in 0).

```javascript
var anArray = [1,"a string", true, {name:'an object'}];

console.log(anArray);
console.log(anArray[0]);
console.log(anArray[1]);
console.log(anArray[2]);
console.log(anArray[3]);

```

_Browser's console output:_

``` shell
> [1, "a string", true, Object]
> 1
> a string
> true
> Object {name: "an object"}
```
Comparing arrays with normal objects, first ones are **numerically positioned** values and the second ones are **named positioned** values.
