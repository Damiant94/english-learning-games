import styles from "./Layout.module.scss";

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.Layout}>
      {children}
    </div>
  )
}