Nếu đường dẫn mà bạn cung cấp là đường dẫn tuyệt đối (bắt đầu bằng /), thì

```
navigate(/category/${category.id})
```

sẽ chuyển hướng người dùng đến một URL tuyệt đối bắt đầu từ gốc của ứng dụng. Ví dụ, nếu category.id là 5, thì người dùng sẽ được chuyển hướng đến http://your-domain.com/category/5.

Nếu đường dẫn mà bạn cung cấp là đường dẫn tương đối (không bắt đầu bằng /), thì React Router sẽ kết hợp nó với đường dẫn hiện tại. Ví dụ, nếu bạn đang ở http://your-domain.com/blog và bạn sử dụng

```
navigate(category/${category.id})
```

, thì URL mới sẽ là http://your-domain.com/blog/category/5.
