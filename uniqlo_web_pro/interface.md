## 接口文档

#### 用户注册：
* url  : "../php/register.php"
* 参数 : 
```javascript
      {
          username ,
          password
      }
```
* 返回结果 : 
```javascript
      {
      	state : success| error,
      	stateCode : 0|1|2|3
      }
```
> stateCode : 
>
> 0 : 数据库连接失败；
>
> 1：成功注册；
>
> 2：用户名已存在；
>
> 3：注册失败


#### 用户登录：
* url  : "../php/login.php"
* 参数 : 
```javascript
      {
          username ,
          password
      }
```
* 返回结果 : 
```javascript
      {
      	state : success| error |remove,
      	stateCode : 0|1|2|3|4|5
      }
```
> stateCode : 
>
> 0 : 缺少参数；
>
> 1：成功登录；
>
> 2：数据库连接失败；
>
> 3：用户名不存在
>
> 4：密码错误
>
> 5：退出登录成功