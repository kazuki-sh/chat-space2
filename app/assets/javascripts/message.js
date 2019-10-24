$(function(){
  function buildHTML(message){
    var html = `<div class="RightBody__first">
                  <div class="RightBody__title">
                    <div class="RightBody__name">
                    ${message.group_name}
                    </div>
                    <div class="RightBody__date">
                    ${message.created_at}
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
      $('#message_content').val('');
      $('.RightBody').animate({ scrollTop: $('.RightBody')[0].scrollHeight});
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('error');
    })
  });
});