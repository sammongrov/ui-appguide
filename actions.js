export default function viewedIntro() {
  return (dispatch) =>
    new Promise(async (resolve) =>
      resolve(
        dispatch({
          type: 'VIEWED_APP_INFO',
        }),
      ),
    );
}
