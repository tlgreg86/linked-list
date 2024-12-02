// Initialize storage functions
const storage = {
  save: function(bookmarks) {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  },
  load: function() {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
  },
  getBookmarks: function() {
    return $('.bookmark').map(function() {
      const $bookmark = $(this);
      return {
        title: $bookmark.find('h2').text(),
        url: $bookmark.find('a').attr('href'),
        isRead: $bookmark.hasClass('read-count')
      };
    }).get();
  }
};

// Load saved bookmarks on page load
$(document).ready(function() {
  const savedBookmarks = storage.load();
  savedBookmarks.forEach(function(bookmark) {
    makeBookmark(bookmark.title, bookmark.url, bookmark.isRead);
  });
  counter();
});

//disable enter button on startup
$('#enter').prop('disabled', true);

//enable enter button upon text entry
$('input[type=text]').on('keyup', function(){
  var $name = $('#title').val();
  var $url = $('#address').val();
  if ($name !== '' || $url !== ''){
    $('#enter').prop('disabled', false);
  } else {
    $('#enter').prop('disabled', true);
  }
});

//enter button and forwarding site information to checkForText
$('#enter').on('click', function(event) {
  event.preventDefault();
  var $name = $('#title').val();
  var $url = $('#address').val();
  checkForText($name, $url);
  counter();
  $('#enter').prop('disabled', true);
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
    alert('Please enter a valid URL that includes http://, https://, or ftp:// as a prefix.');
  } else {
    makeBookmark($name, $url, false);
    $('#title').val('');
    $('#address').val('');
  }
}

//creates HTML and enters information into object
function makeBookmark($name, $url, isRead = false) {
  const bookmarkTemplate = `
    <div class="bookmark${isRead ? ' read-count' : ''}">
      <h2>${$name}</h2>
      <div class="break"></div>
      <a href="${$url}" 
         class="original-underline text-regular${isRead ? ' activated' : ''}">${$url}</a>
      <div class="break"></div>
      <button class="original-underline read${isRead ? ' read-button-toggled' : ''}">Read</button>
      <button class="original-underline delete">Delete</button>
    </div>
  `;

  $('.bookmarks-list').prepend(bookmarkTemplate);
  storage.save(storage.getBookmarks());
}

//delete button
$('.bookmarks-list').on('click','.delete', function() {
  $(this).parent('.bookmark').remove();
  counter();
  storage.save(storage.getBookmarks());
});

//read button and toggle of read status
$('.bookmarks-list').on('click','.read', function() {
  const $bookmark = $(this).parent('.bookmark');
  $bookmark.toggleClass('read-count');
  $bookmark.find('a').toggleClass('activated');
  $(this).toggleClass('read-button-toggled');
  counter();
  storage.save(storage.getBookmarks());
});

//delete button for read links
$('#delete-read').on('click', function(event) {
  event.preventDefault();
  $('.read-count').remove();
  counter();
  storage.save(storage.getBookmarks());
});

//counter for number of entries, read, and unread
function counter () {
  var totalCount = $('.bookmark').length;
  var readCount = $('.read-count').length;
  var unreadCount = totalCount - readCount;
  $('#total').text(totalCount);
  $('#total-read').text(readCount);
  $('#unread').text(unreadCount);
  leftHeight(totalCount);
}

//detect window resize
$(window).on('resize', function(){
  counter()
});

//colors window correctly upon resize
function leftHeight(totalCount) {
  if ($(window).width() < 750) {
    $('.input-area').css('height', '50%');
  } else if (totalCount >= 5){
    adjustedCount = totalCount - 4;
    adjustedPixels = 700 + (adjustedCount * 166);
    $('.input-area').css('height', adjustedPixels+'px');
  } else {
    $('.input-area').css('height', '700px');
  }
}
