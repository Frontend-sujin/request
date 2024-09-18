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

Web Response API 에 추가적인 편의 메서드들로 확장시킨 것

## `NextResponse` 가 갖는 편의 메서드들

### `next()`

early return 으로 라우팅을 허용해주어, middleware 에서 유용하게 사용되는 메서드

> 현재 요청을 처리하는 middleware 에서 **아무런 변경 없이** 요청을 다음 단계로 **넘기는** 역할

미들웨어가 특별히 응답을 종료하지 않고, 요청을 계속 다음 단계로 넘길 때 사용된다.

(\*\*다음 단계로 넘긴다는 게 어떤 뜻?)
-> 다음 미들웨어나 페이지 등 그 요청이 다음 처리 단계로 계속 전달된다는 뜻
->

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
