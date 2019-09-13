$(document).on('turbolinks:load', function(){
  var inputForm = $('#user-search-field');
  var searchResult = $('#user-search-result');
  var selected_list = $('#chat-group-users');

    function buildHTML(userFromSearchFunction){
      var html = `
      <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${userFromSearchFunction.name}</p>
  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userFromSearchFunction.id}" data-user-name="${userFromSearchFunction.name}">追加</div>
  </div>
      `
      searchResult.append(html);
    }

    function appendUserNameAdd(name,id) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      selected_list.append(html)
    }
  
    function NoResult(message){
      let html = `
      <li>${message}</li>
      `
      searchResult.append(html);
    }

  inputForm.on('keyup', function(e){
    e.preventDefault();
    let target = $(this).val(); 
    search(target);
  });
  function search(target){
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: target},
      dataType: 'json'
    })

    .done(function(user){
      searchResult.empty(); 
      if (user.length !== 0) {
        user.forEach(function(user) { 
          buildHTML(user);
        });
      } else {
        NoResult('該当するユーザーはいません');
      }
    })
    .fail(function(user){
      alert('非同期通信に失敗しました');
    })
  }

// 追加ボタン
  searchResult.on("click", `.user-search-add`, function () {
    var user_name = $(this).data(`user-name`);
    var user_id = $(this).data(`user-id`);
    appendUserNameAdd(user_name, user_id);
    $(this).parent().remove();
  });

// 削除ボタン
  $(document).on("click", `.chat-group-user`, function() {
    (this).remove();
    });
});