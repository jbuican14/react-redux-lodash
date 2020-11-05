import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  console.log("going to fetch posts");
  await dispatch(fetchPosts());

  // ~~~~~~ lodash refactor with lodash below
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  // ~~~~~ new lodash
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();

  // console.log("fetched Posts", getState().posts); ~~~~ test to see if this fetch method 2 ~~~~~
};

export const fetchPosts = () => async (dispatch) => {
  const res = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: res.data });
};

// export const fetchUser = (id) => async (dispatch) => {
//   const res = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: res.data });
// };

export const fetchUser = (id) => async (dispatch) => {
  const res = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: res.data });
};

//~~~~~~~~~~~ Use of memoize option (fetch one time)~~~~~~~~~~//
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// const _fetchUser = () =>
//   _.memoize(async (id, dispatch) => {
//     const res = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: "FETCH_USER", payload: res.data });
//   });

// export const fetchPosts = async () => {
//   const res = await jsonPlaceholder.get('/posts');
//   return {
//     type: "FETCH_POSTS",
//     payload: res
//   };
// };
