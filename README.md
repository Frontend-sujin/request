# request

```js
const myRequest = new Request(
   'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg',
);
```

## request.header

> request 객체의 header property

-  클라이언트에서 서버로 HTTP 요청을 보낼 때 전송되는 다양한 메타데이터를 포함
-  요청의 본문, 형식, 권한, 사용자 정보 등을 포함한 추가 정보를 서버에게 제공하여 요청 처리에 중요한 역할을 함

주로 다음과 같은 정보를 포함한다:

**1. 클라이언트 정보**

-  `User-Agent`: 요청을 보낸 클라이언트의 브라우저나 앱의 정보.
-  `Accept`: 클라이언트가 수락할 수 있는 콘텐츠 유형 (예: `text/html`, `application/json`).

**2. 인증 및 권한**

-  `Authorization`: 인증에 사용되는 토큰이나 자격증명 (예: `Bearer <token>`).

**3. 캐싱 정보**

-  `Cache-Control`: 캐싱 관련 지시사항 (예: `no-cache`).
-  `If-Modified-Since`: 클라이언트가 마지막으로 요청한 리소스의 변경 시간을 서버와 비교.

**4. 콘텐츠 형식**

-  `Content-Type`: 요청 본문이 포함될 때 그 내용의 MIME 타입 (예: `application/json`, `multipart/form-data`).

**5. 쿠키**

-  `Cookie`: 클라이언트에서 서버로 전송되는 쿠키 정보.

## request.body

> 요청에 추가된 본문 내용

-  메서드가 `GET` 또는 `HEAD` 일 경우 request 객체는 body 를 가질 수 없다! 🌟

```js
const request = new Request('/myEndpoint', {
   method: 'POST',
   body: 'Hello world',
});

request.body; // ReadableStream
```

<br />

# response

```js
new Reponse();
new Response(body);
new Response(body, options);
```

-  `body` 의 타입

   -  null

   -  Blob

   -  FormData

   -  URLSearchParams

   -  String

## response.header

### Set-Cookie

> HTTP 응답 헤더 중 하나로, 서버가 클라이언트에 쿠키를 설정할 때 사용된다.

> 💡 쿠키 : 서버가 클라이언트의 브라우저에 저장하는 작은 데이터 조각으로, 이후 요청 시 클라이언트가 해당 쿠키를 서버로 전송하여 상태를 유지하거나 특정 정보를 전달하는 데 사용된다. 예를 들어, 로그인 상태를 유지하거나 사용자 환경을 맞춤화할 때 쿠키를 활용한다.

<br />

## response 가 갖는 편의 메서드들

### `Response.json()`

> `Response` 객체를 생성하면서, 본문(`body`)에 JSON 데이터를 포함하는 방식

-  `Response` 객체의 본문(`body`)을 **JSON으로 파싱**하는 역할
-  **Promise를 반환**함
   => 본문을 읽고, JSON으로 변환하는 비동기 작업 수행

-  예

```js
const jsonResponse = Response.json({
   name: 'sujin',
   age: 25,
});
```

위 코드는 다음 코드와 동일하다.

```js
const jsonResponse = new Response(
   JSON.stringify({ name: 'sujin', age: 25 }),
   { headers: { 'Content-Type': 'application/json' } },
);
```

<br />

> 💡 `.json()`으로 반환된 `Response` 객체는 비동기적으로 처리되어야 하므로, <br />
> 위 예제에서의 `jsonResponse` 의 `body` 값을 바로 확인할 수 없다.

`body` 를 확인하기 위해서는 해당 `Response` 객체에서 `.json()` 메서드를 호출하여 `body`를 비동기적으로 읽어야 한다.

-  예

```js
const jsonResponse = Response.json({
   name: 'sujin',
   age: 25,
});

// jsonResponse.json() 은 Promise 를 반환한다
jsonResponse.json().then(data => {
   console.log('jsonRepsonse body: ', data);
});

const data = await jsonResponse.json();
console.log('jsonRepsonse body: ', data);
```

<br />

### `Response.text()`

> `Response` 객체의 본문을 텍스트 형식으로 읽어오며, 비동기적으로 작동하고 프로미스를 반환

-  예

```js
fetch('test.txt')
   .then(response => response.text())
   .then(text => console.log('text: ', text));
```

<br />

# HTTP Cookie

> 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각

브라우저는 쿠키를 저장해 놓았다가, 동일한 서버에 재 요청 시 저장된 쿠키를 함께 전송한다.

쿠키는 \*두 요청이 동일한 브라우저에서 들어왔는지 아닌지 판단할 때\* 주로 사용된다

HTTP 프로토콜은 기본적으로 *Stateless한 속성*을 가지고 있기 때문에,

**서버와 클라이언트 간의 연결 유지 구현**하기 위해서,

서로를 인식할 수 있는 **식별 데이터**가 필요해졌고, 이 식별 데이터가 **쿠키**다.

<br />

## 쿠키 설정 방법: `Set-Cookie` HTTP 응답 헤더

> 서버로부터 사용자 에이전트로 전송할 때 쿠키를 설정해주는 헤더

