docker run -p "8080:80" -d nginx
sleep .5
curl --silent localhost:8080

CONTAINER_ID=$(docker ps | grep nginx | awk "{print \$1}")

echo logs
echo $CONTAINER_ID | xargs -I {id} docker logs {id}
echo rm
echo $CONTAINER_ID | xargs -I {id} docker rm -f {id}