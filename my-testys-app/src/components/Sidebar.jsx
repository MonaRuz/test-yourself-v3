import { Link } from "react-router-dom"
import { projectFirestore } from "../firebase/config"
import { useState, useEffect } from "react"


const Sidebar = () => {
  const [data,setData]=useState([])
  const [error,setError]=useState(false)
  
  useEffect(()=>{
    const unsubscribe=projectFirestore.collection("categories").onSnapshot((snapshot)=>{
      
      if(snapshot.empty){
        setError("Zatím nebyla vytvořena žádná kategorie")
      }else{
        let result=[]
        snapshot.docs.forEach((oneCategory)=>{
          result.push({id:oneCategory.id, ...oneCategory.data()})
        })
        setData(result)
      }
    },(err)=>{setError(err.message)})
    
    //cleanup function
    return()=>{unsubscribe()}
    
  },[])
  
  return (
    <section>
      <h2>Kategorie otázek</h2>
      <div className="categories">
        {error && <p>{error}</p>}
        {data.map((oneCategory)=>{
          return <Link to={`/questions/${oneCategory.id}`} key={oneCategory.id}>
            <h5>{oneCategory.category}</h5>
          </Link>
        })}
      </div>
    </section>
  )
}

export default Sidebar