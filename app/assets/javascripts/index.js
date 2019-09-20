// htmlがロードされたら発動する １つ目
$(document).on('turbolinks:load', function(){
  //  それぞれの変数にタグ？を代入
  var inputForm = $('#user-search-field');
  var searchResult = $('#user-search-result');
  var selected_list = $('#chat-group-users');

  // buildHTMLが呼ばれた時の動きを記述。持ってきたuserはuserFromSearchFunctionとして扱う
    function buildHTML(userFromSearchFunction){
      // html変数にdivクラスの記述を代入
      var html = `
      <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${userFromSearchFunction.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userFromSearchFunction.id}" data-user-name="${userFromSearchFunction.name}">追加</div>
  </div>
      `
      // ５行目で指定したものの下にhtmlの記述を入れる
      searchResult.append(html);
    }

    // appendUserNameAddが呼ばれた時の動き、持ってきたuser_name,user_idはそれぞれname,idとして使う
    function appendUserNameAdd(name,id) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      // ６行目で指定したものの下にhtmlの記述を入れる
      selected_list.append(html)
    }
    
        // NoResultが呼ばれた時の動き、持ってきたものはmessageとして扱う
    function NoResult(message){
      let html = `
      <li>${message}</li>
      `
      // ５行目で指定したものの下にhtmlの記述を入れる
      searchResult.append(html);
    }

  // ４行目で指定したものがkeyupされた時にこれを動かす  ２つ目
  inputForm.on('keyup', function(e){
    // まずは初期化
    e.preventDefault();
    // targetにinputFormで指定したタグの値を代入
    let target = $(this).val(); 
    // searchを呼び出し
    search(target);
  });
  // searchが呼び出された時の動き
  function search(target){
    // ajaxを呼び出す
    $.ajax({
      // GETをリクエスト
      type: 'GET',
      // /usersのファイルを
      url: '/users',
      // dataからtarget（４５行目で指定した値）をkeywordにして持って行って
      data: {keyword: target},
      // json形式を呼び出す。
      dataType: 'json'
      // ここまでしたらコントローラの記述に移動
    })
    // うまく呼び出せた時は
    .done(function(user){
      // searchresultの中身は一旦からにして
      searchResult.empty(); 
      // jbuilderからもらったuserの数が0じゃない時は
      if (user.length !== 0) {
        // userの数だけこれを繰り返す
        user.forEach(function(user) { 
          // buildHTMLをuserのデータを引数にして呼び出す（９行目へ）
          buildHTML(user);
        });
        // userが0だった時は
      } else {
        // NoResultを下記文言を引数にして呼び出す。（３３行目へ）
        NoResult('該当するユーザーはいません');
      }
    })
    // jsonでデータがうまく呼び出せなかった時。
    .fail(function(user){
      // アラートで下記文言を表示
      alert('非同期通信に失敗しました');
    })
  }

// 追加ボタン
  // ５行目で指定したタグの中のuser-search-addクラスのボタンがクリックされた時に発動
  searchResult.on("click", `.user-search-add`, function () {
    // user_name変数にuser-search-addクラスのdata-user-nameの値を取得
    var user_name = $(this).data(`user-name`);
    // user_id変数にuser-search-addクラスのdata-user-idの値を取得
    var user_id = $(this).data(`user-id`);
    // appendUserNameAddをuser_nameとuser_idを引数にして呼び出し
    appendUserNameAdd(user_name, user_id);
    // user-search-addクラスを一つ上の親要素も含めて削除する
    $(this).parent().remove();
  });

// 削除ボタン
  //  ６行目で指定したタグの中のuser-search-removeクラスのボタンがクリックされた時に発動 
  selected_list.on("click", `.user-search-remove`, function() {
    // user-search-removeクラスの一つ上の親要素も含めて削除する
    $(this).parent().remove();
    });
});