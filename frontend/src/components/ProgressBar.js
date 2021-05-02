function fractionToPerecent(numerator, denominator) {
    return Math.floor((numerator / denominator) * 100);
}

function ProgressBar(props) {
    return (
        <div className="progress-bar">
            <div className="progress-bar-outline">
                <span
                    className="progress-bar-fill"
                    style={{
                        width: `${fractionToPerecent(
                            props.current,
                            props.total
                        )}%`,
                    }}
                ></span>
            </div>
        </div>
    );
}

export default ProgressBar;
