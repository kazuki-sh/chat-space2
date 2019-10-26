json.content    @message.content
json.user_name  @message.user.name
json.time       @message.created_at.strftime("%Y/%m/%d %H:%M")
json.group_name @message.group.name
json.image      @message.image
json.id         @message.id