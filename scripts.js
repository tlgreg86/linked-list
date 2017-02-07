//enter button and forwarding site information to checkForText
$('#enter').on('click', function() {
  var $name = $('#title').val();
  var $url = $('address').val();
  checkForText ($name, $url);
  counter();
})

//checks for valid text in input, then push information to checkForAddress
function checkForText(name, url) {
  if (name === "" || url === "") {
    alert("Please enter valid title and url.")
  } else {
    checkForAddress(name, url);
  }
}

//check for valid website (http, https, ftp), then push to creation of bookmark
function checkForAddress(name, url) {
  if //check for http, https, ftp
  else {
    makeBookmark(name, url);
  }
}

//creates HTML and enters information into object
function makeBookmark(name, url) {
  //HTML + information
}

//counter for number of entries, read,
function counter()
