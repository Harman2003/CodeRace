export default async function actionHandler(action, data, submit) {
  if (action === "upvote") {
    console.log("hola2", data.username);
    await submit("api/post/upvote", {
      body: {
        ...data,
      },
      query: {
        params: { username: data.username, action: "upvote" },
      },
    });
  } else if (action === "save") {
    console.log(data.username);
    await submit("api/post/save", {
      body: {
        ...data,
      },
      query: {
        params: { username: data.username, action: "save" },
      },
    });
  } else {
    await submit("api/post/share", {
      body: {
        ...data,
      },
      query: {
        params: {
          username: data.username,
          action: "share",
        },
      },
    });
  }
}
