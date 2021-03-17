var imageCanvas = document.getElementById("canvas");
var stickyNoteCanvas = document.getElementById("canvas2");
var slider = document.getElementById("notesWidthSet");


// Load a default image to show users how to use the page
var inputCanvasCtx = imageCanvas.getContext("2d");
var outputCanvasCtx = stickyNoteCanvas.getContext("2d");

var img = new Image();
img.src = 'defaultimage.jpg';

img.addEventListener('load', function() {
  imageCanvas.width = img.width;
  imageCanvas.height = img.height;
  stickyNoteCanvas.width = img.width;
  stickyNoteCanvas.height = img.height;
  inputCanvasCtx.drawImage(img, 0, 0);
  createColorGrid(imageCanvas, stickyNoteCanvas, slider);
}, false);


var nearestNeighbor = function(inputColor, colorList) {
  var euclideanDistances = [];
  for (color=0; color < colorList.length; color++) {
    //if (inputColor[3]<255) {
    //  euclideanDistances[color] = colorList[0];
    //} else {
      euclideanDistances[color] = Math.sqrt((colorList[color][0]-inputColor[0])**2+(colorList[color][1]-inputColor[1])**2+(colorList[color][2]-inputColor[2])**2);
    //};
  };
  return colorList[indexOfSmallest(euclideanDistances)];
};

// From https://devblogs.microsoft.com/oldnewthing/20140526-00/?p=903
var indexOfSmallest = function(array) {
 var lowest = 0;
 for (var i = 1; i < array.length; i++) {
  if (array[i] < array[lowest]) lowest = i;
 }
 return lowest;
}

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

  var colorList = [
  [255,255,255, "White"],
  [0,0,0, "Black"],
  [239,224,223, "Pale Pink"],
  [249,169,197, "Light Pink"],
  [240,85,147, "Hot Pink"],
  [244,110,152, "Pink"],
  [185,78,137, "Pomegranate"],
  [221,221,221, "Pale Grey"],
  [188,187,203, "Periwinkle"],
  [183,215,230, "Baby Blue"],
  [74,164,216, "Dark Blue"],
  [205,219,214, "Olive Grey"],
  [85,199,219, "Sky Blue"],
  [0,172,229, "Blue"],
  [215,224,223, "Grey"],
  [71,196,200, "Turquoise"],
  [0,152,152, "Ocean"],
  [154,205,67, "Green"],
  [208,213,52, "Mustard"],
  [204,223,61, "Lime"],
  [224,216,127, "Canary Yellow"],
  [232,198,47, "Yellow"],
  [253,155,44, "Orange"],
  [239,158,104, "Salmon"],
  [241,57,54, "Scarlet"],
  [187,36,40, "Deep Red"]
  ];
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
      //console.log(data);
      avgColor = averageColor(data);

      noteColor = nearestNeighbor(avgColor, colorList);

      outputCanvasCtx.fillStyle = 'rgba('+noteColor[0]+','+noteColor[1]+','+noteColor[2]+')';
      outputCanvasCtx.fillRect(pixelsPerNote*horizontalNote,pixelsPerNote*verticalNote,(14/15)*pixelsPerNote,(14/15)*pixelsPerNote);
    };
  };

  //Outlines on the input canvas, for debugging
  /*for(verticalNote = 0; verticalNote < notesHeight; verticalNote++) {
    for(horizontalNote = 0; horizontalNote < notesWidth; horizontalNote++) {
      inputCanvasCtx.strokeStyle = 'black';
      inputCanvasCtx.strokeRect(pixelsPerNote*horizontalNote,pixelsPerNote*verticalNote,(14/15)*pixelsPerNote,(14/15)*pixelsPerNote);
    };
  };*/
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
