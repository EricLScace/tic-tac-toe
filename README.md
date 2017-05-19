Contents:
1. Links to wireframes & user stories.
2. Technologies used
  2.1 SCSS & SAAS
  2.2 bootstrap
3. Development story
4. Unsolved problems for future releases

1. Links:
• wireframes: in GitHub here:
  https://github.com/EricLScace/tic-tac-toe/blob/master/ui%20ux/TTT%20wireframe%20auth%20v1-0.jpg

  https://github.com/EricLScace/tic-tac-toe/blob/master/ui%20ux/TTT%20wireframe%20v1-0.jpg

• user stories: to be provided.

2. Technologies used

  2.1 SCSS & SASS
  The following files govern the site's appearance.
    - colors: semantic color definitions
    - themes: there are no user-selectable themes in v1.
    - typography: semantic definitions of allowed fonts/faces. In compliance with
        UI/UX and good typographical style, the following rules exist:
        • no view contains more than 4 typefaces (font + size + style)
        • each of the 4 typefaces has a specific purpose. See comments in this
            file for a description of purposes.
        • design for monochrome first.
        • color:
          - use sparingly.
          - each color has a specific meaning.
          - never more than 4 colors (including black) in a view.
    - composition: "Composition", in the classic sense from printing, are the stylistic
        rules governing the placement & appearance of pages, blocks of text, headers,
        footers, etc. The rules are defined semantically & deployed against the
        relevant classes/tags here. Composition rolls up color & typography together.

  2.2 Bootstrap
  Grid layout & responsive breakpoints driven by bootstrap.

3. Development story
Through the dev cycle, I kept checklists in Wunderlist of tasks yet to be completed.
These ranged from the very detailed (fix a detailed item in code) to the high-level
(derived from the mandatory requirements). These were priotized (level 0, 1, 2) & numbered:
  level 0: urgent & important: essential tasks that must be complete to meet the
    minimum requirements.
  level 1: urgent: not essential to meet minimum requirements, but worthwhile; e.g.,
    apply mixins and bootstrap for responsive design.
  level 3: important: not time-critical; e.g., Atom complains about a missing
    remark-lint module. Also includes thoughts about extra-credit features.

  3.1 Requirements review
  • Combed through the requirements spec in game-project/requirements.md for the
      minimum subset needed for v1 to be fully compliant.

  3.2 User stories
  • Developed user stories that illustrated all the v1 user-facing requirements.
  • Set aside for later any feature not absolutely essential to meet v1 requirements.

  3.3 Wireframes and UX flow
  • Developed a rough wireframe for the UI. This was altered later when bootstrap
      technology was introduced to the class.
  • Developed the basic UX flow from initial landing on the site through log-out
      of the last player.

  3.4 Data structure design
  • Reviewed authentication and game API specs.
  • Identified key objects (classes, really) for operation of the game logic.
      These included:
      - game
      - player
      Game includes two internal representations of the state of play. One is a
      linear array that mirrors the game API, choosen for simplicity of communication
      with the API. This array's state drives the UI depiction of the board, and
      drives a separate set of derivative arrays used to analysis the game state.
      Game state analysis determines:
      - is the game over?
      - are there no remaining plays that could win; i.e, the game will be a draw?
      These derivative arrays can be used in a future release to build a robot
      player.
  • Using the user stories, UX flow, wireframes, and v1 requirements, identified
      essential properties and methods for these objects.

  3.5 Build clean repo
  • Two attempts needed to build a clean repo from the browser template. The first
      attempt was abandoned as it carried the browser-template's commit history, and
      grunt deploy constructed the site at the wrong URL.

  3.6 Layout the UI
  • ui-roughout branch:
    - Laid out the principle elements on the display.
    - Minimal responsive design within a max and min screen width.
    - Re-acquainting myself with SCSS/SASS. I feel there are some simplifications
        that can be made to the SCSS files, but am deferring that kind of code
        optimization to later (if ever).

  3.7 Init the UI
  • Set the HTML to the landing-state for the page, where the first user is asked
      to log-in or register. Re-acquainting myself with manipulating the DOM.
  • Moved the log-in/registration forms to a forms.js file as defined HTML strings
      (with lots of escapes). This allowed the index.js to stuff them into the document
      when needed to log-in/register each player. Later I discovered the jQuery
      .load function to clean this up.
  • curl scripts added to test the API. Got them working against the dev server.
    - Had to switch to HTTP from HTTPS. Boo — dev server should be secure!
    - chmod +x required on each script.
    - Not including scripts in the commit as they may have exposed credentials,
        a security risk.
  • cribbed much code from the auth API training module lab.
  • Eventually dug deeper into the setAPIOrigin code to understand that I would
      receive the correct API address for use in API calls... and did not have to
      set up my own isProduction switch between dev and production environments.
  • Used a separate file to hold descriptions of Player class & the Players
      array. Placed this in an objects folder, as there will be other
      object/class definitions.
  • Got through to the display of game grid on successful log-in. Set aside
      further work on the game logic.

  3.8 Game logic
  • Defined the Game object, Path, and AllPaths.
  • Attach delegated event handler to the parent of the grid to handle clicks.
    Added all the game logic processing.

  3.9 After game logic
  • At end of game, remove the grid's click handler. Insert a button "play again?".
    When clicked, start a new game.

  3.10 Bug fix to title display. Had to delay loading the title text until
    after document rendered.

  3.11 User registration
  • Added user registration handlers to existing form.
  • Refactored game UI event handlers into their intended file for clarity.
  • Refactored Player to allow a objPlayer to be neither logged in or out, in
    order to cache a proffered name/password for later reuse (e.g., to log-in
    after registration).
  • Bug fixes needed.




