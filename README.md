## instructions
install nodejs 10.x
by this commands:
`curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`.


`sudo apt-get install -y nodejs`.

on 'server' directory run `npm i --save` for packages installing

## path configuration
threre is a file named `conf.json` that include two strings properties includes full paths.
"root" property is the path to folder that contains pre-proccess files 
"libary" property is the path to folder that contains proccesed files and divieded by folders

## folders hyrarchey
Reference-style: 
![alt text](./hyrarchey.png)


## attention
the server and react-client run together thnaks to "concurrently" package so make sure that is installed (package.json of server in dependecies object)

## start app
run `npm run dev` in 'server' directory and the window will open automaticaly
the server run on port 5000


and client run on port 3000


in case browser not open automaticly you can navigate to http://localhost:3000/

for more details 0522210099 - shalom
