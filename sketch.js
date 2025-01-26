let webcam;
let shapeSystem = [];
let scale = 18;
let shapeType = 'circle';  // 默认是圆形
let fixedSpeed = 4; // 固定速度

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  webcam = createCapture(VIDEO);
  webcam.size(width / scale, height / scale);
  webcam.hide();
  
  // 创建不同的形状
  for (let x = 0; x < 200; x++) {
    let rx = random(15, width - 15);
    let ry = random(15, height - 15);
    let r = random(4, 30);
    shapeSystem[x] = new Shape(rx, ry, r);
  }
  
  // 设置键盘事件监听
  keyPressed = () => {
    if (key === 'c') {
      shapeType = 'circle';  // 按 'c' 切换到圆形
    } else if (key === 't') {
      shapeType = 'triangle';  // 按 't' 切换到三角形
    }
  };
}

function draw() {
  webcam.loadPixels();
  
  // 绘制所有形状
  for (let x = 0; x < shapeSystem.length; x++) {
    shapeSystem[x].move();
    shapeSystem[x].show();
    shapeSystem[x].checkEdges();
  }
}

class Shape {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    // 使用固定速度
    this.x += random(-fixedSpeed, fixedSpeed);  // 在固定速度范围内移动
    this.y += random(-fixedSpeed, fixedSpeed);  // 在固定速度范围内移动
  }

  show() {
    let pX = this.x / scale;
    let pY = this.y / scale;
    let pixelColor = webcam.get(pX, pY);
    
    // 直接使用颜色并设置透明度为 120
    fill(pixelColor[0], pixelColor[1], pixelColor[2], 120); // 固定透明度
    noStroke();

    if (shapeType === 'circle') {
      ellipse(this.x, this.y, this.r, this.r);  // 绘制圆形
    } else if (shapeType === 'triangle') {
      triangle(
        this.x, this.y - this.r, 
        this.x - this.r, this.y + this.r, 
        this.x + this.r, this.y + this.r
      );  // 绘制三角形
    }
  }

  checkEdges() {
    if (this.x < 15) {
      this.x = 15;
    } else if (this.x > width - 15) {
      this.x = width - 15;
    }
    if (this.y < 15) {
      this.y = 15;
    } else if (this.y > height - 15) {
      this.y = height - 15;
    }
  }
}
