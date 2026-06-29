interface DatePickerProps {
    placeholder?: string;
    value?: string | null;
    onChange?: (isoDate: string | null) => void;
}
export declare function DatePicker({ placeholder, value, onChange }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
