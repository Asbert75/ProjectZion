'use client';


import styles from './modal.module.css'

type ModalProps = {
    isVisible: boolean,
    header: string,
    confirm?: string,
    cancel?: string,
    isDisabled?: boolean,
    confirmCallback: any,
    cancelCallback: any,
    children: any
}

export default function Modal(props: ModalProps) {
    if (!props.isVisible) return '';
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h3>{props.header}</h3>
                {props.children &&
                    <div className={styles.childrenContainer}>
                        {props.children}
                    </div>
                }

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