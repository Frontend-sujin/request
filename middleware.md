# 캐시딜의 middleware.tsx 코드 분석하며 궁금했던 점들...

<br />

## middleware 의 인자 `request` 객체에 어떻게 쿠키값이 들어있지?

즉, 브라우저가 서버에 HTTP 요청할 때, 브라우저가 어떻게 먼저 쿠키값을 request 객체에 저장해놓고 있을 수 있는 거지?

-> 최초의 HTTP 요청할 때 서버가 브라우저에게 HTTP 응답에 cookie 값도 같이 포함시켜서 보내줌.
그걸 나중에 브라우저가 HTTP 요청 다시 할 때 보내주는 거임.

<br />

# `middleware`

-  요청이 완료되기 전에 코드 실행을 허용하는 곳
-  '클라->서버'로 간 `request`를 기반으로, `response` 객체 수정 가능
   -  `request`, `response` 헤더 수정 등

<br />

# `NextResponse` API 기능

-  `redirect` : 다른 Url 로 요청 리디렉트

-  `rewrite` : 주어진 url 을 보여주며 response 를 다시 만듦?

<br />

## `request` 에 헤더 추가하는 이유

-> 나중에 app.tsx 에서 zustand 에 해당 값들 넣어주려고?!
