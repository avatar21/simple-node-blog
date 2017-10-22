/// <reference path="typings/index.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
var fs = require("fs");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
//import * as markdown from "markdown-js";
var commonmark_1 = require("commonmark");
var errorHandler = require("errorhandler");
//import * as index from "./routes/index";
var index_1 = require("./routes/index");
var blog_1 = require("./routes/blog");
var Server = (function () {
    function Server() {
        //create expressjs application
        this.app = express();
        this.parser = new commonmark_1.Parser();
        this.renderer = new commonmark_1.HtmlRenderer();
        //configure application
        this.config();
        //add routes
        this.routes();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.engine('md', function (path, options, fn) {
            fs.readFile(path, 'utf8', function (err, str) {
                if (err)
                    return fn(err);
                //str = markdown.parse(str).toString();
                str = this.renderer.render(this.parser.parse(str));
                fn(null, str);
            });
        });
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
        /*** *** MISC START *** */
        // catch 404 and forward to error handler
        /*this.app.use(function(req:express.Request, res:express.Response, next:express.NextFunction) {
          var err = new Error('Not Found');
          //err.status = 404;
          next(err);
        });
    
        // error handler
        this.app.use(function(err:any, req:express.Request, res:express.Response, next:express.NextFunction) {
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
    
          // render the error page
          res.status(err.status || 500);
          res.render('error');
        });*/
        /*** *** MISC END *** */
    };
    /**
      * Create router.
      *
      * @class Server
      * @method config
      * @return void
      */
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        //IndexRoute
        index_1.IndexRoute.create(router, this.getAllBlogsContent());
        /*//app.use('/', index);
        this.app.get('/', function(req, res){
          res.render('index', this.getAllBlogsContentFn());
        });*/
        //app.use('/users', users);
        blog_1.BlogRoute.create(router);
        this.app.use(router);
    };
    Server.prototype.api = function () {
    };
    Server.prototype.getAllBlogsContent = function () {
        var result = {};
        var resultBlogs = [];
        for (var blog in this.getAllBlogs()) {
            fs.readFile('./views/blogs/' + blog + '.md', 'utf8', function (err, str) {
                if (err) {
                    // TEMP solution
                    return err;
                }
                //let genHtml = markdown.parse(str).toString();
                var genHtml = this.renderer.render(this.parser.parse(str));
                resultBlogs.push({
                    id: blog,
                    content: genHtml
                });
            });
        }
        result.blogs = resultBlogs;
        return result;
    };
    Server.prototype.getAllBlogs = function () {
        var result = {
            error: null,
            files: null
        };
        var mdFiles = [];
        var blogsPath = null;
        fs.realpath('./views/blogs/', function (err, resolvedPath) {
            console.log('blogs path = ' + resolvedPath);
            blogsPath = resolvedPath;
            fs.readdir(blogsPath, function (err, items) {
                console.log(items);
                result.error = err;
                if (items != null && items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        console.log(items[i]);
                        if (path.extname(items[i]) == '.md') {
                            mdFiles.push(items[i].split('.')[0]);
                        }
                    }
                }
                result.files = mdFiles;
                console.log('blog files = ' + JSON.stringify(result));
                return result;
            });
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=app.js.map