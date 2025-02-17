import { test, expect } from "@playwright/test";
let token: string;
test("api test login", async ({ request }) => {
  const response = await request.post("https://conduit-api.bondaracademy.com/api/users/login", {
    data: {
      user: { email: "test@testt.com", password: "123" },
    },
  });
  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  token = json.user.token;
  console.log(token);
  process.env['ACCESS_TOKEN'] = token 
});

test("create new article", async ({ page,request }) => {
    token??= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMDIyN30sImlhdCI6MTczOTI4MDYwMiwiZXhwIjoxNzQ0NDY0NjAyfQ.8eaDPAec1BK_2Q0mZLZy1CoQVYRD6hKOt5sISLGhzh8';
    
       
  const response = await request.post("https://conduit-api.bondaracademy.com/api/articles/", {
    headers: {
        Authorization: `Token ${token}`        
    },
    data: {
      article: {
        title: "www",
        description: "ww",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
        tagList: [],
      },
    },
  });
  console.log('Request headers:', response.headers());
  const json = await response.json();
  console.log('Response body: '+ json);
  expect(response.ok()).toBeTruthy();
});
