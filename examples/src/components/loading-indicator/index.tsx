import styles from './progress-indicator.module.sass'

const ProgressIndicator = ({ className = '' }) => (
  <section
    className="flex justify-center items-center w-full pb-[52px]"
    style={{
      height: 'calc(100vh - 52px)',
    }}
  >
    <div className={` relative w-[48px] h-[48px] ${className}`}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={styles.path}
          stroke="#000"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  </section>
)

export default ProgressIndicator
