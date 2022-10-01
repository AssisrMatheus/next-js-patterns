import styles from "./index.module.css";

export default function Field({
  label,
  name,
  id,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string }) {
  return label ? (
    <div>
      <label className={styles.label} htmlFor={name || id}>
        {label}
      </label>
      <input className={styles.input} name={name} id={id} {...props} />
    </div>
  ) : (
    <input className={styles.input} {...props} />
  );
}
