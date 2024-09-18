# `NextRequest`

## `cookies`

`request` 객체의 `Set-Cookie` 헤더를 확장시킨 것

## `cookies` 가 갖는 메서드들

### `set(name, value)`

`request` 객체에 주어진 이름/값으로 쿠키 설정

```js
// request /home 옴
// request will have a `Set-Cookie:show-banner=false;path=/home` header
request.cookies.set('show-banner', 'false');
```

### `get(name)`

주어진 이름으로 쿠키의 값 반환

해당 이름을 가진 쿠키 없으면 `undefined` 반환

```js
// request: { name: 'show-banner', value: 'false', Path: '/home' }
request.cookies.get('show-banner');
```

### `clear()`

`request` 객체의 `Set-Cookie` 헤더 제거

```js
request.cookies.clear();
```

<br />

# `NextResponse`

> Web Response API 에 추가적인 편의 메서드들로 확장시킨 것

`NextResponse` API 는 다음 리스트들을 가능하게 해준다

## 1. `request`를 다른 url 로 `redirect` 해줌

`NextResponse.redirect()` 메서드 사용하여 유저를 하나의 url 에서 다른 url 로 리다이렉트할 수 있다

```js
export function middleware(req) {
   if (req.nextUrl.pathname === '/old-path') {
      return NextResponse.redirect('/new-path');
   }
}
```

## 2. `response`를 다른 url 로 `rewrite`(재작성) 해줌

리다이렉트 대신, `response`를 재작성하여 다른 url 의 내용을 보여줄 수 있다

```js
export function middleware(req) {
   if (req.nextUrl.pathname === '/proxy') {
      return NextResponse.rewrite(
         new URL('/api/data', req.url),
      );
   }
}
```

## 3. API Routes, `getServerSideProps`, 그리고 `rewrite` 목적지에 대한 `request` 헤더를 설정

```js
export function middleware(req) {
   req.headers.set('service-code', 'cashwalk');
   return NextResponse.next();
}
```

```js
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   // request 헤더들을 클론해온 뒤, 새로운 헤더 'app-service-code' 를 세팅
   const requestHeaders = new Headers(request.headers);
   requestHeaders.set('app-service-code', 'unpa');

   const response = NextResponse.next({
      request: {
         // 새로운 request 헤더
         headers: requestHeaders,
      },
   });

   return response;
}
```

## 4. `response` 쿠키 설정

```js
export function middleware(req) {
   const res = NextResponse.next(); // 다음 단계로 요청을 전달하는 response 객체 생성

   // response 쿠키 설정
   res.cookies.set('myCookie', 'value', { httpOnly: true });
   return res; // 수정된 response 객체 반환
}
```

> 이때 쿠키는 `request`에서는 Cookie 헤더에 저장, `response` 에서는 Set-Cookie 헤더에 저장된다

## 5. `response` 헤더 설정

```js
export function middleware(req) {
   const res = NextResponse.next(); // 다음 단계로 요청을 전달하는 response 객체 생성

   // response 헤더 설정
   res.headers.set('myHeader', 'value');
   return res; // 수정된 response 객체 반환
}
```

<br />

## `NextResponse` 가 갖는 편의 메서드들

### `next()`

early return 으로 라우팅을 허용해주어, middleware 에서 유용하게 사용되는 메서드

> 현재 요청을 처리하는 middleware 에서 **아무런 변경 없이** 요청을 다음 단계로 **넘기는** 역할

미들웨어가 특별히 응답을 종료하지 않고, 요청을 계속 다음 단계로 넘길 때 사용된다.

(\*\*다음 단계로 넘긴다는 게 어떤 뜻?)
-> 다음 미들웨어나 페이지 등 그 요청이 다음 처리 단계로 계속 전달된다는 뜻

```js
import { NextResponse } from 'next/server';

return NextResponse.next();
```

또한, response 생성 시 새로운 `headers` 를 전달할 수도 있다

```js
import { NextResponse } from 'next/server';

// 'x-version' 이라는 새로운 헤더 만듦
const newHeaders = new Headers(request.headers); // Headers : HTTP 헤더를 조작할 수 있게 해주는 브라우저 API
newHeaders.set('x-version', '123');

// 새로운 헤더로 기존 요청의 헤더 수정 후 다음 미들웨어나 페이지로 전달
return NextResponse.next({
   request: {
      // New request headers
      headers: newHeaders,
   },
});
```
