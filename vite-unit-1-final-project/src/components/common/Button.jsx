const Button = ({id, type, label, classes, handleClick, disabled}) => {
    return (
        <button id={`${id}-button`} type={type} onClick={handleClick} className={classes} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;

