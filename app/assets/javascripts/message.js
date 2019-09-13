$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div data-messageid="${message.id}">
                <div class="contents-main-right-message__user">
                  <div class="contents-main-right-message__user-name">
                        ${message.user_name}
                    </div>
                  <div class="contents-main-right-message__user-timestamp">
                        ${message.date}
                    </div>
                </div>
                  <div class="contents-main-right-message__message">
                      ${content}
                      ${img}
                    </div>
                    </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents-main-right').append(html);
      $('#new_message')[0].reset();
      scrollBottom();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.contents-main-message-form__send').prop('disabled', false)
    })
  })
});

function scrollBottom(){
  var target = $('.contents-main-right-message__user').last();
  var position = target.offset().top + $('.contents-main-right').scrollTop();
  $('.contents-main-right').animate({
    scrollTop: position
  }, 300, 'swing');
}