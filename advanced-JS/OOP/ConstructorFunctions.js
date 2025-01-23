/*  this works here fine although no obj is the one who "call" it
    because the new make that link, it give this the value of itself 
    in this case... the Elf that it is being created
*/
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

/* 
  To create functions to this Elf and being DRY and memory efficient
  instead of creating that inside Elf, will do it to the prototype
*/
Elf.prototype.attack = function() {
  return 'attack with ' + this.weapon;
}

/* 
  functions inside functions this is assign to the window object
  so we need to reassign the this with binding or self before the inside function
*/
Elf.prototype.build = function() {
  function building(){
    return self.name + ' builds a house';
  }
  
  const self = this;
  return building();
  /* return building.bind(this); 
      //would bind this to the obj so the inside function can use this
      //and would have to be call in the obj like obj.build()() 
  */
}

const peter = new Elf('Peter', 'stones');
peter.attack();
peter.building();


//--------------------------------------


//------Create prototytipal inheritance----

	const elfFunctionsStore = { //--This Store is made to be more memory efficient with 
					                    //  this method, because otherwise it will be repeating the info on each elf		
		attack() {
			return 'attack with ' + this.weapon;
		}
	}

	function createElf(name, weapon){
		let newElf = Object.create(elfFunctionsStore); // --the prototytipal inheritance
		newElf.name = name;
		newElf.weapon = weapon;
		return newElf;
	}

	const peter = createElf('Peter','stones')
  peter.attack();


//---------------------------------------

//sintactic suggar, behind the scenes it's prototytipal inheritance
//this can be done with Object.create
  class Elf { 
    //Same to the constructor function, the new word let ud use this 
    constructor(name, weapon) {
      this.name = name;
      this.weapon = weapon;
    }

    attack() {
      return 'attack with ' + this.weapon;
    }
  }

  const peter = new Elf('Peter','stones');
  peter.attack();