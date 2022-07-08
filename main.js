sound="";
leftWristX=0;
rightWristX=0;
rightWristY=0;
leftWristY=0;
scoreleftWrist=0;
function setup(){
    canvas=createCanvas(1000,800);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotposes);
    
}
function gotposes(results){
    if (results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist="+scoreleftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("left wrist x="+ leftWristX+ " left wrist y="+leftWristY);
        console.log("right wrist x="+ rightWristX+ " right wrist y="+rightWristY);
    }
}
function draw(){
    image(video,0,0,1000,800);
    
    fill("white");
    stroke("black");
    if (scoreleftWrist>0.2){


    circle(leftWristX,leftWristY,20);
    numberleftWristY=Number(leftWristY);
    removedecimal=floor(numberleftWristY); 
    volume=removedecimal/800;
    document.getElementById("volume").innerHTML="Volume:"+volume;
    sound.setVolume(volume);
    }
    if(scorerightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<200){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            sound.rate(0.5);

        }
        if(rightWristY>200 && rightWristY<400){
            document.getElementById("speed").innerHTML="Speed = 1x";
            sound.rate(1);
        }
        if(rightWristY>400 && rightWristY<600){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            sound.rate(1.5);
        }
        if(rightWristY>600){
            document.getElementById("speed").innerHTML="Speed = 2x";
            sound.rate(2);  
        }
    }
   
}
function preload(){
    sound=loadSound("music.mp3");

}
function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
function stop(){
    sound.stop();
}
function modelLoaded(){
    console.log("model loaded");
}