```shell
Set-Cookie: <cookie-name>=<cookie-value>
```

-  클라이언트에게 쿠키 저장하라고 전달하는 서버 헤더 예:

```shell
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

## 쿠키의 보안적인 한계점

정보가 클라이언트 측에서 관리되므로 보안에 취약하여 정보가 탈취당하거나 악용될 위험성이 존재한다.

=> 쿠키에는 최소한의 정보에만 사용돼야 한다.

`Secure 쿠키`는 `HTTPS` 프로토콜 상에서 암호화된 요청일 경우에만 전송된다.

XSS 공격 방지 위해, `HttpOnly` 쿠키는 javascript의 `document.cookie` API 에 접근할 수 없다.

> \*XSS 공격: 클라이언트 사이드 코드에 악성 코드를 주입시키는 공격 방법.

<br />

## HTTP Cookie 파라미터 (옵션)

**1.`NAME=VALUE` : 쿠키에 부여된 이름과 값 (필수)**

**2. `Expires=DATE`와 `max-age` : 쿠키 유효 기간**

`expires (유효 일자)`나 `max-age(만료 기간)` 옵션이 지정되어 있지 않으면,

브라우저가 닫힐 때 쿠키도 함께 삭제된다 (= 세션 쿠키).

-  `max-age`: 현재부터 설정하고자 하는 만료일시까지의 시간을 초로 환산한 값으로, 0이나 음수값을 설정하면 쿠키는 바로 삭제된다.

```js
// 1시간 뒤에 쿠키가 삭제된다
document.cookie = 'user=sujin; max-age=3600';

// 만료 기간을 0으로 지정하여 쿠키를 바로 삭제한다
document.cookie = 'user=sujin; max-age=0';
```

```js
// nextResponse 의 cookies 사용할 경우
res.cookies.set({
   name: 'app-service-code',
   value: 'cashwalk',
   httpOnly: true,
   secure: processEnvApp !== 'local-web',
   maxAge: 365 * 24 * 60 * 60,
});
```

**3. `Path=PATH` : 쿠키에 접근 가능한 디렉토리로, *절대 경로*여야 함**

-  이 경로나 이 경로의 하위 경로에 있는 페이지만 쿠키에 접근할 수 있다.

-  특별한 경우가 아니라면, `path` 옵션을 `path=/` 와 같이 루트로 설정해 모든 페이지에서 쿠키에 접근할 수 있도록 한다.

**4. `Domain=도메인명` : 쿠키에 접근 가능한 도메인 명**

쿠키는 관련 페이지에서만 볼 수 있도록 하여 안정성을 높이기 위해

domain 옵션에는 아무 도메인이나 지정할 수 없다.

**서브 도메인이나 다른 도메인에서 쿠키에 접속할 수 없다**

즉, **`site.com`에서 생성한 쿠키를 `other.com`에선 전송받을 수 없다**

```js
// site.com 에서 쿠키를 설정함
document.cookie = 'user=sujin';

// site.com 의 서브 도메인인 forum.site.com에서 user 쿠키에 접근하려 함
alert(document.cookie); // 찾을 수 없음
```

서브 도메인에서 쿠키를 얻을 방법은 다음과 같다.

```js
// site.com 에서 domain 설정을 다음과 같이 해주면
// 서브 도메인(*.site.com) 어디서든 쿠키에 접속하도록 설정해줄 수 있다
document.cookie = 'user=sujin; domain=site.com';

// forum.site.com (서브도메인) 에서도 쿠키 정보 얻을 수 있다
alert(document.cookie); /// user=sujin 쿠키 확인 가능
```

**5. `Secure` : HTTPS로 통신하는 경우에만 쿠키를 전송**

쿠키는 기본적으로 *도메인만 확인하지, 프로토콜을 따지진 않기 때문*에,

`secure` 옵션이 없으면 _`http://site.com` 에서 생성한 쿠키를 `https://site.com`에서 읽을 수 있다_.

```js
// (https:// 로 통신하고 있는 경우)
// 설정한 쿠키는 HTTPS 통신시에만 접근 가능
document.cookie = 'user=sujin; secure';
```

**6. `SameSite` : 크로스 사이트(Cross-site)로 전송하는 요청의 경우 서드 파티 쿠키의 전송에 제한**

-  크로스 사이트 요청 위조(XSRF) 공격을 막기 위해 만들어진 옵션

사이트 외부에서 요청을 보낼 때 브라우저가 쿠키를 보내는 걸 막아준다

```
samesite = strict (값을 설정하지 않고 그냥 samesite 옵션만 써줘도 동일하게 동작함)
```

단, `samesite` 는 구식 브라우저(2017년 이전 버전) 에선 지원하지 않는 옵션이다

<br />

**7. `httpOnly` : 쿠키를 자바스크립트에서 액세스 하지 못하도록 제한**

> 자바스크립트 같은 클라이언트 측 스크립트가 쿠키 사용할 수 없게 함

`document.cookie` 를 통해 쿠키를 볼 수도, 조작할 수도 없다

-> 해커가 `document.cookie`로 쿠키 정보를 읽을 수 없도록 하여 쿠키 보호
