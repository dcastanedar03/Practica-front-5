const Volver = () => {
    const handleVolver = () => {
        window.location.href = '/';
    };

    return (
        <button class = "btn btn-blue" onClick={handleVolver}>
            Return
        </button>
    );
};

export default Volver;