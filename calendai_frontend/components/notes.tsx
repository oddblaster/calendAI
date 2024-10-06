const Notes = ({color, title, description}) => {
    return (
        <>
        <div className={`p-4 rounded-md`} style={{ backgroundColor: color }}>
            <h4 className="font-semibold">{title}</h4>
            <p>{description}</p>
        </div>
        </>
    );
}

export default Notes;