import './App.css'

import { useEffect, useState } from 'react'


 export default function App() {

  const [tab, settab] = useState('photos')

  const [data, setdata] = useState([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/${tab}`)
      const result = await res.json()
      setdata(result)
    }
    getData()


  }, [tab])

  const [page, setpage] = useState(1)
  const pagelimit = 30

  // pagination formula (client side pagination)
  const currentdata = data.slice((page - 1) * pagelimit, page * pagelimit)

  return (
    <>

      <div>
        <nav className='navbar'>

          <h2>Usha Martin Workshop</h2>

          <div className='nav-tabs'>
            <button className={tab === 'photos' ? 'active' : ''}
              onClick={() => settab('photos')}
            >Photos</button>

            <button className={tab === 'users' ? 'active' : ''}
              onClick={() => settab('users')}
            >users</button>
          </div>

        </nav>

      </div>

      {/* card bnaya jisme ek album hai and ek title hai */}

      <div className='container'>
        {
          currentdata.map((x) => (

            <div key={x.id} className='album-card'>

              {
                tab === 'photos' ? (
                  <>
                    <img src={x.thumbnailUrl} alt="" />

                    <div className='content'>
                      <h4>{x.title}</h4>
                    </div>
                  </>


                )
                  : (
                    <div className='user-info'>
                      <h3>{x.name}</h3>
                      <p>{x.email}</p>
                      <p>{x.address?.city}</p>
                    </div>
                  )

              }




            </div>

          ))
        }


      </div>

      {/* pagination buttons */}

      <div className='page-button'>
        <button id='prev' disabled={page == 1} onClick={() => setpage(page - 1)}>Previous</button>

        <span>{page}</span>

        <button id='next' onClick={() => setpage(page + 1)}>Next</button>

      </div>


    </>
  )



}

