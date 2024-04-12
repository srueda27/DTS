
type NamesCodesAndAccess = [string, string, string];

function positionGuests(code: string, guests: NamesCodesAndAccess[]) {

  //check for a modify access code
  if (code.startsWith("delete-")) {
    const personToDelete: string = code.split("-")[1];
    let orderOnList: number = guests.findIndex(guest => guest[0] === personToDelete);
    if (orderOnList != -1) {
      console.log("The guest with the code " + personToDelete + " has been removed from the list");
      guests.splice(orderOnList, 1);
      console.log("The list of guests remains as follows: ")
      console.log(guests);
    }
    else {
      console.log("there is noone with that code to be deleted")
    }

    return;
  }
  else if (code.startsWith("add-")) {
    const newGuest = code.split("-");
    guests.push([newGuest[1], newGuest[2], newGuest[3]]);
    console.log("A new guest with code: " + newGuest[1] + " and name " + newGuest[2] + " has been added, he has an access type of " + newGuest[3]);
    return;
  }


  let normalTable: NamesCodesAndAccess[] = [];
  let normalVipTable: NamesCodesAndAccess[] = [];
  let exclusiveVipTable: NamesCodesAndAccess[] = [];
  let superExclusiveVipTable: NamesCodesAndAccess[] = [];

  //locate the different guests in diferent tables
  guests.forEach((guest) => {
    switch (guest[2]) {
      case "normal":
        normalTable.push(guest)
        break;
      case "normalVIP":
        normalVipTable.push(guest)
        break;
      case "exclusiveVIP":
        exclusiveVipTable.push(guest)
        break;
      case "superExclusiveVIP":
        superExclusiveVipTable.push(guest)
        break;
      default:
        console.log("There is no type of access to the event");
        break;
    }
  })

  let newGuest: NamesCodesAndAccess | undefined;
  let listsOfTablePartners: NamesCodesAndAccess[];
  newGuest = guests.find(guest => guest[0] === code); //Searches for the code in the database

  if (newGuest == undefined) { //Check if the code exists in the database
    console.log("There isn't a guest with that code, please try again with another code")
    return;
  }

  // Greet the user
  console.log("Hello " + newGuest[1] + " you will be sitting on table for " + newGuest[2] + " access type")


  listsOfTablePartners = guests.filter(guest => guest[2] == newGuest[2]).filter(guest => guest[0] !== newGuest[0]); //Searches for the table partners 

  const namesOnly: string[] = listsOfTablePartners.map(partners => partners[1]); //Cleans the tuple to get only the names

  switch (newGuest[2]) {  //Search for the new guest type of access
    case "normal":
      console.log("No benefits");
      break;
    case "normalVIP":
      console.log("You can access exclusive bathrooms");
      break;
    case "exclusiveVIP":
      console.log("You can access exclusive bathrooms and also extra service in the table");
      break;
    case "superExclusiveVIP":
      console.log("You can access exclusive bathrooms, extra service in the table and also unlimited drinks for all of the night");
      break;
    default:
      console.log("There is no type of access to the event");
      break;
  }

  console.log("You will be accompanied by " + namesOnly.join(", "))

}

const guests: NamesCodesAndAccess[] = [
  ["23414", "Richard", "normalVIP"],
  ["12345", "Jessie", "exclusiveVIP"],
  ["54326", "Omar", "superExclusiveVIP"],
  ["23413", "Alice", "normal"],
  ["12353", "Oscar", "normalVIP"],
  ["76443", "Herald", "superExclusiveVIP"],
  ["11453", "Billie", "normal"],
  ["54323", "John", "normalVIP"],
  ["13453", "Skyler", "exclusiveVIP"],
  ["52343", "Claire", "normalVIP"],
  ["15353", "Fin", "normal"],
  ["77343", "Jack", "normal"],
  ["45624", "Ron", "normalVIP"],
  ["87962", "Noah", "exclusiveVIP"],
  ["76535", "William", "normal"],
  ["12382", "Oliver", "exclusiveVIP"],
];

positionGuests("11453", guests);
positionGuests("delete-13453",guests);
positionGuests("add-134253-Jose-normal",guests);