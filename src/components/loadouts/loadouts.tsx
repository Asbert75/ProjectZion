'use client';

import Image from 'next/image';
import { useState } from 'react';

import WeaponApi from '@/api/weapon-api';

export default async function Loadouts() {
    const res = await WeaponApi.getWeapons();
    console.log({weapons: res});

    const weapons = [
        {
            name: 'AWP',
            category: 'Rifles'
        }, {
            name: 'AK-47',
            category: 'Rifles'
        }, {
            name: 'M4A4',
            category: 'Rifles'
        }, {
            name: 'M4A1S',
            category: 'Rifles'
        }, {
            name: 'AUG',
            category: 'Rifles'
        }, {
            name: 'Famas',
            category: 'Rifles'
        }, {
            name: 'SG 553',
            category: 'Rifles'
        }, {
            name: 'Galil',
            category: 'Rifles'
        }, {
            name: 'USP-S',
            category: 'Pistols'
        }, {
            name: 'P2000',
            category: 'Pistols'
        }, {
            name: 'Glock-18',
            category: 'Pistols'
        }, {
            name: 'Desert Eagle',
            category: 'Pistols'
        }, {
            name: 'R8 Revolver',
            category: 'Pistols'
        }, {
            name: 'P250',
            category: 'Pistols'
        }, {
            name: 'Five-SeveN',
            category: 'Pistols'
        }, {
            name: 'Tec-9',
            category: 'Pistols'
        }, {
            name: 'CZ75-Auto',
            category: 'Pistols'
        }, {
            name: 'Dual Berettas',
            category: 'Pistols'
        }
    ]

    const weaponCategories = [
        'Rifles', 'Pistols', 'Mid Tier'
    ]
    const [selectedWeaponCategory, setSelectedWeaponCategory] = useState(weaponCategories[0]);

    return (
        <div className="loadouts-container">
            <div className="loadouts" >
                <div className="navigation">
                    <div><p>Loadout 1</p></div>
                    <div><p>Loadout 2</p></div>
                    <div className="active"><p>Loadout 3</p></div>
                    <div><p>Loadout 4</p></div>
                    <div><p>Loadout 5</p></div>
                    <div><p>Loadout 6</p></div>
                </div>

                <div className="loadout">
                    <h3>Loadout 3</h3>

                    <select value={selectedWeaponCategory} onChange={(e) => setSelectedWeaponCategory(e.target.value)}>
                        {weaponCategories.map(category => {
                            return (<option key={category} value={category}>{category}</option>)
                        })}
                    </select>

                    <div className="loadout-slots">
                        {weapons.filter((weapon) => weapon.category === selectedWeaponCategory).map((weapon, i) => {
                            return (<div key={i} className="slot">
                                <h4>{weapon.name}</h4>
                                <p className="text-muted">{weapon.category}</p>
                                <Image src={`/images/weapons/${weapon.category}/${weapon.name}.png`} alt={weapon.name} width={260} height={200} />
                            </div>)
                        })}
                    </div>
                </div>
            </div >
        </div>
    );
}