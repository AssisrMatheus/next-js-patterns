import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Field from "../Field";
import Link from "next/link";

export default function AuthSignIn() {
  const { status } = useSession();
  const { push, query } = useRouter();

  const error = query.error;

  if (status === "authenticated") {
    push("/");
  }

  return (
    <div className={styles.card}>
      {error && (
        <div>
          {/* TODO: translate error message */}
          <p className={styles.error}>{error}</p>
          <div className={styles.divider} />
        </div>
      )}
      {[
        {
          provider: "github",
          content: <>Sign in with Github</>,
        },
      ].map(({ provider, content }) => (
        <button
          key={provider}
          className={styles.button}
          onClick={() => signIn(provider)}
        >
          {content}
        </button>
      ))}
      <div className={styles.divider}>
        <p className={styles.dividerText}>OR</p>
      </div>
      <Link href="/auth/signup">
        <a>
          <button className={styles.button} type="button">
            Sign Up
          </button>
        </a>
      </Link>
      <div className={styles.divider}>
        <p className={styles.dividerText}>OR</p>
      </div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const formProps = Object.fromEntries(formData);

          signIn("credentials", formProps);
        }}
      >
        <Field label="Email" name="email" type="email" required />
        <Field label="Password" name="password" type="password" required />
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
