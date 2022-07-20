let obj = {
    name: "lolo",
    villes: "Rennes",
    age: 25,

    direBonjour() {
        console.log("bonjour ! " + this.name);
    }

}




// controler si une propriété existe +
console.log("villes" in obj); //true
delete obj.villes;
console.log(obj); //Object { name: "lolo", age: 25 }
console.log("villes" in obj); //false
for (const key in obj) {

}

// ajouter une propriété
obj.villes = "Rennes";
obj["CP"] = "35700";
console.log(obj); //Object { name: "lolo", age: 25, villes: "Rennes", CP: "35700" }

// parcourir un objet
for (const key in obj) {
    console.log(key + " : " + obj[key]);
    //     name : lolo index.js:31:13
    // age : 25 index.js:31:13
    // direBonjour : direBonjour() {

    //         console.log("bonjour ! " + this.name);

    //     } index.js:31:13
    // villes : Rennes index.js:31:13
    // CP : 35700
}


// methodes
obj.direBonjour(); //bonjour ! lolo

// methodes natives
// cles d'un objet
const keys = Object.keys(obj);
console.log(keys); //Array(5) [ "name", "age", "direBonjour", "villes", "CP" ]
//valeurs d'un objet
const values = Object.values(obj);
console.log(values); // Array(5) [ "lolo", 25, direBonjour(), "Rennes", "35700" ]
// tableaux [clé,valeur]
const nestedArray = Object.entries(obj);
console.log(nestedArray);
// Array(5) [ (2) […], (2) […], (2) […], (2) […], (2) […] ]
// ​
// 0: Array [ "name", "lolo" ]
// ​
// 1: Array [ "age", 25 ]
// ​
// 2: Array [ "direBonjour", direBonjour()
//  ]
// ​
// 3: Array [ "villes", "Rennes" ]
// ​
// 4: Array [ "CP", "35700" ]
// ​
// length: 5
// ​
// <prototype>: Array []


// fusionner des objets
const obj2 = {
    taille: "1m80"

}
const fusion = Object.assign({}, obj, obj2);
console.log(fusion);
//Object { name: "lolo", age: 25, direBonjour: direBonjour(), villes: "Rennes", CP: "35700", taille: "1m80" }

// empecher les modifications
const newObj = Object.freeze(obj);
newObj.pseudo = "Toto";
console.log(newObj);
//Object { name: "lolo", age: 25, direBonjour: direBonjour(), villes: "Rennes", CP: "35700" }

// empecher d'ajouter des propriétés à un objet
const newObj2 = Object.seal(obj);
newObj2.adress = "rue de pinot";
console.log(newObj2);
//Object { name: "lolo", age: 25, direBonjour: direBonjour(), villes: "Rennes", CP: "35700" }


// ======== constructeur d'objet =====================

// première solution = fonction constructeur

function User(pseudo, ville) {
    this.pseudo = pseudo;
    this.ville = ville;
    this.getCity = function() {
        console.log("ville : " + this.ville);
    };
};
const user1 = new User("lolo", "Vannes");
console.log(user1);
//Object { pseudo: "lolo", ville: "Vannes" }
console.log(user1.getCity()); // ville : Vannes

// Factory function

function User3(pseudo, ville) {
    return {
        pseudo,
        ville,
    }
};
const user4 = User3("nath", "Vannes");
console.log(user4); // Object { pseudo: "nath", ville: "Vannes" }


//============= Classes ====================================
class Utilisateur {
    constructor(pseudo, ville) {
            this.pseudo = pseudo;
            this.ville = ville;
        }
        // methodes
    sayMyName = function() {
        console.log("My name is " + this.pseudo);
    }
};

const user5 = new Utilisateur('Fransou', 'Bordeaux');
console.log(user5); //Object { pseudo: "Fransou", ville: "Bordeaux" }
user5.sayMyName(); // My name is Fransou



// ========= l'héritage ======================
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    saysSomething(text) {
        console.log(`${this.name} says ${text}`);
    }
}

const minou = new Animal("minou", 3);
console.log(minou);

class Dog extends Animal {

    run() {
        console.log("Dogs run !");
    }
}
const rintintin = new Dog("Rintintin", 9);
console.log(rintintin);