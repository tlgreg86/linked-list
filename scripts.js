//enter button and forwarding site information to checkForText
$('#enter').on('click', function(event) {
  event.preventDefault();
  var $name = $('#title').val();
  var $url = $('#address').val();
  checkForText ($name, $url);
  $('#title').val('');
  $('#address').val('');
  counter();
})

//checks for valid text in input, then push information to checkForAddress
function checkForText($name, $url) {
  if ($name === "" || $url === "") {
    alert("Please enter valid title and url.")
  } else {
    checkForAddress($name, $url);
  }
}

//check for valid website (http, https, ftp), then push to creation of bookmark
function checkForAddress($name, $url) {
  // if {}//check for http, https, ftp
  // else {}
  makeBookmark($name, $url);
}

//creates HTML and enters information into object
function makeBookmark($name, $url) {
  //create bookmark card
  $(".bookmarks-list").prepend(
    '<div class="bookmark">' +
      '<h2>' + $name + '</h2>' +
      '<div class="break">' + '</div>' +
      '<a href="'+ $url +'" class="text-regular">' + $url + '</a>' +
      '<div class="break">' + '</div>' +
      '<button class="read">' + 'Read' + '</button>' +
      '<button class="delete">' + 'Delete' + '</button;>' +
    '</div>');
  };

$('.bookmarks-list').on('click','.delete', function() {
  $(this).parent('.bookmark').remove();
  counter();
});

$('.bookmarks-list').on('click','.read', function() {
  $(this).parent('.bookmark').toggleClass('readCount');
  counter();
});

//counter for number of entries, read,
function counter () {
  var readCount = $('.readCount').length;
  var totalCount = $('.bookmark').length;
  var unreadCount = totalCount - readCount;
  $('#total').val() = totalCount;
  $('#totalRead').val() = readCount;
  $('#unread').val() = unreadCount;
  console.log(totalCount);
  console.log(readCount);
  console.log(unreadCount);
  //need to update counters on site
}
