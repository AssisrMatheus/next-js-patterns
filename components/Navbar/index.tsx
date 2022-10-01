import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./index.module.css";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.nav}>
      <p
        style={{
          opacity: session?.user ? 1 : 0,
          transition: "opacity .2s ease-in",
        }}
      >
        {session?.user &&
          `Welcome, ${session.user.name}(${session.user.email})`}
      </p>

      {session?.user ? (
        <button
          key={"sign"}
          className={[styles.button, styles.danger].join(" ")}
          type="button"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <Link href="/auth/signin">
          <a>
            <button key={"sign"} className={styles.button} type="button">
              Sign In
            </button>
          </a>
        </Link>
      )}
    </nav>
  );
}
