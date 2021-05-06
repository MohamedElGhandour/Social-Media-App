import { put, delay } from "redux-saga/effects";
import defoultProfilePic from "../../assets/images/avatar.jpg";
import * as actions from "../actions/index";

export function* authSaga(action) {
  let url = yield "http://localhost:4000/api/auth/login";
  action.data.isSignUp &&
    (url = yield "http://localhost:4000/api/auth/register");
  const authData = {
    email: action.data.email,
    password: action.data.password,
  };
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
    const expirationDate = yield new Date(res.expiresIn * 1000);
    let avatar = defoultProfilePic;
    res.avatar && (avatar = res.avatar);
    yield localStorage.setItem("token", res.access_token);
    yield localStorage.setItem("userId", res.id);
    yield localStorage.setItem("avatar", avatar);
    yield localStorage.setItem("name", res.name);
    yield localStorage.setItem("email", res.email);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("following", res.following);
    yield put(actions.successAuth(res));
  } catch (error) {
    yield console.log(error);
  }
}

export function* authLogoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("avatar");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("email");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("following");
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
      const name = yield localStorage.getItem("name");
      const email = yield localStorage.getItem("email");
      const expirationDate = yield localStorage.getItem("expirationDate");
      const data = {
        token: token,
        userId: userId,
        avatar: avatar,
        name: name,
        email: email,
      };
      yield put(actions.successAuth(data));
      yield put(
        actions.checkAuthTimeout(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
