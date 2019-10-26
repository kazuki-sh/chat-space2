$(function(){
  
  var search_list = $('#user-search-result')

  function appendUser(user) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>
              `
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
               </div>
               `
    search_list.append(html);
  }

  function addMember(userId) {
    var html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  function addDeleteUser(name, id) {
    var html =  `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</a>
    </div>`;
    $(".js-add-user").append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword : input },
      dataType: 'json'
    })
    .done(function(users){
      search_list.empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました。")
    })
  });
  $(document).on('click', ".chat-group-user__btn--add",  function(){
    var userName = $(this).attr('data-user-name');
    var userId   = $(this).attr('data-user-id');
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
    .parent()
    .remove();
  })
});
