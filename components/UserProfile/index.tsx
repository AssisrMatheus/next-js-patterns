import { useSession } from "next-auth/react";
import styles from "./index.module.css";

export default function UserProfile() {
  const { data: session, status } = useSession();
  return (
    <>
      {/* {status === "loading" && (
        <div className={styles.card}>
          <div>
            <div
              className="skeleton"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                marginBottom: "24px",
              }}
            />
            <div
              className="skeleton"
              style={{ width: "150px", height: "30px" }}
            />
            <div
              className="skeleton"
              style={{ width: "100%", height: "15px", marginTop: "12px" }}
            />
          </div>
        </div>
      )} */}

      <div
        className={styles.card}
        style={{
          opacity: status === "authenticated" ? 1 : 0,
          display: status !== "authenticated" ? "hidden" : "hidden",
          transition: "opacity .2s ease-in",
        }}
      >
        {session?.user && (
          <>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
          </>
        )}
      </div>

      <h3
        style={{
          opacity: status === "unauthenticated" ? 1 : 0,
          transition: "opacity .2s ease-in",
        }}
      >
        {status === "unauthenticated" && "Please sign in"}
      </h3>
    </>
  );
}
