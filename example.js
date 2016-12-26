var Animal =  function (){
   var name;
   var field
}

var json = {
    name: 'name',
    field: 'field'
}
Object.keys(json).map(function(objectKey, index) {
    var value = json[objectKey];
    Animal.objectKey = value;
    console.log(value);
});
Animal = json;
console.log(Animal);