4. Unsolved problems for future releases
  This list is maintained in Wunderlist & imported here.
  Items marked "0" are for v1 minimum compliant release.
  Items marked "1" are for improved UI/UX or better features.

  ❏ 0 refactor methods in player for clarity; find & adjust callers.
  ❏ 0 registered user does not get automatically logged in
  ❏ 0 game logic: last move wins but shows draw.
  ❏ 0 handle log-in failure
  ❏ 0 add bad user input handling to password, name fields in login/registration
      (code re-use)
  ❏ 0 game.js: add server updates
  ❏ 0. add log-out and password change buttons
  ❏ 0. hook up registration form
  ❏ 0. ReadMe must link to hosted game in URL section of my GitHub repo.
  ❏ 0. ReadMe: link to user stories.
  ❏ 0. ReadMe: list unsolved problems which would be fixed in future versions.
  ❏ 0. sign-in: handle bad returns. Notes on tested returns follow:
        Bad password generates .statusText "Unauthorized".
        Bad username generates same .statusText.

  ❏ 1 game.js: highlight winning paths (easy add-on)
  ❏ 1 game.js: modify player message if he is doomed ... or could win.
  ❏ 1 if a password change is requested before 1st game ends, use cached password
  ❏ 1 improve draw detector see examples
        x o x - x - o x o with O to move is already a draw, regardless of o's move.
        We don't detect this. Will need some look-ahead logic to do this.

  ❏ 1 timeout user's log-in after inactivity
  ❏ 1 UX: composition: CSS border radius applied to input fields, some margin
        all around
  ❏ 1: response design breakpoint mixins must be @import-ed last in the
        constructed CSS file. [details]
  	     ❏ Test to see if these breakpoint mixins can be defined in
         composition.scss, where they logically belong.

  ❏ 1: UX: all buttons same size, white background
  ❏ 1. Can player1 and player2 sub-classes be selected without prolifering IDs
        by selecting a combination of ID & class?
  ❏ 1. composition rules [checklist]
  	✔ tic tac toe title
  	✔ name block
  	✔ player actions block
  	✔ game announcements
  	❏ buttons
  	❏ add responsive design for narrow displays
  	❏ can Composition be simplified by consolidating hierarchies in the
      instructions?

  ❏ 1. cross-browser testing
  ❏ 1. define typography rules [checklist]
  	❏ Tic tac toe header
  	❏ name blocks
  	❏ player action text
  	❏ announcements
  	❏ x & o
  	❏ . typography: better font than helvetica
  	❏ 1. h1: define text size
  	❏ make type size scale responsively.

  ❏ 1. multi-player log-in changes checklist
  	❏ object/player.js: create 2 players as an array.
  	❏ auth/ui.js: signInSuccess for 2-player array.
  	❏ index.html: make space for 2nd player ident & controls.
