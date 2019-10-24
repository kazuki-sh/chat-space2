$(function(){
  function buildHTML(message){
    var html = `<div class="RightBody__first">
                  <div class="RightBody__title">
                    <div class="RightBody__name">
                      
                    </div>
                    <div class="RightBody__date">
                      2019/10/24 00:15
                    </div>
                  </div>
                  <div class="RightBody__text">
                    <p class="RightBody__content">
                    aaa
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
    })
    .fail(function(){

    })
  });
});