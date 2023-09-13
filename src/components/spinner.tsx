import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type Props = {
    size?: number,
    color?: string
}

export default function Spinner(props: Props) {
    return (
        <div className={'spin'}>
            <FontAwesomeIcon icon={faSpinner} style={{ fontSize: props.size || 18, color: props.color || 'white' }} />
        </div>
    );
}