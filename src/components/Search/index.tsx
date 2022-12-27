import React, { FormEvent } from 'react'
import { BiSearch } from 'react-icons/bi'
import { api } from '../../Config/api';
import { UF } from '../../models/UF';
import styles from './styles.module.css'

type Props = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getData: () => void;
    placeholder: string;
}

export const Search = ({ search, setSearch, getData, placeholder }: Props) => {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (search.trim()) {
            getData()
        }
    }

    return (
        <form onSubmit={(e) => onSubmit(e)} className={styles.container}>
            {/* {ufs &&
                <div>
                    <select onChange={(e) => { handleUfChange(e) }} name="uf" id="ufs">
                        {ufs && ufs.map((uf) => (
                            <option key={uf.id} value={uf.id}>{uf.sigla}</option>
                        ))}
                    </select>
                </div>
            } */}
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder={placeholder} />
            <button type='submit' className={styles.search_btn}>
                <BiSearch />
            </button>
        </form>
    )
}
