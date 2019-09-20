// htmlがロードされたら起動する
$(document).on('turbolinks:load', function(){
  // buildHTMLが呼び出され時の動き。もらってきたデータはmessageとして扱う
  function buildHTML(message) {
    // content にデータベースから取ってきたmessage.contentを代入。ただし、message.contentが無ければ空白にする
    var content = message.content ? `${ message.content }` : "";
    // img にデータベースから取ってきたmessage.imageを代入。ただし、message.imageが無ければ空白にする
    var img = message.image ? `<img src= ${ message.image }>` : "";
    // htmlに記述を代入
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
  // htmlを呼び出し元に返す
  return html;
  }
  // new_message id がsubmitされた時（送信された時）に発動
  $('#new_message').on('submit', function(e){
    // 一旦元のイベントを初期化
    e.preventDefault();
    // messageにnew_messageのフォームに入力されているものを代入
    var message = new FormData(this);
    // urlに今開かれているページのurlを代入
    var url = (window.location.href);
    // ajaxを起動
    $.ajax({  
      // urlは３４行目で指定したページを指定（現在のページ）
      url: url,
      // リクエストはPOSTで（＝createに飛ぶ)
      type: 'POST',
      // messageのデータを持って行って(=入力されたデータを持って行って)
      data: message,
      // json形式で処理
      dataType: 'json',
      // ありのままのデータを持って行って
      processData: false,
      contentType: false
      // ここまで行ったらコントローラの記述
    })
    // jsonでうまく受け取れたら
    .done(function(data){
      // htmlにbuildHTMLで処理したデータを代入（４行目へ)
      var html = buildHTML(data);
      // contents-main-rightクラスの中にhtmlの内容を追加
      $('.contents-main-right').append(html);
      // new_message id を初期状態へ戻す
      $('#new_message')[0].reset();
      // scrollBottomを発動 69行目へ
      scrollBottom();
    })
    // jsonファイルがうまく受け取れなかったら
    .fail(function(data){
      // かきアラートを表示する
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    // jsonで成功にせよ失敗にせよする処理
    .always(function(data){
      // contents-main-message-form__sendクラスのdisabledをfalseにする（ボタンをもう一度押せるようにする）
      $('.contents-main-message-form__send').prop('disabled', false)
    })
  })
  // scrollBottomが呼び出された時の処理
  function scrollBottom(){
    // targetにcontents-main-right-message__userクラスの末尾を代入
    var target = $('.contents-main-right-message__user').last();
    // positionに上記targetのtopの場所の位置に.contents-main-rightを足した分を取得？
    var position = target.offset().top + $('.contents-main-right').scrollTop();
    // .contents-main-rightクラスをスクロールさせる、スピードは３００で
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
        alert('自動更新に失敗しました。');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});