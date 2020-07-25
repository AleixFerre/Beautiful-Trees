// Code by Aleix Ferre
// Github: https://github.com/CatalaHD
// Sketch in https://editor.p5js.org/thecatalahd/sketches/eJ9yQ0hKc

let steps = 10; // The steps that the recursion will execute
let angle = 45; // Max random angle in angles
let distance = 200; // Branch distance
let branches = 2; // Num of branches that each one will have

let c; // The actual canvas
let slider_angle; // The angle slider
let slider_height; // The height slider
let slider_distance; // The distance slider
let slider_steps; // The steps slider
let slider_branches; // The branches slider
let button_seed; // The seed button
let button_save; // The save button

function setup() {

  c = createCanvas(800, 800);

  angle *= PI / 180; // We convert the deg into rad
  createDiv('Max Random Angle:');
  slider_angle = createSlider(0.0, PI, angle, 0.01);
  slider_angle.input(generate);

  createDiv('Height:');
  slider_height = createSlider(0.0, height / 2, height / 4, 0.01);
  slider_height.input(generate);

  createDiv('Branch distance:');
  slider_distance = createSlider(0.0, distance, distance, 0.01);
  slider_distance.input(generate);

  createDiv('Steps:');
  slider_steps = createSlider(0, steps, steps / 2, 1);
  slider_steps.input(generate);

  createDiv('Branches:');
  slider_branches = createSlider(1, 5, branches, 1);
  slider_branches.input(generate);

  createSpan('<br>');
  button_seed = createButton("Generate");
  button_seed.mouseClicked(generate);
  button_save = createButton("Save");
  button_save.mouseClicked(save_canvas);

  generate();

}

function generate() {

  background(225);

  angle = slider_angle.value();
  steps = slider_steps.value();
  distance = slider_distance.value();
  branches = slider_branches.value();

  let initHeight = slider_height.value();

  push();
  strokeWeight(steps * 1.5);
  translate(width / 2, height - initHeight);
  line(0, 0, 0, initHeight);

  drawLines(1);
  pop();
}

function save_canvas() {
  saveCanvas(c, "myTree", "png");
}

function drawLines(i) {

  if (i > steps)
    return;

  let localDist = distance / i;
  stroke(color(0, 0, 0, floor(255 / i)));
  strokeWeight(steps / i);

  for (let j = 0; j < branches; j++) {
    push();
    rotate(random(-angle, angle));
    line(0, 0, 0, -localDist);
    translate(0, -localDist);
    drawLines(i + 1);
    pop();
  }


}