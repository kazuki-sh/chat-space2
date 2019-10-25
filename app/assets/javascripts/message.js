$(function(){

  var search_list = $('#user-search-result')

  function appendUser(user) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    console.log(html);
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


  function buildHTML(message){
    var html = `<div class="RightBody__first">
                  <div class="RightBody__title">
                    <div class="RightBody__name">
                    ${message.user_name}
                    </div>
                    <div class="RightBody__date">
                    ${message.time}
                    </div>
                  </div>
                  <div class="RightBody__text">
                    <p class="RightBody__content">
                    ${message.content}
                    </p>
                  </div>
                </div>`
    return html;
  }

  function buildIMG(message) {
    image = message.image.url !== null ? `<img class="RightBody__image" src="${message.image.url}"></img>` :  ''
    return image;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url:url,
      data: formData,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var image = buildIMG(data);
      $('.RightBody').append(html);
      $('.RightBody__first:last').append(image);
      $('form')[0].reset();
      $('.RightBody').animate({ scrollTop: $('.RightBody')[0].scrollHeight});
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('error');
    })
  });

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
});