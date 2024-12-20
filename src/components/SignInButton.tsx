import { signIn, useSession } from "next-auth/react";
import { memo, useCallback } from "react";
import type React from "react";

export default memo(function SignInButton(): React.ReactElement {
  const { data } = useSession();

  console.log(data);

  const onSingIn = useCallback(async () => {
    await signIn("google");
  }, []);


  return (
    <button onClick={onSingIn}>Sign in</button>
  )
});