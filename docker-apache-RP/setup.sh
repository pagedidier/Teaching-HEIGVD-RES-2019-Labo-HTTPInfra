#!/usr/bin/env bash
staticContainerImage=res/static_image
dynamicContainerImage=res/dynamic_image
rpContainerImage=res/rp_image

staticContainerName=static_app
dynamicContainerName=dynamic_app
rpContainerName=rp_app

docker stop $staticContainerName
docker stop $dynamicContainerName
docker stop $rpContainerName

docker rm $staticContainerName
docker rm $dynamicContainerName
docker rm $rpContainerName


cd ..
cd docker-apache-image
docker build . -t $staticContainerImage

cd ..
cd docker-express-image
docker build . -t $dynamicContainerImage

cd ..
cd docker-apache-RP
docker build . -t $rpContainerImage

docker run -d --name $staticContainerName $staticContainerImage
docker run -d --name $dynamicContainerName $dynamicContainerImage

ipstatic=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $staticContainerName)
ipdynamic=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $dynamicContainerName)

echo $ipstatic
echo $ipdynamic

docker run -d -e $staticContainerName=$ipstatic:80 -e $dynamicContainerName=$ipdynamic:3000 -p 80:80 --name $rpContainerName $rpContainerImage

