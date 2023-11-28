//i need the node default module
//import fs from 'fs';
//import path from 'path';

import got from 'got';


//get filepath data directory
//const dataDir = path.join( process.cwd(), 'data' );

const dataURL = "https://dev-cs55-fall-2023-week12.pantheonsite.io/wp-json/understrap-child-main(2)/v1/latest-posts/2";

//function returns names and ids
export async function getSortedList() {
  
  //get filepath to json file
//const filePath = path.join(dataDir, 'persons.json');
  
  //load json file contents
//const jsonString = fs.readFileSync(filePath, 'utf8');

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch{
    jsonString.body = [];
    console.log(error);
  }

  
  //convert string from file into json array object
//const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString);
  
  //sort json array by name property
jsonObj.sort(
  function(a,b){
    return a.post_title.localeCompare(b.post_title);
  }
);
 //use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(
    function(item){
      return {
        id: item.ID.toString(),
        name: item.post_title
      };
    }
  );
}

//function returns names and ids
export async function getAllIds() {
  //get filepath to json file
//const filePath = path.join(dataDir, 'persons.json');

let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch{
    jsonString.body = [];
    console.log(error);
  }
      
  //load json file contents
//const jsonString = fs.readFileSync(filePath, 'utf8');
  
  //convert string from file into json array object
//const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  
  //use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(
    function(item){
      return {
        params: {
          id: item.ID.toString()
        }
      };
    }
  );
}

//function return ALL of the properties for one single object with a match id prop value
export async function getData(idRequested){
  //get filepath to json file
//const filePath = path.join(dataDir, 'persons.json');
  
  //load json file contents
//const jsonString = fs.readFileSync(filePath, 'utf8');

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch{
    jsonString.body = [];
    console.log(error);
  }
  
  //convert string from file into json array object
//const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
  
  //find object value in array that has matching id
  const objMatch = jsonObj.filter(
    function (obj){
      return obj.ID.toString() === idRequested;
    }
  );
  
  //extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0){
    objReturned = objMatch[0];
    //found person, lets find all snacks related to person
    
    //get filepath to json file
  const filePath2 = path.join(dataDir, 'snacks.json');
    
    //load json file contents
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
     
    //convert string from file into json array object
  const jsonObj2 = JSON.parse(jsonString2);
    
    //find object value in array that has matching id
  const objMatch2 = jsonObj2.filter(
    function (obj) {
      return obj.owner.toString() === idRequested;
    }
  );
objReturned.snacks = objMatch2;
    
  } else {
    objReturned = {};
  }

//return object value found
return objReturned;
}