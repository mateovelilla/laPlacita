# LaPlacita marketplace
## REQUIREMENTS
* docker-compose 1.26.2
## HOW TO INSTALL?
* > git clone https://github.com/mateovelilla/laPlacita.git 
* > cd laPlacita
* Rename file './server/env-sample' to './  server/.env'
 -- Enviroment file content:
        PORT=3000
        MONGODB_USERNAME=marketplaceadmin
        MONGODB_PASSWORD=marketplace123
        MONGODB_HOST=database
        MONGODB_PORT=27017
        MONGODB_DBNAME=marketplace
* Rename file './app/env-sample' to './  server/.env'
 -- Enviroment file content:
        VUE_APP_API_HOST=http://localhost:3000
*
 > docker-compose up  -d
* Access to:
> http://localhost:8080/