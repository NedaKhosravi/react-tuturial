const user = (props) => {
    const { user, handleLog } = props;
    return (
        <>
            <h3 style={{ background: "red" }}>I AM {user}</h3>
            <button onClick={handleLog}>Clickme</button>
        </>
    )
}
export default user;