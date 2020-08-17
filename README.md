The first commit
## INSTALL MONGO DATABASE
docker run -d --network bridge -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=marketplaceadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=marketplace123 \
    -e MONGO_INITDB_DATABASE=npm \
    mongo:4.2