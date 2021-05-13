import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* fetchPostsSaga() {
  yield put(actions.loadingFetchPosts(true));
  const token = yield localStorage.getItem("token");
  const userId = yield parseInt(localStorage.getItem("userId"));
  const following = yield localStorage.getItem("following");
  const array = yield following !== null ? following.split(",") : [];
  let query = yield "";
  yield array.forEach((user) => {
    query += `&userId=${user}`;
  });
  const url = `http://localhost:4000/api/posts?_embed=comments&_sort=id&_order=desc&userId=${userId}${query}`;
  try {
    const response = yield fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchPosts(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchProfileSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingFetchPosts(true));
  try {
    const response = yield fetch(
      `http://localhost:4000/api/posts?_embed=comments&_sort=id&_order=desc&userId=${action.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchProfile(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchNewsSaga() {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingFetchPosts(true));
  try {
    const response = yield fetch(
      "http://localhost:4000/api/posts?_embed=comments&_sort=id&_order=desc",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchNews(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* sendNewPostSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingSendPost(true));
  try {
    const response = yield fetch("http://localhost:4000/api/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(action.data), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingSendPost(false));
    yield put(actions.successSendNewPost(res, action.postType));
  } catch (error) {
    yield put(actions.failFetchPosts(error));
  }
}

export function* addCommentSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingSendComment(true));
  try {
    const response = yield fetch(`http://localhost:4000/api/comments/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(action.comment), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingSendComment(false));
    yield put(actions.successAddComment(action.data, res, action.postType));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchUsersSaga() {
  const token = yield localStorage.getItem("token");
  const userId = yield parseInt(localStorage.getItem("userId"));
  try {
    const response = yield fetch("http://localhost:4000/api/usersInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = yield response.json();
    const [user] = res.users.filter((user) => user.id === userId);
    yield localStorage.setItem("following", user.following);
    yield put(actions.successFetchUsers(res.users));
  } catch (error) {
    yield console.log(error);
    // yield put(actions.failFetchPosts(error));
  }
}

export function* toggleLoveSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(
      `http://localhost:4000/api/posts/${action.post.id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(action.post), // body data type must match "Content-Type" header
      }
    );
    const res = yield response.json();
    yield put(actions.successToggleLove(res, action.postType));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* toggleRequestSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`http://localhost:4000/api/request`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ id: action.id, userId: action.userId }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successToggleRequest(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* toggleFollowSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`http://localhost:4000/api/follow`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        id: action.id,
        userId: action.userId,
        isAccepted: action.isAccepted,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successToggleFollow(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* changeAvatarSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingChangePic(true));
  try {
    const response = yield fetch(`http://localhost:4000/api/avatar`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ id: action.id, avatar: action.avatar }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingChangePic(false));
    yield localStorage.setItem("avatar", action.avatar);
    yield put(actions.successChangeAvatar(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* changeCoverSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingChangePic(true));
  try {
    const response = yield fetch(`http://localhost:4000/api/cover`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ id: action.id, cover: action.cover }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield delay(1000);
    yield put(actions.loadingChangePic(false));
    yield put(actions.successChangeCover(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}
