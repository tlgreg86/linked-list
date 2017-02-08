$('input').keyup( function(){
  $('#enter').prop('disabled', true);
  if ($('#title').val() != '' || $('#address') != ''){
    $('#event').prop('disabled', false);
  }
});

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
  var check = /(http:\/\/|https:\/\/|ftp:\/\/)/
  if(check.test($url) === false) {
    alert('Please enter a valid URL');
  } else {
    makeBookmark($name, $url);
  }
}

//creates HTML and enters information into object
function makeBookmark($name, $url) {
  //create bookmark card
  $(".bookmarks-list").prepend(
    '<div class="bookmark">' +
      '<h2>' + $name + '</h2>' +
      '<div class="break">' + '</div>' +
      '<a href="'+ $url +'" class="original-underline text-regular">' + $url + '</a>' +
      '<div class="break">' + '</div>' +
      '<button class="original-underline read">' + 'Read' + '</button>' +
      '<button class="original-underline delete">' + 'Delete' + '</button;>' +
    '</div>');
  };

$('.bookmarks-list').on('click','.delete', function() {
  $(this).parent('.bookmark').remove();
  counter();
});

$('.bookmarks-list').on('click','.read', function() {
  $(this).parent('.bookmark').toggleClass('read-count');
  $('a').toggleClass('activated');
  $(this).toggleClass('read-button');
  counter();
});

//counter for number of entries, read,
function counter () {
  var totalCount = $('.bookmark').length;
  var readCount = $('.read-count').length;
  var unreadCount = totalCount - readCount;
  $('#total').text(totalCount);
  $('#total-read').text(readCount);
  $('#unread').text(unreadCount);
  leftHeight(totalCount);
  console.log(totalCount);
  console.log(readCount);
  console.log(unreadCount);
};

$(window).on('resize', function(){
  counter()
});

function leftHeight(totalCount) {
  if ($(window).width() < 750) {
    $('.input-area').css('height', '50%');
  }
  else if (totalCount >= 5){
    adjustedCount = totalCount - 4;
    adjustedPixels = 700 + (adjustedCount * 166);
    $('.input-area').css('height', adjustedPixels+'px');
  } else {
    $('.input-area').css('height', '700px');
  }
}
