//------------------------------------------

  //new binding this
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  // the new word does the binding
  const person = new Person('Pepito', 30);

//------------------------------------------

  //implicit binding

  const person = {
    name: 'Karen',
    age: 40,
    hi() {
      console.log('hi ' + this.name) //this inside an obj is bind to the obj who calls it
    }
  }

  person.hi();

//------------------------------------------

  //explicit binding

  const person = {
    name: 'Karen',
    age: 40,
    hi: function() { //in this case function need to be explicit to be able to bind
      console.log('hi ' + this.setTimeout())
    }.bind(window) //explicit binding the this to window, it could have been other obj
  }

//------------------------------------------

  //arrow function - lexical scope

  const person = {
    name: 'Karen',
    age: 40,
    hi() {
      var inner = () => { //if not use here the arrow function, then this would be the window obj 
                          //"nobody" would be calling inner(), because is a function inside a function  
        console.log('hi ' + this.name)
      } 
      return inner()
    } 
  }
    