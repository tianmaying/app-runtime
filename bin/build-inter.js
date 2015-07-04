var process = require('child_process');

(function() {
    var childProcess = require("child_process");
    oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

function buildSpringBoot( uniqueId, cloneUrl, port) {
	var child = process.spawn('shell/spring-boot-build-docker-image.sh', [uniqueId, cloneUrl, port] );
	child.stdout.on('data', function (data) {
  	  	console.log('stdout: ' + data);
  	  	//TODO stdout send to fontend SERVER
  	});
}

exports.springboot = buildSpringBoot;
