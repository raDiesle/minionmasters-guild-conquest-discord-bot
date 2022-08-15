# minionmasters-guild-conquest-discord-bot
minionmasters-guild-conquest-discord-bot

# how to run on local
## Prepare
- follow `prepare environment variables for local machine`
## Only on changed API
- for registering new commands, execute 
   `node deploy-commands.js`
## On every change of commands to be executed
- make sure to have only one instance running at the same time.
- to disable on heroku, stop the `worker node index.js`
- for running execution server, make sure its not running in the cloud at the same time and
   `npm start`

# how to run execution server on heroku
- make sure no server is running on local machine
- login to heroku
- go to deploy tab. the github code repo should appear ( requires sometimes reload of page)
- on bottom of page, apply manual apply
- make sure the `worker node index.js` is running

## See logs
- install heroku cli
- heroku  logs --app minionmasters-discord-bot --tail


# files
## `deploy-commands.js` 
- execute only on local machine so register listeners for the discord bot such as available chat commands
## `index.js`
- the running server which takes discord commands and returns chat results back

# prepare environment variables for local machine
- create config.json and provide ( read for `deploy-commands.json`)
```json
 {
  "token": "MTA--rest to take from discord developer",
  "clientId": "1006911--rest to take from discord developer",
  "guildId": "1006914--rest to take from discord developer"
  }
```
- create .env and provide (read for `index.js`)
```json
 {
  token=MTA--rest to take from discord developer
  }
```



# Helpful links
- developer discord.js docu https://discord.js.org/
- https://autocode.com/tools/discord/embed-builder/
- https://lingojam.com/DiscordFonts