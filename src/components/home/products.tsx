import styles from './products.module.css'
import BottomWave from '../bottom-wave';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';



export default async function Products() {
    const productList = [
        {
            name: 'Diamond Plan',
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
            ],
            price: '175'
        }, {
            name: 'Gold Plan',
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: false },
            ],
            price: '50'
        }, {
            name: 'Silver Plan',
            sellingPoints: [
                { value: 'Point 1', hasItem: true },
                { value: 'Point 1', hasItem: false },
                { value: 'Point 1', hasItem: false },
            ],
            price: '20'
        }
    ];

    return (
        <div className={styles.products}>
            {productList.map((product, id) => {
                return (
                    <div key={id} className={[styles.productCard, 'ambientLight'].join(" ")}>
                        <div className={styles.header}>
                            <h3>{product.name}</h3>
                            <BottomWave height='20px' width='160%'></BottomWave>
                        </div>

                        <div className={styles.information}>
                            <ul>
                                {product.sellingPoints.map((sp, id) => (
                                    <li key={id}>
                                        {sp.hasItem ?
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                style={{ fontSize: 16 }}
                                            /> :
                                            <FontAwesomeIcon
                                                icon={faTimesCircle}
                                                style={{ fontSize: 16 }}
                                            />
                                        }
                                        <p>{sp.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.pricing}>
                            {/* <TopWave height='20px'></TopWave> */}
                            <h4>€{product.price}<span>/mo</span></h4>
                            <button className={'btn btnSecondary'}>BUY NOW</button>
                        </div>
                    </div>)
            })}
        </div>
    )
}
