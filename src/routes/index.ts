/// <reference path="../typings/index.d.ts" />
"use strict";

import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as path from "path";
import * as fs from "fs";
import { HtmlRenderer, Parser } from "commonmark";
import * as async from "async";
import * as escape from "escape-html";

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
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

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "棉花糖网";
    let blogs = this.getAllBlogFilesContent();

    //set options
    let options = {
      message: "开源，设计，分享",
      blogs: blogs
    };
    //render template
    this.render(req, res, "index", options);
    
  }

  /**
   * @class IndexRoute
   * @method getAllBlogFilesContent
   * @return blogs content
   */
  public getAllBlogFilesContent():any[] {
    let parser = new Parser();
    let renderer = new HtmlRenderer();
    var result:any = { 
      blogs: null 
    };
    let resultBlogs = [];
    let filenames: any[] = this.getAllBlogFiles();
    
    filenames.forEach(function(filename){
      let fileContent = fs.readFileSync('./views/blogs/'+filename+'.md', 'utf8').toString();
      let genHtml = renderer.render(parser.parse(fileContent));
      resultBlogs.push({
        id: filename,
        content: genHtml
      });
    });
    result.blogs = resultBlogs;
    console.log('blogs = '+JSON.stringify(resultBlogs));
    return result;
  }

  /**
   * @class IndexRoute
   * @method getAllBlogFiles
   * @return files
   */
  public getAllBlogFiles(): any[] {
    let mdFiles = [];
    let blogsPath = null;
    
    blogsPath = fs.realpathSync('./views/blogs/');
    console.log('blogs path = ' + blogsPath);
        
    let dirFiles = fs.readdirSync(blogsPath);

    console.log(dirFiles);
    if (dirFiles != null && dirFiles.length > 0) {
      dirFiles.forEach(function (dirFile) {
        console.log('all files under dir = '+dirFile);
        if (path.extname(dirFile) == '.md') {
          mdFiles.push(dirFile.split('.')[0]);
        }
      });
    }
    console.log('blog files = ' + JSON.stringify(mdFiles));
    return mdFiles;
  }

}
