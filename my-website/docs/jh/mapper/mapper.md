```js
    @Named("roomName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "isPrivate", source = "isPrivate")
    @Mapping(target = "createdAt", source = "createdAt")
    RoomDTO toDtoRoomName(Room room);
```
