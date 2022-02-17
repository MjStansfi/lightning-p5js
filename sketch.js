let stars = [];
let step = 0
// var capturer = new CCapture({ format: "webm", framerate: 30 });

function setup() {
  createCanvas(800, 600);
  // pixelDensity(4)
  background(0);
  light = new lightning(width / 2, -50, PI / 2, 50);

  for (let i = 0; i < 200; i++) {
    stars[i] = createVector(random(0, width), random(0, height - 250));
  }
}

function draw() {
  frameRate(30);
  if(frameCount==60){
     // capturer.start() 
  }
  
  background(0, 50);
 
     noStroke()
  fill(255, 40);
  for (let i = 0; i < 200; i++) {
    ellipse(stars[i].x, stars[i].y, random(1, 5), random(1, 5));
  }
  
  light.draw();
  light.update();
  

  if (light.boom) {
    background(255, 50);
    noStroke();
    fill(255, 20);
    // for(let i = 0;i<200;i++){
    //   let x = random(0,width)
    //   let y = random(0,height/2)
    //   let size = random(2,4)
    //   ellipse(x,y,size,size)
    // }


    
    new mountain(200, 255, 0.01);

    light.draw();
    light = new lightning(random(100, width - 100), -50, PI / 2, 50);
  }
  
 // capturer.capture(document.getElementById("defaultCanvas0"));
  
  if(frameCount==30*15){
    // capturer.save()
  }
  step+=1
  save("lightning"+str(step).padStart(3,"0")+'.png')

}

class mountain {
  constructor(start_y, malpha, resolution) {
    this.start_y = start_y;
    this.malpha = malpha;
    this.resolution = resolution;
    fill(0, this.malpha);

    beginShape();
    //makes ground of the moon surface
    for (let i = 0; i < width; i++) {
      let move = i * resolution + this.start_y;
      let y = this.start_y + map(noise(move), 0, 1, 100, 300);
      vertex(i, y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape();
  }
}

class lightning {
  constructor(x, y, rot, len, depth = 0) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.len = len;
    this.depth = depth;
    this.boom = false;
    noiseSeed(40);
  }

  update() {
    if (this.y > height) {
      this.boom = true;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < this.len; i++) {
      vertex(i, noise(i * 0.05) * 5);
    }
    endShape();

    if (frameCount % 80 == 0 && !this.boom && this.depth < 10) {
      translate(this.len, noise((this.len + 1) * 0.05) * 5);
      // rotate(PI);
      // line(0,0,100,100)
      if (random(1) < 0.3) {
        let light = new lightning(
          0,
          0,
          random(-0.5, 0.5),
          random(50, 100),
          this.depth + 1
        );
        light.draw();
        light.update();
      }

      let light2 = new lightning(
        0,
        0,
        random(-0.5, 0.5),
        random(50, 100),
        this.depth + 1
      );
      light2.draw();
      light2.update();
      this.boom = true;
    }
    pop();
  }
  

}

function keyPressed(){
  if (key =='s'){
    save('lightning.png')
  }
}
