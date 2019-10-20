let debris = []
let debObject = []
leo = 500
let img 
let rot = 0

function preload() {
  ironman = loadModel('./models/source/Mark 42.obj',true);
  ironman_texture = loadImage('./models/source/maps/42.png');
  
  earth = loadModel('./models/source/13902_Earth_v1_l3.obj',true);
  earth_texture = loadImage('./models/textures/Earth_diff.jpg');
  
  bullet_texture = loadImage('./models/textures/black.jpg');
  loadStrings('asset/all_3le.txt', dataLoaded)
  img = loadImage('asset/bg.jpg')
  myFont = loadFont('asset/Inconsolata.otf')
}

dataLoaded = (res) => {
    for (let i = 0; i < res.length - 1; i += 3) {
      let satrec = satellite.twoline2satrec(res[i + 1], res[i + 2])
      let positionAndVelocity = satellite.propagate(satrec, new Date())
      let positionEci = positionAndVelocity.position
      let gmst = satellite.gstime(new Date())
      if (positionEci !== undefined && res[i].includes('DEB')) {
        let positionGd = satellite.eciToGeodetic(positionEci, gmst)
        if (positionGd.height <= leo) {
            let data = {
                name: res[i],
                y: positionEci.y,
                x: positionEci.x,
                z: positionEci.z
            }
          debris.push(data)
        }
      }
    }
	
    for (let i = 0; i < debris.length -1; i++) {
		let deb = new Debris(debris[i],18,myFont)
        debObject.push(deb)
    }
}

function setup() {
	frameRate(30);
	createCanvas(windowWidth, windowHeight,WEBGL);
	leo = createSlider(200,1000, 10);
	leo.position(20, 20);
	color("white")
	text('(200,2000)', 100, 35);
}

function draw() {
	background(0);
	push()
	translate(0,0,-400)
	image(img,-width, -height, width*2, height*2)
	pop()
	noStroke()
	
	translate(0,height/2 ,300) //translate origin
	push()
	scale(2,1,1)
	push()
	earthf()
	pop()
	
	push()
	debrisf()
	pop()
	pop()

	push()
	ironmanf()
	pop()
	

}

const debrisf = ()=>{
	push()
	for (let i = 0; i < debObject.length -1; i++) {
		debObject[i].show()
	}
	pop()
}

function ironmanf()
{
	push()
	texture(ironman_texture)
	// rotateX(PI/4)
	translate(0,-300,200)
	scale(0.4)
	rotateX(radians(40+180))
	if(frameCount > 20 && typeof(bbox) != "undefined"){
		midPoint = [bbox[0]+bbox[2]/2,bbox[1]+bbox[3]/2] 
		coorx = midPoint[0]
		translate(-400,0,0)
		translate(coorx*1.5,0,0)
	}
	
	model(ironman);
	pop()
}

function earthf()
{
	push()
	// translate(0,800,200)
	texture(earth_texture)
	scale(3)
	rotateX(millis() / -50000);
	model(earth)
	pop()
}