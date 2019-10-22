function Laser(spos,vel) {
  this.pos = createVector(spos.x, spos.y,spos.z);
  this.vel = createVector(vel.x, vel.y,0);
  
  this.update = function() {
    this.pos.subtract(this.vel);
  }
  this.render = function() {
    push();
    sphere(20);
	translate(this.pos.x,this.pos.y,this.pos.z)
    pop();
  }
  
  this.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }
  
  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
  
  
}