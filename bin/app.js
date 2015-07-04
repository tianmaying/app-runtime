var restify = require('restify');
var crypto = require('crypto');
var md5 = crypto.createHash('md5')

var builder = require('./build-inter.js');
var docker = require('./docker-inter.js');

function buildRespond(req, res, next) {
        //res.send('hello ' + req.params.name);
        var cloneUrl = req.params.cloneurl;
        console.log(cloneUrl); 
        cloneUrl = 'https://github.com/tianmaying/spring-boot-hello-world.git';

        var buildType = req.params.buildtype;
        var uniqueId = md5.update(crypto.randomBytes(16).toString('hex')).digest('hex');
        var port = 8081;
        if(builder[buildType])
                builder[buildType](uniqueId, cloneUrl, port);
        else 
                console.log(buildType + 'not exists!');
        res.send(uniqueId + '/' + cloneUrl + '/' + port);
}

function cleanRespond(req, res, next) {
        
        var uniqueId = req.params.uniqueid;
        var projectName = req.params.projectname;

        docker.clean(uniqueId, projectName);
        res.send('clean request received:' + uniqueId + '/' +projectName);
}

var server = restify.createServer();
server.get('/build/:cloneurl/type/:buildtype', buildRespond);
server.get('/clean/:uniqueid/project/:projectname', cleanRespond);

server.listen(3900, function() {
        console.log('%s listening at %s', server.name, server.url);
});
