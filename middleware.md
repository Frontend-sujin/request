# 캐시딜의 middleware.tsx 코드 분석하며 궁금했던 점들...

<br />

## 1. middleware 의 인자 `request` 객체에 어떻게 쿠키값이 들어있지?

즉, 브라우저가 서버에 HTTP 요청할 때, 브라우저가 어떻게 먼저 쿠키값을 request 객체에 저장해놓고 있을 수 있는 거지?

-> 최초의 HTTP 요청할 때 서버가 브라우저에게 HTTP 응답에 cookie 값도 같이 포함시켜서 보내줌.
그걸 나중에 브라우저가 HTTP 요청 다시 할 때 보내주는 거임.

## 2. middleware 마지막 부분 (아래 코드) 필요한 이유?

```js
// response 그대로 리턴하는 경우 헤더를 못받음
const res = NextResponse.next({
   request: {
      headers: reqHeaders,
   },
});

response.cookies.getAll().forEach(cookie => {
   res.cookies.set(cookie);
});

return res;
```

```js
const reqHeaders = new Headers();
const response = NextResponse.next({
   request: {
      headers: reqHeaders,
   },
});

/* 
   앱 인증 로직
   ...
   (생략)
   ...
*/

// next() 호출하여 요청을 다음 처리 단계로 전달하면서, 특정 요청 헤더 포함시킴
const res = NextResponse.next({
   request: {
      headers: reqHeaders,
   },
});

// 기존의 응답 객체에서 모든 쿠키를 가져와 새로운 응답 객체(res)에 설정
response.cookies.getAll().forEach(cookie => {
   res.cookies.set(cookie);
});

return res;
```

<br />
<br />

# `middleware`

> 요청이 완료되기 전에 코드 실행을 허용하는 곳

서버에게 클라이언트의 `request`를 기반으로, `response` 객체 수정 가능

middleware 는 클라이언트(사용자)가 특정 URL 로 요청을 보낼 때마다 해당 요청을 middleware 가 통과하게 된다

```js
export function middleware(req) { // <- 이 request 매개변수 = 사용자의 요청
   ...
}
```

## `middleware` 에서 수행할 수 있는 작업들:

1. _인증 및 권한 검사_ : 사용자가 특정 페이지에 접근 권한 있는지 확인

2. _리다이렉션_ : 특정 조건에 따라 사용자를 다른 페이지로 리다이렉트

3. _응답 조작_ : request 를 가로채고 request header 나 cookie 를 수정하는 등의 작업 수행

<br />

# `NextResponse` API 기능

-  `redirect` : 다른 Url 로 요청 리디렉트

-  `rewrite` : 주어진 url 을 보여주며 response 를 다시 만듦?

<br />

## `request` 에 헤더 추가하는 이유

-> 나중에 app.tsx 에서 zustand 에 해당 값들 넣어주려고?!
