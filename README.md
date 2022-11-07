# Ats-Test
Ats-Test Technique MERN

Home page <br />
![alt text](https://i.ibb.co/qxy3D3x/home-page.png)

Detail page <br />
![alt text](https://i.ibb.co/v17TyYn/detail-page.png)

Recherche Function  <br />
![alt text](https://i.ibb.co/mXQ8mn8/recherche-by-category-and-price.png)

Rating  function ( can find rating with filter recherche if exist) <br />
![alt text](https://i.ibb.co/nR7vSfL/recherche-by-rating-and-category.png)


## Available Scripts
### `development mode`

in the front floder:.<br />
verifay  #NODE_ENV = prod in .env file.<br />
install node monduls with commande ligne : npm i.<br />
Runs  npm run start.<br />
Open [http://localhost:3000](http://localhost:3000) .<br />
in the back floder:.<br />
Install node monduls with commande ligne : npm i.<br />
verifay #NODE_ENV = production 
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
pull image from  docker hub  :  docker pull oussamahassani20/atstest:latest <br />
and run image at port 5000<br />

##Available API
### `/products`
save product to data base and delete old product if existe
### `/product/:step`
get product with max 20 element 
### `/oneproduct/:id`
get one product
### `/findbyReview/:step`
get product with filter review
### `/productCat`
get all category 