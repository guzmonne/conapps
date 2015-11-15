#!/bin/bash

printf "Checking dependencies...\n\n"

if ! hash meteor 2>/dev/null; then
  echo "Meteor is not installed. Exiting!"
  exit 1
fi

if ! hash docker 2>/dev/null; then
  echo "Docker is not installed. Exiting!"
  exit 1
fi

printf "Checking existance of Dockerfile...\n\n"

if [ ! -f ./Dockerfile ]; then 
  echo "Dockerfile not found! Exiting."
  exit 1
fi

printf "Checking if config file exists...\n\n"

if [ ! -f ./buildMeteorDockerImage.cfg  ]; then
  echo "Config file buildMeteorDockerImage.cfg does not exists! Exiting"
  exit 1
fi

source ./buildMeteorDockerImage.cfg

if [ -z ${version+x} ]; then
  echo "Missing version configuration on buildMeteorDockerImage.cfg! Exiting"
  exit 1
fi

if [ "$version" -eq "$version" ] 2>/dev/null
then
  printf "Version: $version \n\n"
else
  echo "Version: $version is not a number! Exiting"
  exit 1
fi

printf "Getting folder name...\n\n"

folderName=${PWD##*/}

printf "Checking existance of /dist folder...\n\n"

mkdir -p dist

printf "Building Meteor App... \n\n"

meteor build ./dist

printf "Renaming build... \n\n"

cp ./dist/"$folderName".tar.gz ./dist/meteorApp.tar.gz
rm -f ./dist/"$folderName".tar.gz

printf "Creating image...\n\n"

#printf "Building new version image:\n"

#docker build --tag="guzmonne/$folderName:$version" --rm=true .

printf "\nUpdating 'latest' image:\n"

docker build --tag="guzmonne/$folderName:latest" --rm=true .

printf "\n Cool! All Done!\n"

echo "version=$(($version + 1))" > buildMeteorDockerImage.cfg
