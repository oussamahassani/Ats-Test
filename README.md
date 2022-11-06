# Ats-Test
Ats-Test Technique MERN


## Available Scripts
### `development mode`

in the front floder:.<br />
add # inside NODE_ENV in .env file.<br />
install node monduls with commande ligne : npm i.<br />
Runs  npm run start.<br />
Open [http://localhost:3000](http://localhost:3000) .<br />
in the back floder:.<br />
Install node monduls with commande ligne : npm i.<br />
Runs  npm run start.<br />

### `prod mode`
 check if  NODE_ENV=prod in font/.env file.<br />
Run  npm run build.
copie files in build folder to public back/public folder
 check if  NODE_ENV=production exist  in back/.env file.<br />
 Runs  npm run start-prod ( windows user)   or start-docker ( Linux user)  <br /> 
Open [http://localhost:5000](http://localhost:5000) .<br />


### `docker mode`
cd /back
create docker image with commande :  docker build . -t nameimage<br />
run docker image at port 5000 : docker run --publish 5000:5000 nameimage<br />
Or
pull image from  docker hub  :  docker push oussamahassani20/atstest <br />
and run image<br />

