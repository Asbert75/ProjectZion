import Wave from './wave';
import { Props } from './wave';

export default function TopWave(props: Props) {
    return (
        <Wave height={props.height} width={props.width} color={props.color} isBottomWave={false} />
    );
}