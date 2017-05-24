__Content__
>1. Links to wireframes & user stories.
>2. Technologies used
>3. Development story
>4. Unsolved problems for future releases

__1. Link__

>• Wireframes are stored in GitHub here:
  https://github.com/EricLScace/tic-tac-toe/blob/master/ui%20ux/TTT%20wireframe%20auth%20v1-0.jpg
  https://github.com/EricLScace/tic-tac-toe/blob/master/ui%20ux/TTT%20wireframe%20v1-0.jpg

>• User stories: to be provided.

__2. Technologies uses__

>__2.1 HTML__

>__2.2 Javascript__

>__2.3 SCSS & SASS__ To clarify operation on DOM elements, I divided rôles as follows:
* UI events: connected to a DOM element ID whenever possible. If an event handler listened to a collection of DOM elements, prefer to use a delegated event handler. If a class name was needed for a collection of elements that did not fit in the DOM hierarchy, choose a class name with a verb that relates to the UI event; e.g., class="log-out-buttons".
* UI appearance: propagated into the DOM strictly through class names. Appearance follows a hierarchy:
>* semantic composition: the application of a group of semantic typography + semantic spaces to classes of visual elements, depending on the elements' rôle. Composition is built up from:
>>* semantic typography: ___continue revision here____
* the allowed combination of font + face (italic, roman, small cap) + weight (normal, bold) + color: semantic color definitions. Each combination conveys a specific functional meaning throughout the site.
  * themes: there are no user-selectable themes in v1.
  * typography: semantic definitions of allowed fonts/faces. In compliance with UI/UX and good typographical style, the following rules exist:
    * no view contains more than 4 typefaces (font + size + style)
    * each of the 4 typefaces has a specific purpose. See comments in this file for a description of purposes.
    * design for monochrome first.
    * color:
      * use sparingly.
      * each color has a specific meaning.
      * never more than 4 colors (including black) in a view.
    * composition: "Composition", in the classic sense from printing, are the stylistic rules governing the placement & appearance of pages, blocks of text, headers, footers, etc. The rules are defined semantically & deployed against the relevant classes/tags here. Composition rolls up color & typography together.

>__2.2 Bootstrap__
> Grid layout & responsive breakpoints driven by bootstrap.

>__2.3 Handlebars__
> Handlebars used for HTML template definition, pre-compiling, and dynamic insertion into the DOM.

>__3. Development story__
Through the dev cycle, I kept checklists in Wunderlist of tasks yet to be completed. These have been gradually migrated to GitHub issues as a result of feedback on May 19 Fri. These ranged from the very detailed (fix a detailed item in code) to the high-level (derived from the mandatory requirements). These were priotized (level 0, 1, 2) & numbered:
* level 0: urgent & important: essential tasks that must be complete to meet the minimum requirements.
* level 1: urgent: not essential to meet minimum requirements, but worthwhile; e.g., apply mixins and bootstrap for responsive design.
* level 2: important: not time-critical; e.g., Atom complains about a missing remark-lint module. Also includes thoughts about extra-credit features.

>__3.1 Requirements review__
>Combed through the requirements spec in game-project/requirements.md for the minimum subset needed for v1 to be fully compliant.

>__3.2 User stories__
>
> • Developed user stories that illustrated all the v1 user-facing requirements.
>
>• Set aside for later any feature not absolutely essential to meet v1 requirements.

__3.3 Wireframes and UX flow__
>• Developed a rough wireframe for the UI. This was altered later when bootstrap technology was introduced to the class.

>• Developed the basic UX flow from initial landing on the site through log-out of the last player.

>__3.4 Data structure design__

>• Reviewed authentication and game API specs.

>• Identified key objects (classes, really) for operation of the game logic. These included:
>* game
>* player

>>Game includes two internal representations of the state of play. One is a linear array that mirrors the game API, choosen for simplicity of communication with the API. This array's state drives the UI depiction of the board, and drives a separate set of derivative arrays used to analysis the game state. Game state analysis determines:
  * is the game over?
  * are there no remaining plays that could win; i.e, the game will be a draw?

>>These derivative arrays can be used in a future release to build a robot player.

>• Using the user stories, UX flow, wireframes, and v1 requirements, identified essential properties and methods for these objects.

