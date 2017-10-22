/// <reference path="../typings/index.d.ts" />
"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as fs from "fs";
import * as path from "path";

/**
 * / route
 *
 * @class Blog
 */
export class BlogRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[BlogRoute::create] Creating blog route.");
    //add home page route
    router.get("/listBlogs", (req: Request, res: Response, next: NextFunction) => {
      new BlogRoute().list(req, res, next);
    });
    router.get("/blogs/:title.html", (req: Request, res: Response, next: NextFunction) => {
      new BlogRoute().view(req, res, next);
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  public view(req: Request, res: Response, next: NextFunction) {
      var urlPath = [
        // 获取相对路径, 我的应该是:
        // /Users/lvjian/projects/nodejs/nodeblog
        process.cwd(),
        '/views/blogs/',
        req.params.title, '.md'
      ].join('');

      let filePath = path.normalize(urlPath);

      fs.exists(filePath, function (exists) {
        console.log(exists);

        if(!exists) {
          next();
        } else {
          res.render(urlPath, {layout: false});
        }
      });
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public list(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Minfaatong.net";

    //set options
    let options: Object = {
      "message": "Welcome to the Tour of Heros"
    };

    res.json(this.getAllBlogs());

    //render template
    //this.render(req, res, "index", options);
  }

  /**
   * 
   */
  public getAllBlogsContent():any {
    var result:any = {};
    var resultBlogs = [];
    for (var blog in this.getAllBlogs()) {
      fs.readFile('./views/blogs/'+blog+'.md', 'utf8', function(err, str){
        if (err) {
          // TEMP solution
          console.error('error reading file: '+err);
          return err;
        }
        //let genHtml = markdown.parse(str).toString();
        let genHtml = this.renderer.render(this.parser.parse(str));
        resultBlogs.push({
          id: blog,
          content: genHtml
        });
      });
    }
    result.blogs = resultBlogs;

    return result;
  }

  /**
   * 
   */
  public getAllBlogs(): any {
    var result = {
      error: null,
      files: null
    };
    var mdFiles = [];
    var blogsPath = null;

    fs.realpath('./views/blogs/', function(err, resolvedPath){
      console.log('blogs path = '+resolvedPath);
      blogsPath = resolvedPath;

      fs.readdir(blogsPath, function(err, items) {
        console.log(items);
        result.error = err;
        if (items != null && items.length > 0) {
          for (var i = 0; i < items.length; i++) {
            console.log(items[i]);
            if (path.extname(items[i])=='.md') {
              mdFiles.push(items[i].split('.')[0]);
            }
          }
        }
        result.files = mdFiles;

        console.log('blog files = '+ JSON.stringify(result));

        return result;
      });
    });
  }
}