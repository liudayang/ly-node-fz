class Subject {
    constructor(public name: string, public observers: Observer[] = [], public state: string = '我现在很开心') { }
    attach(o:Observer) {
        this.observers.push(o)
    }
    setState(state) {
        this.state = state
        this.observers.forEach((o: Observer) => o.update(this))
    }
}

class Observer {
    constructor(public name: string) { }
    update(baby) {
        console.log(`${baby.name}对${this.name}说：${baby.state}`);
    }
}

let baby = new Subject('小宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
baby.attach(o1)
baby.attach(o2)

baby.setState('我现在很不开心')