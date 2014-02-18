#Grunt Tutorial
This tutorial is designed to give a comprehensive overview of Grunt. It comes with a very simple project (a hello world type web site) and is fully runnable within Codio (or anywhere else for that matter).

##Installation
This project is ready to run in Codio. All you need to do is the following

1. Create a free account with Codio
1. The tutorial can be found in this [GitHub repo](https://github.com/codio/tutorial_grunt_basic)
1. Either a) Clone the project URL from the GitHub page (it's on the right hand side; use https if you have not [added your Codio SSH key](https://codio.com/s/docs/settings-prefs/account-settings/public-key/) to your GitHub account) - or b) you can copy the following to the clipboard : `https://github.com/codio/tutorial_grunt_basic.git`
1. From the main Codio Dashboard (where your projects are managed) click the 'Create Project' tab.
1. Select the 'Git' option, paste in the link from Step 3. then press the 'Create Project button'.
1. As soon as the project has been imported you will be taken to the IDE.
1. Open up a Terminal window by selecting the 'Tools->Terminal' menu option.
1. `npm install` which will install the necessary modules for our Grunt tasks (all dependencies found in `package.json` will get installed)
1. Then install `npm install -g grunt-cli` to get the Grunt command line interface tool.

##Annotations Tutorial
This Tutorial uses Codio Annotations, which gives you two ways of getting tutored

1. Wherever you see a blue icon in the file tree or on a line of code (take a look at `Gruntfile.js`) you can click on it to get information
1. Click on `Tools->Annotations Tour` to get a guided tour.

##Viewing the site
You can view the site

- from the `src` folder (index.html)
- from the `dist` production folder produced by our Grunt tasks
- we've also included options in the Preview menu (right most menu option); if you select 'Configure...' or you open the `codio` file, you will see how this has been set up.

And you can run your Grunt tasks from a Terminal window

- just enter `grunt` in the console window and it will run.
- or look in the Run menu (second menu item from the right); if you select 'Configure...' or open the `.codio` file, you will see how this has been set up.
