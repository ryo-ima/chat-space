$(document).on('turbolinks:load', function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
  })
});