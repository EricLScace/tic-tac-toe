// Log-in HTML
const strSignIn = " \
  <div class='player1 col-xs-offset-1 col-xs-3'> \
    <form id=\"sign-in\"> \
      <fieldset> \
        <p>Log in:</p> \
        \
        <input type='text' \
        name='credentials[email]' placeholder='player name'> \
        <br> \
        \
        <input type='password' \
        name='credentials[password]' placeholder='password'> \
        <br> \
        \
        <input type=\"submit\" name=\"submit\" value=\"Log in\"> \
      </fieldset> \
    </form> \
  </div> \
  "
  //
  // <!-- register form -->
  // <div class='player1 col-xs-3'>
  //   <form id="sign-up">
  //     <fieldset>
  //       <p>…or register:<p>
  //
  //       <input type='text'
  //       name='credentials[email]' placeholder='username'>
  //
  //       <input type='password'
  //       name='credentials[password]' placeholder='password'>
  //
  //       <input type='password'
  //       name='credentials[password_confirmation]' placeholder='confirm password'>
  //
  //       <input type="submit" name="submit" value="Sign up!">
  //     </fieldset>
  //   </form>
  // </div>

module.exports = {
  strSignIn
}
