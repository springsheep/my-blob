---
title: nginx 相关
date: 2021-12-30
tags:
 - nginx
categories:
 - nginx
---
<!--
 * @Descripttion: ----描述----
 * @version: 1.0
 * @Author: 张鹏
 * @Date: 2021-12-31 14:00:42
 * @LastEditors: 张鹏
 * @LastEditTime: 2022-01-09 15:16:01
-->
### 如何去判断nginx配置是否正确

配置玩完之后去nginx的sbin目录下 ./nginx -t

### 重启服务
./nginx -reload

### 如何配置代理
```js
server {
    listen       80;                                                         
    server_name  10.0.0.1;                                               
    client_max_body_size 1024M;

    location /my/ {
        proxy_pass http://my_server/;
        proxy_set_header Host $host:$server_port;
    }
}
```
