$(function(){
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
    var image = '';
    if(message.image.url !== null) {
      image = `<img class="RightBody__image" src="${message.image.url}"></img>`
    } else {
      image = '';
    }
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
});