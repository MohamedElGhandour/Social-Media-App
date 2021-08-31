import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";

const server =
  process.env.NODE_ENV === "production"
    ? "https://social-media-app-ghandour.herokuapp.com"
    : "http://localhost:4000";

export function* authSaga(action) {
  let url = yield `${server}/api/auth/login`;
  action.data.isSignUp && (url = yield `${server}/api/auth/signup`);
  const authData = {
    name: action.data.name,
    email: action.data.email,
    password: action.data.password,
  };
  action.data.isSignUp
    ? yield put(actions.loadingSignup(true))
    : yield put(actions.loadingLogin(true));
  try {
    const response = yield fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(authData), // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    if (res.status === "FAILED") throw res;
    const expirationDate = yield new Date(res.expiresIn * 1000);
    yield localStorage.setItem("name", res.data.name);
    yield localStorage.setItem("userId", res.data._id);
    yield localStorage.setItem("email", res.data.email);
    yield localStorage.setItem("token", res.access_token);
    yield localStorage.setItem("avatar", res.data.avatar);
    yield localStorage.setItem("cover", res.data.cover);
    yield localStorage.setItem("followers", JSON.stringify(res.data.followers));
    yield localStorage.setItem("requests", JSON.stringify(res.data.requests));
    yield localStorage.setItem("following", JSON.stringify(res.data.following));
    yield localStorage.setItem("pending", JSON.stringify(res.data.pending));
    yield localStorage.setItem("expirationDate", expirationDate);
    // yield delay(5000)
    yield put(
      actions.checkAuthTimeout(
        (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
      )
    );
    action.data.isSignUp
      ? yield put(actions.loadingSignup(false))
      : yield put(actions.loadingLogin(false));
    yield put(actions.successAuth(res));
  } catch (error) {
    action.data.isSignUp
      ? yield put(actions.failSignup(error))
      : yield put(actions.failAuth(error));
    action.data.isSignUp
      ? yield put(actions.loadingSignup(false))
      : yield put(actions.loadingLogin(false));
  }
}

export function* authLogoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("avatar");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("email");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("followers");
  yield localStorage.removeItem("requests");
  yield localStorage.removeItem("following");
  yield localStorage.removeItem("pending");
  yield localStorage.removeItem("cover");

  yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      const userId = yield localStorage.getItem("userId");
      const avatar = yield localStorage.getItem("avatar");
      const cover = yield localStorage.getItem("cover");
      const followers = yield JSON.parse(localStorage.getItem("followers"));
      const requests = yield JSON.parse(localStorage.getItem("requests"));
      const following = yield JSON.parse(localStorage.getItem("following"));
      const pending = yield JSON.parse(localStorage.getItem("pending"));
      const name = yield localStorage.getItem("name");
      const email = yield localStorage.getItem("email");
      const expirationDate = yield localStorage.getItem("expirationDate");
      const data = {
        name: name,
        userId: userId,
        email: email,
        token: token,
        avatar: avatar,
        cover: cover,
        followers: followers,
        requests: requests,
        following: following,
        pending: pending,
      };
      yield put(actions.successAuth({ data: data }));
      yield put(
        actions.checkAuthTimeout(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

export function* fetchCurrentUser() {
  const token = yield localStorage.getItem("token");
  try {
    const response = yield fetch(`${server}/api/current_user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = yield response.json();
    yield localStorage.setItem("name", res.data[0].name);
    yield localStorage.setItem("userId", res.data[0]._id);
    yield localStorage.setItem("email", res.data[0].email);
    yield localStorage.setItem("avatar", res.data[0].avatar);
    yield localStorage.setItem("cover", res.data[0].cover);
    yield localStorage.setItem(
      "followers",
      JSON.stringify(res.data[0].followers)
    );
    yield localStorage.setItem(
      "requests",
      JSON.stringify(res.data[0].requests)
    );
    yield localStorage.setItem(
      "following",
      JSON.stringify(res.data[0].following)
    );
    yield localStorage.setItem("pending", JSON.stringify(res.data[0].pending));
    const data = {
      name: res.data[0].name,
      userId: res.data[0]._id,
      email: res.data[0].email,
      token: token,
      avatar: res.data[0].avatar,
      cover: res.data[0].cover,
      followers: res.data[0].followers,
      requests: res.data[0].requests,
      following: res.data[0].following,
      pending: res.data[0].pending,
    };
    yield put(actions.successAuth({ data: data }));
  } catch (error) {
    // yield console.log(error);
    yield put(actions.failFetchPosts(error));
  }
}
