interface RangeFieldProps {
  label: string;
  symbol?: string;
  value: number;
  help?: string;
  onChange: (value: number) => void;
}

export function RangeField({ label, symbol, value, help, onChange }: RangeFieldProps) {
  const percentage = Math.round(value * 100);

  return (
    <label className="range-field">
      <span className="range-label-row">
        <span>
          <strong>{label}</strong>
          {symbol ? <em>{symbol}</em> : null}
        </span>
        <output>{percentage}%</output>
      </span>
      {help ? <span className="range-help">{help}</span> : null}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
