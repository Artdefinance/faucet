import styles from "./Input.module.css";
import Token from "@/components/icons/Token";

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
      <Token />
    </div>
  );
};

export default Input;
