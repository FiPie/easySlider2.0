var images = ["01.png", "02.png", "03.png"];
var current = 0;
var imageWidth, imageHeight, timeout, allImagesWidth;


//Onload initial setup
$(function() {

  //Initial setup of images size
  setImagesSize();
  //Next we're loading all the images
  loadImages();
  //The slider will adjust its size to the window resizing event
  $(window).resize(function() {
    setImagesSize();
  });

});


function setImagesSize() {
  //Attempt to fastforward the current animation (if running) to it's next complete step and then continues
  if ($('.images').is(':animated')) {
    console.log('.images is animated');
    $('.images').stop(true, true);
  }
  //Normalized images width equal to the column element width
  imageWidth = $('.fluid-container').width();
  $('.images').append("<img id='sampleImg' src='images/" + images[0] + "'>");
  //The sample image sets the height standard for the other images
  $('#sampleImg').width(imageWidth);
  $('#sampleImg').on('load', function() {
    imageWidth = $('#sampleImg').width();
    imageHeight = $('#sampleImg').height();
    allImagesWidth = ((imageWidth * images.length));
    //Styling of the image slider elements
    $('.fluid-container').css({
      'width': imageWidth,
      'height': imageHeight
    });
    $('.images').css({
      'width': allImagesWidth,
      'height': imageHeight
    });
    $('.image').css({
      'width': imageWidth,
      'height': imageHeight
    });
    //After setting the standards, the sample image is removed
    $('#sampleImg').remove();
  });
}

function loadImages() {
  for (var i = 0; i < images.length; i++) {
    // Produces the img elements with sources pointing to the images
    var img = "<img class='image rounded' id='i" + (i + 1) + "' src='images/" + images[i] + "'>";
    $('.images').append(img);
    // Produces the pagination buttons to the coresponding images
    var li = "<li class='page-item'><a class='page-link' onclick='goToPage(" + i + ")'>" + (i + 1) + "</a></li>";
    $('.pagerList').append(li);
  }

  //Initial configuration of button events
  $('#stop').prop('disabled', true);
  $('#play').prop('disabled', false);
  $('#play').on('click', play);
  $('#prev').on('click', prev);
  $('#next').on('click', next);
}

function prev() {
  current = (current - 1 + images.length) % images.length;
  console.log('prev() current:' + current);
  $('.images').animate({
    'margin-left': -(current * imageWidth)
  }, 800, 'swing');
}

function next() {
  current = (current + 1 + images.length) % images.length;
  console.log('next() current:' + current);
  $('.images').animate({
    'margin-left': -(current * imageWidth)
  }, 800, 'swing');
}

function play() {
  $('.images').stop(true, true);
  $('#play').prop('disabled', true);
  $('#stop').prop('disabled', false);
  $('#play').off();
  $('#stop').off();

  $('#stop').on('click', pause);
  timeout = setInterval('next()', 2000);
}

function pause() {
  $('.images').stop(true, true);
  $('#stop').off();
  $('#stop').prop('disabled', true);
  $('#play').prop('disabled', false);

  $('#play').off();
  $('#play').on('click', play);
  clearInterval(timeout);
}

function goToPage(number) {
  current = number;
  $('.images').stop(true, true);
  $('.images').animate({
    'margin-left': -(current * imageWidth)
  }, 800, 'swing');
  console.log('goToPage() current=' + current);
};