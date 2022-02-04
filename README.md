# Video2Image Converter And Moderation

Video2image converter is a wrapper built on top of ffmpeg module that convert a video to images at your desired FPS (30 FPS by default). 

It uses Node.js to run the script. The script runs from a bash script that takes care of installing relevant dependencies and taking user's input.
 
 - Just run the script and follow the instructions.


### Screenshots

![Alt text](/images/script.png?raw=true "Bash Script")

The results in destination folder as: 


![Alt text](/images/pics.png?raw=true "Result")

### Tech

 - Node
 - FFmpeg
 - unscan.co

### Environment

Video2Image requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and devDependencies and start the server.

Add array of video file keys of s3 to app.js  
```
$ node app.js
```


### Development

Want to contribute? Great! Feel free to open a PR.

License
----

MIT

