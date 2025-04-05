docker run \
	--name postgresJSExpert \
	-e POSTGRES_USER=matheus \
	-e POSTGRES_PASSWORD="senha0001" \
	-e POSTGRES_DB=heroes \
	-p 54321:5432 \
	-d \
	postgres

docker logs postgres
docker exec -it postgresJSExpert psql -U matheus -d heroes

CREATE TABLE warrios (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

SELECT * FROM warrios;

# MongoDB

docker run \
	--name mongoJSExpert \
	-e MONGO_INITDB_ROOT_USERNAME=matheus \
	-e MONGO_INITDB_ROOT_PASSWORD="senha0001" \
	-p 27018:27017 \
	-d \
	mongo:4

docker logs mongoJSExpert