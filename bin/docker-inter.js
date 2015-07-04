var process = require('child_process');

function cleanDocker( uniqueId, projectName) {
        var child = process.spawn('shell/docker-clean.sh', [uniqueId, projectName] );
        child.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
        });
}

exports.clean = cleanDocker;
