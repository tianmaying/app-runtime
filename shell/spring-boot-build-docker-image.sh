#!/bin/bash
if [ $# -ne 3 ]; then
    echo "3 parameters needed: dirname cloneurl exposeport"
else
    mkdir $1
    cd $1
    echo "clone begin..."
    git clone $2
    PNAME=`ls`
    echo "enter dir: "$PNAME
    cd *

    echo "genrate Dockerfile..."
    ARTIFACTID=`sed -n 's/.*>\(.*\)<\/artifactId>/\1/p' pom.xml | head -1`
    VERSION=`sed -n 's/.*>\(.*\)<\/version>/\1/p' pom.xml | head -1`
    sed 's/{artifact}/'$ARTIFACTID'/g' ../../template/Dockerfile.template |  sed 's/{version}/'$VERSION'/g' > Dockerfile

    echo "generate pom.xml with docker:build"
    sed -i "s/<\/project>//g" pom.xml
    cat ../../template/pom.template >> pom.xml 
    sed -i "s/@dockerimageprefix@/"$1"/g" pom.xml
    
    mvn clean package docker:build

    docker run -p $3:8080 -d $1/$ARTIFACTID
fi
