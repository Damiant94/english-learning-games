import styles from "@/components/layout/layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}