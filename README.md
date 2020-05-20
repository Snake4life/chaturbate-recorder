# chaturbate-recorder
A very simple nodejs daemon that automatically records chaturbate streams.
# Dependencies
  * [ffmpeg](https://ffmpeg.org/download.html)
  * [nodejs](https://nodejs.org/en/)
  * [youtube-dl](https://ytdl-org.github.io/youtube-dl/download.html)
  * A brain
# Configuration
  * Download the repo.
  * Make sure all the dependencies are installed.
  * Open config.js and edit the list of models you wish to record.
  * Edit the refreshing interval if you wish. Making this very small might result in rate limiting but I don't know for sure.
  * Run `npm i`
  * Run `npm start`
  * Leave it running and enjoy.