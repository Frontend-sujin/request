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
