### COMPARATORS

- **==**: Equals _with_ coercion. If elements of comparison are different types, JS tries to cast types to do the comparison.

    Ex: "42" == 42 returns true.

- **!=**: Not Equals _with_ coercion.

    Ex: "42" != 42 returns false.
        "42" != 43 returns true.

- **===**: Equals _without_ coercion. If the elements of comparison are different types, comparison will return false.

    Ex: "42" === 42 returns false.
         42 === 42 returns true.
     
- **!==**: Not Equals _without_ coercion.

    Ex: "42" !== 42 returns true.
        "42" !== 43 returns true.
         43 !== 42 returns true.
         42 !== 42 returns false.

- **<**: Less than.

   Ex: "42" < 50 returns true. //There is no comparison _without_ coercion with **<** operator.
         42 < 50 returns true.
         42 < 40 returns false.
         42 < 42 returns false.

- **>**: Greater than.

   Ex: "42" > 40 returns true. //There is no comparison _without_ coercion with **>** operator.
         42 > 40 returns true.
         42 > 42 returns false.
         42 > 50 returns false.

- **<=**: Less than or equals.

   Ex: "42" <= 50 returns true. //There is no comparison _without_ coercion with **<=** operator.
         42 <= 50 returns true.
         42 <= 40 returns false.
         42 <= 42 returns true.

- **>=**: Greater than or equals.

   Ex: "42" >= 40 returns true. //There is no comparison _without_ coercion with **>=** operator.
         42 >= 40 returns true.
         42 >= 42 returns true.
         42 >= 50 returns false.

### CONDITIONALS

IF --- ELSE

```javascript
if(a){
  //Runs only if **a** is true;
}
else if (b){
 //Runs only if **a** is false and **b** is true;
}
else{
 //Runs only if **a** and **b** is false;
}
```
### TERNARY OPERATOR "?"

Ternary operator "?" is structured in this way: \<COMPARISON> **?** \<RETURN IF TRUE> **:** \<RETURN IF FALSE>

```javascript

function testeValue(value){
    return value >= 5 ? "Big" : "Small"; // (value >= 5) is <COMPARISON>,"Big" is <RETURN IF TRUE>, "Small" is <RETURN IF FALSE>
}
```
If value is 5 or greater, this function will return the string "Big". Otherwise, it will return "Small".

### SWITCH

Switch is a operator that has a block definition that receives a value, and one or more "case" statements within this block.

```javascript
switch(a){
   case 1:
        //do something
        break;
   case 2:
        //do something
        break;
   case 3:
        //do something
        break;
   default;
}
```
The value received as parameter is compared with all cases inside the **switch** block. If the value
is equal to the case's value (each case has an unique value), the code in this case will be executed. The **"break"**
clause is used to stop the **switch** execution. If it case does not have the **"break"** clause, the following **cases** 
will be executed (regardless the value) until find a **"break"** clause.

Example:

```javascript
function switchTest(a){
        switch(a){
                case 1:
                        console.log('Case 1 running');
                        break;
                case 2:
                        console.log('Case 2 running');
                case 3:
                        console.log('Case 3 running');
                        break;
                case 4:
                        console.log('Case 4 running');
                case 5:
                        console.log('Case 5 running');
                case 6:
                        console.log('Case 6 running');
                        break;
                default:
                        console.log('Default');
        }
}
```

For “a” equals to:

-1 

    Console's output: 
    Case 1 running

-2 

    Console's output: 
    Case 2 running
    Case 3 running //Here “break” is found

-4

    Console's output:
    Case 4 running
    Case 5 running
    Case 6 running //Here “break” is found


