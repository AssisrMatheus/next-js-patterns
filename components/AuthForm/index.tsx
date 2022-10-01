import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Field from "../Field";
import Link from "next/link";
import { useEffect } from "react";

export default function AuthForm({
  isSignup,
  onSubmit,
}: {
  isSignup?: boolean;
  onSubmit?: (form: Record<string, unknown>) => void;
}) {
  const { status } = useSession();
  const { replace, query } = useRouter();

  const error = query.error;
  const redirectUrl = query.redirectUrl;

  useEffect(() => {
    if (status === "authenticated") {
      replace("/");
    }
  }, [status, replace]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>
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
        {isSignup ? (
          <Link
            href={
              redirectUrl
                ? `/auth/signin?redirectUrl=${encodeURIComponent(
                    redirectUrl as string
                  )}`
                : "/auth/signin"
            }
          >
            <a>
              <button className={styles.button} type="button">
                Go to Sign In
              </button>
            </a>
          </Link>
        ) : (
          <Link
            href={
              redirectUrl
                ? `/auth/signup?redirectUrl=${encodeURIComponent(
                    redirectUrl as string
                  )}`
                : "/auth/signup"
            }
          >
            <a>
              <button className={styles.button} type="button">
                Go to Sign Up
              </button>
            </a>
          </Link>
        )}
        <div className={styles.divider}>
          <p className={styles.dividerText}>OR</p>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const formProps = Object.fromEntries(formData);

            if (onSubmit) {
              onSubmit(formProps);
            }
          }}
        >
          <Field label="Email" name="email" type="email" required />
          {isSignup && <Field label="Name" name="name" type="text" required />}
          <Field label="Password" name="password" type="password" required />
          <button className={styles.button} type="submit">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
