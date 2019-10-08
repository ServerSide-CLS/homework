- # 实验一、分析HTTP请求和响应数据

  > 计算机 174 胡思源 2017212212170

  **打开淘宝和京东主页，分别在搜索关键字输入 `耳机`，点击搜索按钮，分析浏览器发送给服务器的请求内容和响应结果，完成下面的报告。**

  

  ------

  ## 分析搜索逻辑是由哪个服务链接或者页面完成，如果有多个请分别列出，并且将发送到服务器的数据以列表方式进行说明

  

  ### 京东

  搜索流程可以分为三个阶段：

  #### 一、输入关键词后，会发送请求，弹出相关推荐（https://dd-search.jd.com/）

  ##### req

  ```yaml
  Request URL: https://dd-search.jd.com/?terminal=pc&newjson=1&ver=2&zip=1&key=%E8%80%B3%E6%9C%BA&pvid=c62b23ae44344ed695152bb4565d8583&t=1568041651463&curr_url=www.jd.com%2F&callback=jQuery4219686
  Request Method: GET
  Status Code: 200 OK
  Remote Address: 106.39.167.238:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  `GET` 方法，采用查询字符串，列表如下

  | key      | 说明                                                         | value                            |
  | -------- | ------------------------------------------------------------ | -------------------------------- |
  | terminal | 标识pc端或移动端？                                           | pc                               |
  | newjson  |                                                              | 1                                |
  | ver      | 版本号                                                       | 2                                |
  | zip      | 和压缩有关？                                                 | 1                                |
  | key      | [URL编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)（这里是utf-8 + %） | %E8%80%B3%E6%9C%BA（耳机）       |
  | pvid     | 未知                                                         | c62b23ae44344ed695152bb4565d8583 |
  | t        | 未知                                                         | 1568041651463                    |
  | curr_url | 当前url                                                      | www.jd.com                       |
  | callback | 返回的函数调用                                               | jQuery4219686                    |

  

  #### 二、点击搜索按钮后（https://search.jd.com/Search）

  ##### req

  ```yaml
  Request URL: https://search.jd.com/Search?keyword=%E8%80%B3%E6%9C%BA&enc=utf-8&pvid=83336f08d6cc49f48e8d3f70509cff77
  Request Method: GET
  Status Code: 200 
  Remote Address: 106.39.166.77:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  列表如下

  | key     | 说明         | Value                            |
  | ------- | ------------ | -------------------------------- |
  | keyword | URL编码      | %E8%80%B3%E6%9C%BA（耳机）       |
  | enc     | 指定编码方式 | utf-8                            |
  | pvid    | 未知         | 83336f08d6cc49f48e8d3f70509cff77 |

  

  并且通过Ajax来请求**分类信息**（https://blackhole.m.jd.com/getinfo）

  ![image.png](https://i.loli.net/2019/10/09/Ok2yVKPYzFeNA3Z.png)

  ```
  Request URL: https://blackhole.m.jd.com/getinfo
  Request Method: POST
  Status Code: 200 OK
  Remote Address: 36.110.181.181:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  | key         | 说明         | Value                                                        |
  | ----------- | ------------ | ------------------------------------------------------------ |
  | **body**    | json         | {"appname":"jdwebm_pv","jdkey":"","whwswswws":"o8iWqoU00t3... |
  | **qrst**    |              |                                                              |
  | rt**        | 未知         |                                                              |
  | **stop**    | 未知         |                                                              |
  | **vt**      | 未知         |                                                              |
  | **suggest** | URL编码      | %E8%80%B3%E6%9C%BA（耳机）                                   |
  | **wq**      | 关键字       | “耳机”                                                       |
  | **ev**      | URL编码      | %E8%80%B3%E6%9C%BA（耳机）                                   |
  | **uc**      | URL编码      | %E8%80%B3%E6%9C%BA（耳机）                                   |
  | keyword     | URL编码      | %E8%80%B3%E6%9C%BA（耳机）                                   |
  | enc         | 指定编码方式 | utf-8                                                        |
  | pvid        | 未知         | 83336f08d6cc49f48e8d3f70509cff77                             |

  

  

  ### 淘宝

  #### 一、关键词提供搜索建议，和 jd 类似（https://suggest.taobao.com/sug）

  ##### req

  ```yaml
  Request URL: https://suggest.taobao.com/sug?code=utf-8&q=%E8%80%B3%E6%9C%BA&_ksTS=1568044256352_726&callback=jsonp727&area=ssrch&k=1
  Request Method: GET
  Status Code: 200 
  Remote Address: 106.11.14.99:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  列表如下

  | key      | 说明             | value                      |
  | -------- | ---------------- | -------------------------- |
  | code     | 编码方式         | utf-8                      |
  | q        | 关键词           | %E8%80%B3%E6%9C%BA（耳机） |
  | _ksTS_   | 某个时间戳？     | 1568044256352_726          |
  | callback | JSONP,返回的方法 | jsonp727                   |
  | area     | 未知             | ssrch                      |
  | k        | 未知             | 1                          |

  

  #### 二、判断是否登录，如果该游览器从未登陆过，则重定向到登录页（https://login.taobao.com/member/login.jhtml）

  ##### req

  ```yaml
  Request URL: https://login.taobao.com/member/login.jhtml?redirectURL=http%3A%2F%2Fs.taobao.com%2Fsearch%3Fq%3D%25E8%2580%25B3%25E6%259C%25BA%26imgfile%3D%26commend%3Dall%26ssid%3Ds5-e%26search_type%3Ditem%26sourceId%3Dtb.index%26spm%3Da21bo.2017.201856-taobao-item.1%26ie%3Dutf8%26initiative_id%3Dtbindexz_20170306
  Request Method: GET
  Status Code: 200 
  Remote Address: 203.119.175.212:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  参数：`redirectURL` 即登录页

  

  #### 三、正式进入搜索页（https://s.taobao.com/search）

  ##### req

  ```yaml
  Request URL: https://s.taobao.com/search?q=%E8%80%B3%E6%9C%BA&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306
  Request Method: GET
  Status Code: 302 
  Remote Address: 106.11.94.18:443
  Referrer Policy: no-referrer-when-downgrade
  ```

  | param         | 说明                                                         | value                           |
  | ------------- | ------------------------------------------------------------ | ------------------------------- |
  | q             | 搜索关键字                                                   | 耳机                            |
  | imgfile       | 支持图片搜索                                                 |                                 |
  | commend       | 未知                                                         | all                             |
  | ssid          | 未知                                                         | s5-e                            |
  | search_type   | 搜索类型（商品/店铺）                                        | item                            |
  | sourceId      | 来源id（表示从主页跳转）                                     | tb.index                        |
  | spm           | [导购效果追踪](https://open.taobao.com/doc.htm?docId=959&docType=1) | a21bo.2017.201856-taobao-item.1 |
  | ie            | 指定ie游览器编码                                             | utf8                            |
  | initiative_id |                                                              | tbindexz_20170306               |

  

  ------

  ## 分析服务器的响应结果，数据的格式、数据的类型以及呈现方式

  

  ### 京东

  #### 一、输入关键词后，会发送请求，弹出相关推荐

  ##### res

  `JSONP`方式，返回 `jQuery4219686` 函数调用

  ```json
  jQuery4219686([{
  	"key": "耳机蓝牙",
  	"qre": "625584"
  }, {
  	"key": "耳机 plus尊享",
  	"qre": "8920"
  }
   ...              
  , {
  	"version": "V06--12s0,20s0,38s0"
  }])
  ```

  

  #### 二、点击搜索按钮后

  ##### res

  返回一个 `HTML` 文件，即搜索结果页面

  

  

  ### 淘宝

  #### 一、关键词提供搜索建议，和 jd 类似

  ##### res

  `JSONP`方式，返回`jsonp727函数调用`

  ```JSON
  jsonp727{
      "result": [
          [
              "耳机专卖", 
              "1000"
          ], 
          [
              "耳机批发", 
              "1000"
          ], 
          ...
      ]
  }
  ```

  ​	

  #### 二、判断是否登录，如果该游览器从未登陆过，则重定向到登录页

  ##### res

  登录页的 `HTML`

  

  #### 三、正式进入搜索页

  ##### res

  返回搜索页的 `HTML`

  

  

  ------

  ## 对比淘宝和京东搜索功能的数据结构，请说明它们的区别和特点

  ### 特点

  - 都提供了搜索建议功能。每次修改 `input` 输入框内容后，发送请求，返回的的是一个 `JSONP`函数调用，可以很方便地将其中的数据通过某个函数（比如 `jQuery` 的 `append()` ）添加到输入框的下面，提高用户搜索的效率和体验。
  - 搜索功能均采用 `GET` 方法，使用查询字符串和 `cookie` 传参。
  - 点击搜索后，均返回 `HTML` 搜索结果页。整个搜索过程中，第一个请求一定是是静态 `HTML` 页面，保证首屏加载快。然后逐渐请求其他资源，例如css，js，字体文件和一些商品图片。

  

  ### 区别

  京东使用了Ajax来部分更新页面，淘宝则不包含XHR请求。

  

  如果涉及图片搜索，淘宝采用和文字搜索相同的url，但是填写其中的 `imgfile` 。

  而京东则使用另一个专门用户图片搜索的url，如下

  - https://search.jd.com/image   搜索图片
  - https://search.jd.com/Search  搜索关键字