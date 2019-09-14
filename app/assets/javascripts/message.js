$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="contents-main-right-message" data-messageid="${message.id}">
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

  function scrollBottom(){
    var target = $('.contents-main-right-message__user').last();
    var position = target.offset().top + $('.contents-main-right').scrollTop();
    $('.contents-main-right').animate({
      scrollTop: position
    }, 300, 'swing');
  }

  var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){   
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  var last_message_id = $('.contents-main-right-message:last').data('messageid');
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: 'api/messages#index' ,
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
      //メッセージが入ったHTMLを取得
      insertHTML = buildHTML(message);
      //メッセージを追加
      $('.contents-main-right').append(insertHTML);
      //スクロール
      $('.contents-main-right').animate({scrollTop: $('.contents-main-right')[0].scrollHeight}, 'fast');
    });
  })
    .fail(function() {
      console.log('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});