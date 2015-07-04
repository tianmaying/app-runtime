if [ $# -ne 2 ]; then
    echo "2 parameters needed: uniqueId projectName"
else
    COUNT=`docker ps | grep $1 | wc -l`
    CONTAINERID=`docker ps | grep $1 | awk '{print $1}'`
    if [ $COUNT -eq 1 ]; then
        echo "kill container: "$CONTAINERID
        docker kill $CONTAINERID
        echo "rm container: "$CONTAINERID
        docker rm $CONTAINERID
        echo "rm image: "$1/$2
        docker rmi $1/$2
	rm -rf $1
    else 
        echo "matched active container number error:"$COUNT
    fi
fi
