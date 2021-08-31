import {
  put,
  //  delay
  select,
} from "redux-saga/effects";
import * as actions from "../actions/index";
// require("dotenv").config();

const server =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PRODUCTION_URL
    : "http://localhost:4000";

export function* fetchPostsSaga() {
  const getPage = (state) => state.posts.page;
  const page = yield select(getPage);
  yield page < 2 && put(actions.loadingFetchPosts(true));
  const token = yield localStorage.getItem("token");
  const url = `${server}/api/posts?count=${10}&page=${page}`;
  try {
    const response = yield fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = yield response.json();
    // yield delay(1000);
    if (res.status === "FAILED") throw res;
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchPosts(res.data));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchProfileSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.userNotFound(false));
  const getPage = (state) => state.posts.page;
  const page = yield select(getPage);
  yield page < 2 && put(actions.loadingFetchPosts(true));
  try {
    const response = yield fetch(
      `${server}/api/user/${action.id}?count=${10}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const res = yield response.json();
    // yield delay(1000);
    yield put(actions.loadingFetchPosts(false));
    if (res.status === "FAILED") yield put(actions.userNotFound(true));
    else yield put(actions.successFetchUser(res, action.typeFetch));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchNewsSaga() {
  const getPage = (state) => state.posts.page;
  const page = yield select(getPage);
  yield page < 2 && put(actions.loadingFetchPosts(true));
  const token = yield localStorage.getItem("token");
  const url = `${server}/api/news?count=${10}&page=${page}`;
  try {
    const response = yield fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = yield response.json();
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchNews(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchImagesSaga() {
  const getPage = (state) => state.posts.page;
  const page = yield select(getPage);
  yield page < 2 && put(actions.loadingFetchPosts(true));
  const token = yield localStorage.getItem("token");
  const url = `${server}/api/images?count=${10}&page=${page}`;
  try {
    const response = yield fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = yield response.json();
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.successFetchImages(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingFetchPosts(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* uploadImageSaga(action) {
  action.data.type === "post"
    ? yield put(actions.loadingSendPost(true))
    : yield put(actions.loadingChangePic(true));
  const data = new FormData();
  data.append("upload_preset", "social-media-app");
  data.append("file", action.data.image);
  data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_KEY);
  try {
    const response = yield fetch(process.env.REACT_APP_CLOUDINARY_API_URL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    if (action.data.type === "post") {
      const post = { ...action.data, image: res.secure_url };
      yield put(actions.sendNewPost(post));
    } else if (action.data.type === "avatar") {
      const avatar = { avatar: res.secure_url };
      yield put(actions.changeAvatar(avatar));
    } else if (action.data.type === "cover") {
      const cover = { cover: res.secure_url };
      yield put(actions.changeCover(cover));
    }
  } catch (error) {
    yield put(actions.failFetchPosts(error));
    yield put(actions.loadingSendPost(false));
  }
}

export function* sendNewPostSaga(action) {
  yield put(actions.loadingSendPost(true));
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/post`, {
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
    // yield delay(1000);
    if (res.status === "FAILED") throw res;
    yield put(actions.loadingSendPost(false));
    yield put(actions.successSendNewPost(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
    yield put(actions.loadingSendPost(false));
  }
}

export function* addCommentSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingSendComment(true));
  try {
    const response = yield fetch(`${server}/api/comment/`, {
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
      body: JSON.stringify(action.data), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.loadingSendComment(false));
    yield put(actions.successAddComment(res.data));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingSendComment(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* fetchUsersSaga() {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingFetchUsers(true));
  try {
    const response = yield fetch(`${server}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = yield response.json();
    yield put(actions.loadingFetchUsers(false));
    yield put(actions.successFetchUsers(res.data));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingFetchUsers(false));
    // yield put(actions.failFetchPosts(error));
  }
}

export function* searchUsersSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingSearch(true));
  try {
    const response = yield fetch(`${server}/api/search_users`, {
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
      body: JSON.stringify({ name: action.name }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.loadingSearch(false));
    yield put(actions.successSearchUser(res.data));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingSearch(false));
    // yield put(actions.failFetchPosts(error));
  }
}

export function* toggleLoveSaga(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/love`, {
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
      body: JSON.stringify({ id: action.id }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successToggleLove(res.data));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* follow(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/follow`, {
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
        followId: action.followId,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successFollowSystem(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* accept(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/accept`, {
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
        acceptId: action.acceptId,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successFollowSystem(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* decline(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/decline`, {
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
        declineId: action.declineId,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successFollowSystem(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* cancel(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/cancel`, {
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
        cancelId: action.cancelId,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successFollowSystem(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* unfollow(action) {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/unfollow`, {
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
        unfollowId: action.unfollowId,
      }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    yield put(actions.successFollowSystem(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}

export function* changeAvatarSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingChangePic(true));
  try {
    const response = yield fetch(`${server}/api/avatar`, {
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
      body: JSON.stringify({ avatar: action.data.avatar }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    // yield delay(1000);
    yield put(actions.loadingChangePic(false));
    yield localStorage.setItem("avatar", action.data.avatar);
    yield put(actions.successChangeAvatar(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingChangePic(false));
    yield put(actions.failFetchPosts(error));
  }
}

export function* changeCoverSaga(action) {
  const token = yield localStorage.getItem("token");
  yield put(actions.loadingChangePic(true));
  try {
    const response = yield fetch(`${server}/api/cover`, {
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
      body: JSON.stringify({ cover: action.data.cover }), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    // yield delay(1000);
    yield put(actions.loadingChangePic(false));
    yield localStorage.setItem("cover", action.data.avatar);
    yield put(actions.successChangeCover(res));
  } catch (error) {
    yield console.log(error);
    yield put(actions.loadingChangePic(false));
    yield put(actions.failFetchPosts(error));
  }
}
