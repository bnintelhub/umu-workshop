import { useEffect, useState } from 'react'
import './App.css'


export default function Album() {


    // API integration

    const [data, setdata] = useState([])

    const [tab, settab] = useState('photos')

    useEffect(() => {

        const getdata = async () => {

            const x = await fetch(`https://jsonplaceholder.typicode.com/${tab}`)
            const y = await x.json()
            setdata(y)

        }
        getdata()



    }, [tab])

    const [page, setpage] = useState(1)
    const pagelimit = 30

    const currentdata = data.slice((page - 1) * pagelimit, page * pagelimit)

    const totalpage = Math.ceil(data.length / pagelimit)





    return (
        <>
            <div>
                <nav className='navbar'>
                    <h2>USHA MARTIN WORKSHOP</h2>

                    <div className='nav-tabs'>
                        <button onClick={() => settab('photos')}>Photo</button>
                        <button onClick={() => settab('users')}>Users</button>
                    </div>

                </nav>
            </div>

            <div className='container'>

                {
                    currentdata.map((x) => (

                        <div key={x.id} className='album-card'>

                            {
                                tab === 'photos' ?(

                                    <>

                                        <img src={x.thumbnailUrl} alt="" />
                                        <h4>{x.title}</h4>
                                    </>
                                ):

                                <div className='user-info'>
                                    <h4>{x.name}</h4>
                                    <p>{x.email}</p>
                                    <p>{x.address?.city}</p>
                                </div>



                            }

                        </div>

                    ))
                }


            </div>

            <div className='page-button'>
                <button disabled={page === 1} onClick={() => setpage(page - 1)} id='prev'>Previous</button>

                <span>{page}</span>

                <button disabled={page >= totalpage} onClick={() => setpage(page + 1)} id='next'>Next</button>
            </div>
        </>
    )
}