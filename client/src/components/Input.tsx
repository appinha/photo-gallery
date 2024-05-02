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
      <div className="title"><label htmlFor="input_">{title}</label></div>
      <input
        id="input_"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setErrorText("")}
      />
      <div className="errorLabel">{errorText}</div>
    </div>
  );
}