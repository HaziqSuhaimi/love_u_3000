// console.log("test")
const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

// handTrack.load(modelParams).then(model => {

// });

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

handTrack.startVideo(video).then(status => {
    if(status){
      navigator.getUserMedia(
        { video: {} },
        stream => {
          video.srcObject = stream;
          setInterval(runDetection, 100);
        },
        err => console.log(err)
      );
    }
  });

function runDetection(){
  model2.detect(video).then(predictions => {
      //console.log(predictions);
      if(predictions.length !== 0){
        let hand1 = predictions[0].bbox;
        bbox = hand1;
		//console.log(bbox[0])
      }
      model2.renderPredictions(predictions, canvas, context, video);
    }); 
}

handTrack.load(modelParams)
  .then(lmodel => {
    model2 = lmodel;
  });
