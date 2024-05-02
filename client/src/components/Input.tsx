import "./Input.css";

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
  const { type, placeholder, title, value, errorText, setValue, setErrorText, ...inputProps } =
    props;

  const id = `input${title}`;

  return (
    <div id="input">
      <div className="title">
        <label htmlFor={id}>{title}</label>
      </div>
      <input
        id={id}
        type={type ?? "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setErrorText("")}
        {...inputProps}
      />
      <div className="errorLabel" data-testid={`error${title}`}>
        {errorText}
      </div>
    </div>
  );
}
