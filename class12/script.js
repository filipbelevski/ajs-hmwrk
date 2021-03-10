class Animal {
    constructor(name, type, age, size){
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
    }
    eat (input) {
        if (input instanceof Animal) {
            if(this.type === "herbivore"){
                console.log(`The ${this.name} is a herbivore and does not eat other animals`)
            }
            if(this.type !== "herbivore") {
                if (this.size > input.size){
                    input.isEaten = true;
                    console.log(`The animal ${this.name} ate the ${input.name}`)
                } else {
                    console.log(`The animal ${this.name} tried to eat ${input.name} but it was too large`)
                }
            }
        }
        if (!(input instanceof Animal)) {
            console.log(`${this.name} is eating ${input}`)
        }
    }
    isEaten = false;

}

let deer = new Animal ("Deer", "herbivore", 2, 1)
let tiger = new Animal("Tiger", "carnivore", 4, 2)
let pig = new Animal("Pig", "omnivore", 26, 2)
let elephant = new Animal("Elephant", "herbivore", 3, 8)
let human = "Filip"

tiger.eat(pig)
tiger.eat(elephant)
tiger.eat(deer)
tiger.eat(human)

console.log(deer)
console.log(pig)
console.log(tiger)
console.log(elephant)