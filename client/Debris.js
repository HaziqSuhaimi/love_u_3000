class Debris {
    constructor(pos, scl, font) {
        this.name = pos.name.substr(2, pos.name.length - 1)
        this.y = pos.y / scl
        this.x = pos.x / scl
        this.z = pos.z / scl
        this.accelx = random(-0.1, 0.1)
        this.accely = random(-0.1, 0.1)
        this.accelz = random(-0.1, 0.1)
        this.init = 0
        this.font = font

    }

    show() {
        push()
        translate(this.x, this.y, this.z)
        textFont(this.font)
        textSize(5)
        fill(255)
        textAlign(CENTER)
        text(this.name, 0, 5)
        fill(200, 0, 0)
        sphere(2)
        pop()

        rotateX(rot -= 0.0000005)

    }

}