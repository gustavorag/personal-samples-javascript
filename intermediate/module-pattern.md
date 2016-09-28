###MODULE PATTERN

####Basic Concept

Module is a javascript pattern that defines a way to isolate implementation details for specific functions, offering to
users, access only to functions of their scope. Example:

```javascript
function User(){
     var username, password;

     function doLogin(user, pw){
            username = user;
            password = pw;
            //Do the rest of login function
      }

      var publicAPI = {
           login: doLogin
      };
      
      return publicApi;
}

var user = User();
user.login(“user”,”pass”);
```
