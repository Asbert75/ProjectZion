import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Spinner(props) {
    return (
        <div className={'spin'}>
            <FontAwesomeIcon icon={faSpinner} style={{ fontSize: props.size ? props.size : 18, color: props.isDark ? 'black' : 'white' }} />
        </div>
    );
}