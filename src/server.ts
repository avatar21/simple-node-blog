/// <reference path="typings/index.d.ts" />
"use strict";

import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
//import * as markdown from "markdown-js";
import { HtmlRenderer, Parser } from "commonmark";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";

//import * as index from "./routes/index";
import { IndexRoute } from "./routes/index";
import { BlogRoute } from "./routes/blog";

export class Server {

  public app:express.Application;
  private parser: Parser;
  private renderer: HtmlRenderer;

  public constructor() {
    //create expressjs application
    this.app = express();
    this.parser = new Parser();
    this.renderer = new HtmlRenderer();

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
  public static bootstrap(): Server {
    return new Server();
  }

   /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config (): void {
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

    //use override middlware
    this.app.use(methodOverride());

    this.app.engine('md', function(path, options, fn){
      fs.readFile(path, 'utf8', function(err, str){
        if (err) return fn(err);
        //str = markdown.parse(str).toString();
        str = this.renderer.render(this.parser.parse(str));
        fn(null, str);
      });
    });

    //catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
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
  }

/**
  * Create router.
  *
  * @class Server
  * @method config
  * @return void
  */
  public routes(): void {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);
    /*//app.use('/', index);
    this.app.get('/', function(req, res){
      res.render('index', this.getAllBlogFilesContentFn());
    });*/
    //app.use('/users', users);

    BlogRoute.create(router);

    this.app.use(router);
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api(): void {

  }
}
