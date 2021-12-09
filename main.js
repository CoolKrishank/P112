var prediciton1 = "";
var prediciton2 = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    image_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera')
function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jqYgsWq-X/model.json', modelLoaded);
function modelLoaded()
{
    console.log('modelLoaded');
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 ="First prediction is"+prediciton1;
    speak_data_2 ="Second prediction is"+prediciton2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    utterthis.rate = 0.5;
    synth.speak(utterthis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}
function gotResult(error,results)
{
  if(error){
      console.error(error);
  }
  else
  {
      console.log(results);
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;
      prediciton1 = results[0].label;
      prediciton2 = results[1].label;
      speak();
      if(results[0].label == "Happy"){
        document.getElementById("update_emoji").innerHTML = "&#128512";
      }
      if(results[0].label == "Sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532";
      }
      if(results[0].label == "Angry"){
        document.getElementById("update_emoji").innerHTML = "&#128545";
      }
      if(results[1].label == "Happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128516";
      }
      if(results[1].label == "Sad"){
        document.getElementById("update_emoji2").innerHTML = "&#128543";
      }
      if(results[1].label == "Angry"){
        document.getElementById("update_emoji2").innerHTML = "&#128548";
      }
  }
}