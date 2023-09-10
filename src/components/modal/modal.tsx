'use client';


import styles from './header.module.css'

type ModalProps = {
    header: string,
    confirm?: string,
    cancel?: string,
    isDisabled?: boolean,
    confirmCallback: any,
    cancelCallback: any
}

export default function Modal(props: ModalProps) {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h3>{props.header}</h3>

                <div className={styles.actions}>
                    <button className='btn btnPrimary' onClick={props.confirmCallback} disabled={props.isDisabled}>
                        {props.confirm || 'OK'}
                    </button>
                    <button className='btn btnSecondary' onClick={props.cancelCallback} disabled={props.isDisabled}>
                        {props.cancel || 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}