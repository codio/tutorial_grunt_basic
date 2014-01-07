@annotation:file app
This is where our source content is located. 

@annotation:file dist
This is where Grunt will write all of its output. Compare some of the files in the `dist` folder with their counterparts in the `app` folder. You can see that many files are cache-busted (file names are prefixed with a has value). You can also see that the CSS (and JS) folder contains a file called `abcd.optimized.js` which conained minified and concatenated contents of the source files.

Although the original files are still there, they are not actually used in production.

If you look at the `dist/index.html` file, you will see how the references have been fixed up by Grunt.

@annotation:file app/index.html
This contains some interesting stuff. You will see the following code within it that is used by the `usemin` task.

    <!-- build:css css/optimized.css -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">        
    <!-- endbuild -->
    
    <!-- build:js js/optimized.js -->
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>        
    <!-- endbuild -->
        
The `<!-- build:css css/optimized.css -->` comment is used by `usemin` so it knows where to fix up references to concatenated and cache-busted files. If you look at `indez.html` within the `dist` folder, you will see the generated references, that look something like this

    <link rel="stylesheet" href="css/ec54.optimized.css"/>
    <script src="js/49ee.optimized.js"></script>


@annotation:file app/css/main.css
You can see that our CSS file contains a reference to an image

    background-image:url('../img/grunt.png');
    
Grunt will cache bust this image and the `usemin` task fixes up the reference to something like

    background-image:url('../img/dcae.grunt.png');

@annotation:file Gruntfile.js
This is where the magic happens. All build tasks are contained within this file and the tutorial will concentrate heavily on explaining it.

Select `Tools->Annotations Tour` to start the guided tour.


@annotation:tour start
#Introduction
Grunt will be known to many developers but if you have not used it before, we've put together a detailed Grunt tutorial that shows a typical use case.

Grunt is a task runner that runs operations on your files. Grunt tasks can be applied to all of your front and back end code. Here are just a few of the many tasks that have been built by the Grunt community.

- **Minify** - minifies js and css files
- **Concat** - joins js and css files into a single file to speed up page load
- **Copy** - copy files from a source location to a destination location
- **Rev** - static file revisioning using hashing, great for cache busting
- **Usemin** - replaces references to non-optimized scripts or stylesheets within a set of HTML files (or any templates/views)


