var imageCanvas = document.getElementById("canvas");
var stickyNoteCanvas = document.getElementById("canvas2");
var slider = document.getElementById("notesWidthSet");


// Load a default image to show users how to use the page
var inputCanvasCtx = imageCanvas.getContext("2d");
var outputCanvasCtx = stickyNoteCanvas.getContext("2d");

var img = new Image();
img.src = 'defaultImage.jpg';

img.addEventListener('load', function() {
  imageCanvas.width = img.width;
  imageCanvas.height = img.height;
  stickyNoteCanvas.width = img.width;
  stickyNoteCanvas.height = img.height;
  inputCanvasCtx.drawImage(img, 0, 0);
  createColorGrid(imageCanvas, stickyNoteCanvas, slider);
}, false);


var loadFile = function(event, inputCanvas, outputCanvas) {
  var inputCanvasCtx = inputCanvas.getContext("2d");

  var img = new Image();
  img.src = URL.createObjectURL(event.target.files[0]);

  img.addEventListener('load', function() {
    inputCanvas.width = img.width;
    inputCanvas.height = img.height;
    outputCanvas.width = img.width;
    outputCanvas.height = img.height;
    inputCanvasCtx.drawImage(img, 0, 0);
    createColorGrid(inputCanvas, outputCanvas, slider);
  }, false);
};

var createColorGrid = function(inputCanvas, outputCanvas, slider) {
  var inputCanvasCtx = inputCanvas.getContext("2d");
  var outputCanvasCtx = outputCanvas.getContext("2d");

  outputCanvasCtx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for re-drawing

  var notesWidth = slider.value;
  var pixelsPerNote = inputCanvas.width/notesWidth;
  //var remainder = ~~((inputCanvas.height*1000)/(pixelsPerNote*1000)/1000); // Have to do this instead of % because JS handles floats/doubles weirdly
  var remainder = inputCanvas.height%pixelsPerNote;
  var notesHeight = Math.floor(inputCanvas.height/pixelsPerNote);

  if (notesHeight == 0 || (pixelsPerNote-remainder) < 0.01) {
    notesHeight++;
    remainder = 0;
  };
  //console.log(img.height, pixelsPerNote);
  //console.log("notesHeight: ",notesHeight, "Remainder: ",remainder);

  // Debugging lines
  outputCanvasCtx.fillStyle = 'blue';
  outputCanvasCtx.fillRect(0,0,outputCanvas.width,outputCanvas.height);

  outputCanvas.height = notesHeight*pixelsPerNote;

  outputCanvasCtx.shadowColor = 'grey';
  outputCanvasCtx.shadowBlur = (1/25)*pixelsPerNote;
  outputCanvasCtx.shadowOffsetX = (1/45)*pixelsPerNote;
  outputCanvasCtx.shadowOffsetY = (1/45)*pixelsPerNote;

  for(verticalNote = 0; verticalNote < notesHeight; verticalNote++) {
    for(horizontalNote = 0; horizontalNote < notesWidth; horizontalNote++) {
      data = inputCanvasCtx.getImageData(pixelsPerNote*horizontalNote,pixelsPerNote*verticalNote+Math.round(remainder/2),pixelsPerNote,pixelsPerNote).data;
      avgColor = averageColor(data);

      outputCanvasCtx.fillStyle = 'rgba('+avgColor[0]+','+avgColor[1]+','+avgColor[2]+','+avgColor[3]+')';
      outputCanvasCtx.fillRect(pixelsPerNote*horizontalNote,pixelsPerNote*verticalNote,(14/15)*pixelsPerNote,(14/15)*pixelsPerNote);
    };
  };
};

var averageColor = function(data) {
  var redValues = [];
  var greenValues = [];
  var blueValues = [];
  var alphaValues = [];

  for (i = 0; i < data.length/4; i++) {
    redValues[i] = data[i*4];
    greenValues[i] = data[i*4+1];
    blueValues[i] = data[i*4+2];
    alphaValues[i] = data[i*4+3];
  };

  var avgColor = [Math.round(mean(redValues)), Math.round(mean(greenValues)), Math.round(mean(blueValues)), Math.round(mean(alphaValues))];
  //console.log(avgColor);
  return avgColor
};

var mean = function(array) {
  sum = 0;
  for (i = 0; i < array.length; i++) {
    sum+=array[i];
  }
  return sum/array.length;
};
