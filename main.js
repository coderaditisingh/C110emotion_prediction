prediction_1 = "";
prediction_2 = "";

Webcam.set
(
    {
width : 350,
height : 300,
image_format : 'png',
png_quality : 90
    }
);

camera = document.getElementById("camera");
webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src="'+ data_uri +'"/>';
    });
}

console.log('ml5 version:',ml5.verion);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Es2lb8vtL/model.json',modelLoaded);
 
function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = wimdow.speechSynthesis;
    speak_data_1 = "the first prediction is " + prediction_1 ;
    speak_data_2 = "and the second prediction is " + prediction_2 ;
    var utterThis = new speechSynthesisUtterence (speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
    console.log(error);
    }
    else
    {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;

    }
}



