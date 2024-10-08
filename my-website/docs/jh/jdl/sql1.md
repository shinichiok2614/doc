```js
entity Person{
    name String required
    avatar ImageBlob required //mở image của person id và chọn 1 tấm, k cần danh sách
    cover ImageBlob required //cũng thế
    bio TextBlob
    phone String maxlength(12) minlength(12) //0974-187-915
    country String
    address String
    createdAt Instant required
    updateAt Instant required
    dateOfBirth Instant
    isAuthor Boolean required
    //menu
    //about
    //danh sách follower
    //danh sách hình ảnh
    //danh sách followee
}
entity Department{ //admin mới được tạo
    name String required
    image ImageBlob
}
entity Category{ //admin mới được tạo
    name String required
}
enum Status{
    PENDING,
    APPROVED,
    CANCELLED
}
entity Post{
    name String required
    summary TextBlob required
    image ImageBlob required
    status Status required
    view Integer required
    remark TextBlob //nhận xét của admin
    createdAt Instant required
    updateAt Instant required
    approvedAt Instant
    modifiedAt Instant
}
entity Paragraph { //post
    image ImageBlob
    caption String
    content TextBlob
    contentType String
    createdAt Instant required
    updatedAt Instant required
}
entity Comment{ //post
    description TextBlob
    image ImageBlob
    createdAt Instant required
    updateAt Instant required
}
entity Message{
    content TextBlob
    image ImageBlob
    createdAt Instant required
}
entity Room {
    name String required // Có thể đặt tên cho room hoặc để trống nếu là chat riêng
    isPrivate Boolean required // Đánh dấu đây là room riêng
    createdAt Instant required
}
entity RoomMember { //hỗ trợ cả việc mời người dùng vào phòng chat nhóm.
    name String
    joinedAt Instant required
}
entity Follow {
    createdAt Instant required
}
relationship OneToOne{
    Person{user} to User{person} with builtInEntity
}
//quan hệ mỗi - một
relationship ManyToOne { //tất cả xử lý trên user, khi nào cần mới gọi person, person chỉ là tt thêm thôi
    Person{department(name)} to Department

    Post{post(login)} to User with builtInEntity
    Post{category(name)} to Category

    Paragraph{paragraph(name)} to Post

    Follow{follower(login)} to User with builtInEntity
    Follow{followee(login)} to User with builtInEntity

    Comment{comment(login)} to User with builtInEntity
    Comment{post(name)} to Post

    Room{author(login)} to User with builtInEntity

    RoomMember{roommember(login)} to User with builtInEntity
    RoomMember{room(name)} to Room

    Message{sender(name)} to RoomMember
    Message{message(name)} to Room
}

dto * with mapstruct
```
