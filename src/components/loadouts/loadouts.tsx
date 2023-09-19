'use client';

import styles from './loadouts.module.css'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import WeaponApi from '@/api/weapon-api'
import VerticalSpinner from '../vertical-spinner';

export default function Loadouts() {
    useEffect(() => {
        const fetchData = async () => {
            const categories = await WeaponApi.getCategories()
            const restrictions = await WeaponApi.getRestrictionTypes()
            const weapons = await WeaponApi.getWeapons()

            const weaponList = weapons.map((weapon: any) => {

                return {
                    category: categories.find((category: any) => category.id === weapon.category).name,
                    restrictionType: restrictions.find((restriction: any) => restriction.id === weapon.restrictionType)?.name,
                    price: weapon.price,
                    updated: weapon.updated,
                    priority: weapon.priority,
                    name: weapon.name,
                    id: weapon.id,
                    image: weapon.image
                }
            });

            setCategories(categories)
            setWeapons(weaponList)
            setSelectedWeaponCategory(categories[0].name)

            setIsLoading(false)
        }

        fetchData();
    }, [])


    const [weapons, setWeapons] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedWeaponCategory, setSelectedWeaponCategory] = useState('Rifles')
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className={styles.loadoutsContainer}>
            {isLoading && <VerticalSpinner></VerticalSpinner>}
            {!isLoading &&
                <div className={styles.loadouts}>
                    <div className={styles.navigation}>
                        {categories.map(category => {
                            return (
                                <div key={category.id} className={selectedWeaponCategory === category.name ? styles.active : ''} onClick={() => setSelectedWeaponCategory(category.name)}>
                                    <p>{category.name}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.loadout}>
                        <div className={styles.loadoutSlots}>
                            {weapons.filter((weapon) => weapon.category === selectedWeaponCategory).map((weapon, i) => {
                                return (
                                    <div key={i} className={styles.slot}>
                                        <div className={styles.header}>
                                            <div>
                                                <h4 className="text-muted">
                                                    {weapon.name}
                                                    {weapon.restrictionType &&
                                                        <span className={weapon.restrictionType === 'T' ? styles.restrictionT : weapon.restrictionType === 'CT' ? styles.restrictionCT : ''}>
                                                            ({weapon.restrictionType})
                                                        </span>}
                                                </h4>
                                                <p>{weapon.category}</p>
                                            </div>
                                            <div>
                                                <h3>${weapon.price}</h3>
                                            </div>
                                        </div>
                                        <Image src={`http://127.0.0.1:8090/api/files/weapons/${weapon.id}/${weapon.image}?thumb=260x200`} alt={weapon.name} width={260} height={200} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
            }
        </div>
    );
}