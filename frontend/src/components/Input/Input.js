import styles from "@/components/Input/Input.module.css";

const Input = (props) => {
  const { value, onChange, onBlur, placeholder, error } = props;

  return (
    <div className={styles.inputDiv}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error ? <div className={styles.required}>Required</div> : <></>}
    </div>
  );
};

export default Input;
