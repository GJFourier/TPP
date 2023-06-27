import "../../css/login.css";
import {Button} from "antd";

interface FormRowProps {
    type: string;
    name: string;
    label: string;
    value: string;
    handleChange: (e: { target: { name: any; value: any; } }) => void;
}

const FormRow = ({type, name, label, value, handleChange}: FormRowProps) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {label}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className='form-input'
            />
        </div>
    );
};

interface FormRowProps2 {
    type: string;
    name: string;
    value: string;
    handleChange: (e: { target: { name: any; value: any; } }) => void;
    handleSubmit: (e: { preventDefault: () => void; }) => void;
}

export const FormRow2 = ({type, name, value, handleChange, handleSubmit}: FormRowProps2) => {
    return (
        <div className="form-row">
            <div className="form-row2">
                <label htmlFor={name} className="form-label">
                    {name}
                </label>
                <Button
                    className="search-button"
                    size="middle"
                    type="text"
                    onClick={handleSubmit}
                >
                    获取验证码
                </Button>
            </div>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className="form-input"
            />
        </div>
    )
}

export default FormRow;