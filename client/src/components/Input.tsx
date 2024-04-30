import './Input.css';

type Props = {
  type?: string;
  title: string;
  placeholder: string;
  value: string;
  errorText: string;
  setValue: (v: string) => void;
  setErrorText: (v: string) => void;
};

export default function Input(props: Props) {
  const { type, placeholder, title, value, errorText, setValue, setErrorText } = props;

  return (
    <div id="input">
      <label>
        <div className="title">{title}</div>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setErrorText("")}
        />
        <div className="errorLabel">{errorText}</div>
      </label>
    </div>
  );
}