$(function(){

  var buildHTML = function (message){
    if(message.content && message.image.url) {
      var html = `<div class="RightBody__first" data-id="${message.id}">
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
                      <img class="RightBody__image" src="${message.image.url}"></img>
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="RightBody__first" data-id="${message.id}">
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
    } else if (message.image.url) {
      var html = `<div class="RightBody__first" data-id="${message.id}">
                    <div class="RightBody__title">
                      <div class="RightBody__name">
                      ${message.user_name}
                      </div>
                      <div class="RightBody__date">
                      ${message.time}
                      </div>
                    </div>
                    <div class="RightBody__text">
                      <img class="RightBody__image" src="${message.image.url}"></img>
                    </div>
                  </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    var last_message_id = $('.RightBody__first:last').data('id');
    var api_url = '/api/messages';
    
    $.ajax({
      url: first_url + group_id + api_url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.RightBody').append(insertHTML);
        var target = $('.RightBody__first:last');
        var position = target.offset().top + $('.RightBody').scrollTop();
        $('.RightBody').animate({scrollTop: position});
        })
      })
    .fail(function(){
      console.log('error');
    });
  };

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
      $('.RightBody').append(html);
      $('form')[0].reset();
      $('.RightBody').animate({ scrollTop: $('.RightBody')[0].scrollHeight});
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      window.alert('error');
    })
  });

  var current_url = location.href;
  var group_id = $('.RightBody').data('group-id');
  var http = 'http://localhost:3000';
  var first_url = '/groups/';
  var second_url = '/messages' 
  var  message_list_url = http + first_url + group_id + second_url;
  if(current_url == message_list_url) {
    setInterval(reloadMessages, 5000);
  } 
});