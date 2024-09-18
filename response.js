// Response 객체 만들기
/*
new Response();
new Response(body);
new Response(body, options);
*/

// Blob 타입의 body 로 Response 만들기
const myBlob = new Blob();
const myOptions = {
   status: 200,
   statusText: 'SuperSmashingGreate!',
};
const myResponse = new Response(myBlob, myOptions);
console.log('myResponse: ', myResponse);
/*
Response {
   body: (...),
   bodyUsed: false,
   headers: Headers {},
   ok: true,
   redirected: false,
   status: 200,
   statusText: "SuperSmashingGreate!",
   type: "default",
   url: "",
}
*/

// json() 메서드 예제
// const response = new Response({ name: 'sujin', age: 25 }); -> 이렇게는 왜 안되지?
const jsonResponse = Response.json({
   name: 'sujin',
   age: 25,
});
console.log('jsonResponse: ', jsonResponse);

/*
Response.json()은 내부적으로 Response 객체를 반환하지만, 
이 객체는 비동기적으로 데이터를 처리하기 때문에 
.json() 메서드를 사용해 그 안의 본문을 읽어야 한다.
jsonResponse.json()은 Promise를 반환하므로, 
.then() 또는 async/await을 사용하여 데이터를 처리할 수 있다.
*/
jsonResponse
   .json()
   .then(data => console.log('data: ', data));

Response.json({
   name: 'sujin',
   age: 25,
})
   .json()
   .then(data => console.log('data222: ', data));

// response 객체의 text() 메서드: 객체의 본문을 텍스트 형식으로 읽어오며, 비동기적으로 작동하고 프로미스를 반환
new Response('hi, guys') // 여기서 객체의 본문(body) === 'hi, guys'
   .text()
   .then(res => console.log('res: ', res));
