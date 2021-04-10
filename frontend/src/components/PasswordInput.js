function PasswordInput(props) {
    return (
        <input
            type="password"
            placeholder="password"
            onChange={props.handleChange}
        />
    );
}

export default PasswordInput;
