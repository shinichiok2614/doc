Nếu bạn muốn tắt hoàn toàn việc đồng bộ hóa các thao tác người dùng này (tức là tắt ghostMode), bạn cần bỏ dấu bình luận và cấu hình như sau:

javascript
```js
ghostMode: { 
  clicks: false,
  location: false,
  forms: false,
  scroll: false
}
```
Khi cấu hình này được áp dụng, ghostMode sẽ bị vô hiệu hóa, và BrowserSync sẽ không đồng bộ hóa các thao tác người dùng giữa các trình duyệt khác nhau, đồng thời reload: false sẽ đảm bảo rằng trang sẽ không được reload khi có thay đổi trong mã nguồn.