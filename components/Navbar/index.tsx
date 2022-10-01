import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <div className={styles.center}>
        <ul>
          {[
            {
              href: "/",
              content: "Home",
            },
            {
              href: "/server",
              content: "Server",
            },
            {
              href: "/static",
              content: "Static",
            },
            {
              href: "/protected",
              content: "Protected",
            },
          ].map(({ href, content }) => (
            <li key={href}>
              <Link href={href}>
                <a
                  style={{
                    textDecoration: pathname === href ? "underline" : undefined,
                  }}
                >
                  {content}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.center}>
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
            className={[styles.button, styles.danger].join(" ")}
            type="button"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <Link href="/auth/signin">
            <a>
              <button className={styles.button} type="button">
                Sign In
              </button>
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}
