const myRequest = new Request(
   'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg',
);

/*
request 객체의 headers 프로퍼티
- type 은 객체 { }
- 클라이언트에서 서버로 HTTP 요청을 보낼 때 전송되는 다양한 메타데이터를 포함
*/
console.log(myRequest.headers);

// headers 프로퍼티에 헤더 추가하고 싶으면, `Headers.append` 사용하면 됨
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');

const myInit = {
   method: 'GET',
   headers: myHeaders,
   mode: 'cors',
   cache: 'default',
};

const myRequest2 = new Request('flowers.jpg', myInit);
const myContentType =
   myRequest2.headers.get('Content-Type'); // returns 'image/jpeg's