>__3.5 Build clean repo__ Two attempts needed to build a clean repo from the browser template. The first attempt was abandoned as it carried the browser-template's commit history, and grunt deploy constructed the site at the wrong URL.

>__3.6 Layout the UI__ _ui-roughout branch:_
>* Laid out the principle elements on the display.
>* Minimal responsive design within a max and min screen width.
>* Re-acquainting myself with SCSS/SASS. I feel there are some simplifications that can be made to the SCSS files, but am deferring that kind of code optimization to later (if ever).

>__3.7 Init the UI__
>* Set the HTML to the landing-state for the page, where the first user is asked to log-in or register. Re-acquainting myself with manipulating the DOM.
>* Moved the log-in/registration forms to a forms.js file as defined HTML strings (with lots of escapes). This allowed the index.js to stuff them into the document when needed to log-in/register each player. Later I discovered the jQuery .load function to clean this up.
>* curl scripts added to test the API. Got them working against the dev server.
  * Had to switch to HTTP from HTTPS. Boo — dev server should be secure!
  * chmod +x required on each script.
  * Not including scripts in the commit as they may have exposed credentials, a security risk.
>* cribbed much code from the auth API training module lab.
>* Eventually dug deeper into the setAPIOrigin code to understand that I would receive the correct API address for use in API calls... and did not have to set up my own isProduction switch between dev and production environments.
>* Used a separate file to hold descriptions of Player class & the Players array. Placed this in an objects folder, as there will be other object/class definitions.
>* Got through to the display of game grid on successful log-in. Set aside further work on the game logic.

>__3.8 Game logic__
>* Defined the Game object, Path, and AllPaths.
>* Attach delegated event handler to the parent of the grid to handle clicks.
>* Added all the game logic processing.

>__3.9 After game logic__
>* At end of game, remove the grid's click handler. Insert a button "play again?". When clicked, start a new game.

>__3.10 Bug fix to title display__ Had to delay loading the title text until after document rendered.

>__3.11 User registration__
>* Added user registration handlers to existing form.
>* Refactored game UI event handlers into their intended file for clarity.
>* Refactored Player to allow a objPlayer to be neither logged in or out, in order to cache a proffered name/password for later reuse (e.g., to log-in after registration).
>* Bug fixes needed.

>__3.12 Deploy broken — introduce templates__ In packaging, the HTML templates used to contain e.g., the sign-in/register forms appear to be moved to locations not in agreement with the js require() functions. As a result, the site generates a 404 error each time it tries to load, as it cannot find the HTML templates.
>* Attempted to relocate the templates inside the js script folder; this did not work.
>* Danny suggested looking at Handlebars. https://www.sitepoint.com/a-beginners-guide-to-handlebars/. I tried the following:
>>* Install Handlebars globally with 'npm install handlebars -g'
>>* Placed the HTML templates in assets/scripts/templates.
>>* Renamed the HTML templates with .handlebars extension.
>>* Pre-compile the templates in the terminal with the command
        handlebars path/to/templates -f templatesCompiled.js
    This could be run in the templates folder to leave templatesCompiled.js in that folder; e.g.,
        handlebars . -f templatesCompiled.js
    Include these scripts in index.html:
        <script src="handlebars.runtime.js"></script>
        <script src="path/to/templatesCompiled.js"></script>
    Inject the templates as follows:
        const templateScript = Handlebars.templates.signInRegister()
        $('#player').html(templateScript, function () {
          authEvents.addHandlers()
        })
    This did not quite work (yet). Reverted slightly to allow local server testing to continue.

>__3.14 Vanishing event handler introduces structured code modules__ A bug caused by a missing event handler revealed a circular reference between two js files, each of which required the other. The event handler worked fine when described in the same file as the code that employed it, but failed when placed in a different file & required. This led to better structure between files:
>* authN files: deals only with user authentication activities: log-in, log-out, password-change and registration.
>* game files: deals only with game activities.
>Each ___continue from here___
>>* authNApiTx: exposes methods that result in calls to the server's API functions that deal with authentication.
>>* authNApiRx: API authentication event handlers.

>__3.15 Miscellaneous bug fixes__ See issue logs.

__4. Unsolved problems for future releases__
  This list is maintained in the GitHub Issues section.
