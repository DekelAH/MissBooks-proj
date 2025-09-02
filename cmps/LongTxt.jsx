
const { useState } = React

export function LongTxt({ text, limit = 100 }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {

        setIsExpanded(!isExpanded);
    };

    const shouldCut = text.length > limit;
    const displayedText = shouldCut && !isExpanded
        ? `${text.substring(0, limit)}...`
        : text;


    return (
        <div>
            <p>{displayedText}
                {shouldCut && (
                    <button onClick={toggleExpanded}>
                        {isExpanded ? 'Read Less...' : 'Read More...'}
                    </button>
                )}
            </p>
        </div>
    );
}