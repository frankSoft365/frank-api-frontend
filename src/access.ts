/**
 * @see https://umijs.org/docs/max/access#access
 * */
const ADMIN = 1;
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === ADMIN,
  };
}
