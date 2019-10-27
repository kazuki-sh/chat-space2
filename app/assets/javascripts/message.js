$(function(){

  var buildHTML = function (message){
    if(message.content && message.image.url) {
      var html = `<div class="RightBody__first" data-message= "${message.id}">
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
      var html = `<div class="RightBody__first" data-message= "${message.id}">
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
      var html = `<div class="RightBody__first" data-message= "${message.id}">
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
      alert('error');
    })

    var reloadMessage = function() {
      last_message_id = $('RightBody__content').data('message')
      $.ajax({
        url: '/groups/:group_id/api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function(){
        console.log('error');
      });
    };
  });
});