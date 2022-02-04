# Video2Image Converter And Moderation

Video2image converter is a wrapper built on top of ffmpeg module that convert a video to images at your desired FPS (30 FPS by default). 

It uses Node.js to run the script. The script runs from a bash script that takes care of installing relevant dependencies and taking user's input.
 
 - Just run the script and follow the instructions.

### Tech

 - Node
 - FFmpeg
 - unscan.co

 ### .env

 create .env file and add Following key and values to it

 ```
 AWS_S3_REGION=
 AWS_S3_ACCESS_KEY=
 AWS_S3_SECRET_ACCESS_KEY=
``` 

### Environment

content-moderation requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

Add array of video file keys of s3 to app.js  
```
$ node index.js
```


### Development

Want to contribute? Great! Feel free to open a PR.

License
----

MIT

