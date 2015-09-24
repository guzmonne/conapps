#!/bin/bash

echo "Checking dependencies...\n\n"

command -v meteor >/dev/null 2&1> || { echo >&2 "Meteor is not installed! Exiting now."; exit 1 }
command -v docker >/dev/null 2&1> || { echo >&2 "Docker is not installed! Exiting now."; exit 1 }

echo "Checking existance of Dockerfile...\n\n"

if [ ! -f ./Dockerfile ]; then 
  echo "Dockerfile not found! Exiting."
  exit 1
fi

echo "Checking if config file exists...\n\n"

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
  echo "Version: $version \n\n"
else
  echo "Version: $version is not a number! Exiting"
  exit 1
fi

echo "Getting folder name...\n\n"

folderName=${PWD##*/}

echo "Checking existance of /dist folder...\n\n"

mkdir -p dist

echo "Building Meteor App... \n\n"

meteor build ./dist

echo "Renaming build... \n\n"

cp ./dist/"$folderName".tar.gz ./dist/meteorApp.tar.gz
rm -f ./dist/"$folderName".tar.gz

echo "Creating image...\n\n"

docker build --tag="guzmonne/$folderName:$version" --rm=true .
 
sed -i -e 's/version="$version"/version=$(($version + 1))/g' buildMeteorDockerImage.cfg
 