##Grunt Site
You should visit the [Grunt Site](http://gruntjs.com) to get full details. There is also a [list of all publicly available Grunt Plugins](http://gruntjs.com/plugins).

##Our Use Case
We take a very simple HTML5 boilerplate type application and perform the following tasks to prepare it for production. The site has the following structure

![grunt tutorial source location](blog/tut-grunt-folders.png)

The `app` folder is where all our source content goes. Once the build task has run, the following steps are run. Feel free to click on the task names to see the Grunt task modules described in the npm site.

1. [clean](https://npmjs.org/package/grunt-contrib-clean) - this cleans the contents of the `dist` folder where our production content is written to by Grunt
1. [copy](https://npmjs.org/package/grunt-contrib-copy) - we copy the entire contents of the `app` folder into the `dist` folder ready for processing
1. [useminPrepare](https://npmjs.org/package/grunt-usemin) - this is the step that requires most understanding. I'll explain it in more detail below so as not to make this summary too messy. It analyzes your project ready for concatenation, uglification and minification and will auto generate these tasks.
1. [concat](https://npmjs.org/package/grunt-contrib-concat) - we want to concatenate all `.js` and `.css` files into 2 individual files so that the site loads faster.
1. [uglify]() - minifies `.js` files
1. [cssmin](https://npmjs.org/package/grunt-contrib-cssmin) - minifies `.css` files
1. [rev (images)](https://npmjs.org/package/grunt-rev) - cache busting of images by prefixing file names with a hash to make them unique.
1. [usemin (css)](https://npmjs.org/package/grunt-usemin) - we now fix up references within our css files to any images, bearing in mind that the above image cache-busting task will have changed image file names. More on this below.
1. [rev (js and css)](https://npmjs.org/package/grunt-rev) - now that the `.css` and `.js` files have been minified and concatenated, we will cache-bust them, too.
1. [usemin (html)](https://npmjs.org/package/grunt-usemin) - the final step is to fix up the references within our `index.html` file to `.js` and `.css` files, bearing in mind that the concatenation and cache-busting tasks will have changed their file names.

Once these steps run, the `dist` folder will contain our production ready content ready for deployment.

![grunt tutorial source location](blog/tut-grunt-dist.png)


@annotation:tour gruntfile
#Gruntfile.js
This is the magical Grunt file. All Grunt related tasks are defined here. There are three main areas you will need to configure

1. The tasks themselves (inside the JSON structure)
1. Load the NPM modules associated with each tasks
1. Configure task names by providing a task name along with the associated task you wish to run. 

That's it.

@annotation:tour grunt-tasks
#Defined Grunt Tasks
This section of code is where you define your tasks in detail. The following shows the [copy](https://npmjs.org/package/grunt-contrib-copy) task along with its parameters.

    copy: {                       // task name
        dist: {                   // 
            files: [{             // files to copy
                dest: 'dist/',    // name of the destination folder
                src: ['**'],      // name of the
                cwd: 'app/',      // points to the source root folder
                expand: true      // folders and sub-folders
            }]
        }
    }

Each task can be examined in more detail by clicking on the blue icon in the gutter.

One thing you will notice if you examine the task list is that there are no specific tasks for `concat`, `cssmin` and `uglify` yet these tasks are actually being performed. This is because `usemin` is performing some magic in the background.

For an explanation of how this works, click on the blue icon on the `useminPrepare` line.

@annotation:snippet task-clean
For details on `clean`, see [grunt-clean](https://npmjs.org/package/grunt-clean)

This removes files and folders from `dist` folder ready for the next operations.

@annotation:snippet task-copy
This copies files from the source folder to the destination folder. Once the copy has been done, all other tasks will operate on these copied files in the `dist` folder.

    copy: {                       // task name
        dist: {                   // 
            files: [{             // files to copy
                dest: 'dist/',    // name of the destination folder
                src: ['**'],      // name of the
                cwd: 'app/',      // points to the source root folder
                expand: true      // folders and sub-folders
            }]
        }
    }


@annotation:snippet task-useminPrepare
For details on `usemin`, see [grunt-usemin](https://npmjs.org/package/grunt-usemin)

`usemin` is a clever task (but hard to grasp initially) that takes file references and fixes them up after the referenced file names have changed. Such changes will occur as a result of cache-busting and concatentation.

For example, our project's `index.html` references css and javascript files

    <!-- build:css css/optimized.css -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">        
    <!-- endbuild -->
    
    <!-- build:js js/optimized.js -->
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>        
    <!-- endbuild -->

After concatenation, the two CSS files (same for the JS files) will be concatenated and cache-busted to end up with a single file, something like

    abcd.optimized.css
    
The `useminPrepare` task analyzes the files you point it to (in our project `dist/index.html`, in other words the freshly copied files) and then in the `options` parameter, we specify the destination folder.

If you run `grunt prep` our Gruntfile only runs the clean, copy and useminPrepare tasks. If you look at the console output, you will see that `useminPrepare` is actually generating some tasks on the fly.

    concat: {
        generated: {
            files: [{
                dest: '.tmp/concat/css/optimized.css',
                src: ['dist/css/normalize.css', 'dist/css/main.css']
            }, {
                dest: '.tmp/concat/js/optimized.js',
                src: ['dist/js/plugins.js', 'dist/js/main.js']
            }]
        }
    }
    uglify: {
        generated: {
            files: [{
                dest: 'dist/js/optimized.js',
                src: ['.tmp/concat/js/optimized.js']
            }]
        }
    }
    cssmin: {
        generated: {
            files: [{
                dest: 'dist/css/optimized.css',
                src: ['.tmp/concat/css/optimized.css']
            }]
        }
    }

These tasks are inserted into your Gruntfile for the duration of execution only. They will be run as soon as the actual `usemin` tasks is invoked.

You can see from the above output how `concat`, `uglify` and `cssmin` tasks will be executed when `usemin` is invoked.

However, `usemin` also does something else. It fixes up all references to any files in the `index.html` file. We had

    <!-- build:css css/optimized.css -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">        
    <!-- endbuild -->
    
... which, after concatenation and cache-busting becomes

    <link rel="stylesheet" href="css/ec54.optimized.css"/>

But, `usemin` also fixed up references in other files. For example, our `app/css/main.css` file contains the following reference 

    background-image:url('../img/grunt.png');
    
... which gets fixed up (in `dist/css/main.css`) to 

    background-image:url('../img/dcae.grunt.png');

This then gets concatenated and cache-busted along with `normalize.css` into `abcd.optimized.css`. The same procedure runs on the js files.

@annotation:snippet task-rev
For full details on `rev` see [grunt-rev](https://npmjs.org/package/grunt-rev)

This task generates hashes that are prepended to file names in order to ensure any previous files are not served up from the browser's cache. This is know as 'cache busting'. Whenever this task is run, new hashes will be generated.

You will see that there are two sub-tasks for this task, `img` and `jscss`. Due to the fact that our task workflow requires that images are fixed up before js and css files, we have defined these two sub-tasks. If you look at the end of `Gruntfile.js`, you will see that our operation invoked the tasks as follows (extract)

    ...., 'rev:img', 'usemin:css', 'rev:jscss', 'usemin:html' ....
    
We need to have the right sequence of execution as follows

1. We first cache-bust the image names with `rev:img` as our css files may reference these. 
1. Now, `usemin:css` is run to fix up references to any file names references by the css.
1. Next, we can cache-bust the css (and js) file with `rev:jscss`.
1. Finally, we can fix up the references to the js and css files within `index.html`.

@annotation:snippet task-usemin
For details on `usemin`, see [grunt-usemin](https://npmjs.org/package/grunt-usemin)

Please refer to the `useminPrepare: {` task higher up the `Gruntfile.js` as well as as the `rev` task annotation, where this is all described in detail. 

@annotation:tour load-tasks
#Load Grunt Modules
You need to explicitly load each NPM module that handles a task. You can look up NPM modules in [http://gruntjs.com/plugins](http://gruntjs.com/plugins).

You will need to add this manually to your Gruntfile.

@annotation:tour register-tasks
This is where you register one or more tasks with Grunt. The format is

    grunt.registerTask('operation_name', ['task_1', 'task_2', ... , 'task_n']);
    
You can specify more than one `task_name` as shown in this example, where we have defined `default` and `prep`. You can then run your task with 

`grunt` - runs the `default` operation.
`grunt prep` - runs the `prep` operation.

