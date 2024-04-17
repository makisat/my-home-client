import './App.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface Link {
  id: number;
  name: string;
  url: string;
}

function App() {

  const { data } = useQuery({ queryKey: ["links"], queryFn: (): Promise<Link[]> => (
    axios.get("http://localhost:8080/")
      .then(res => res.data)
  )})

  return (
    <div>
      <h1>Hello World</h1>
      <ul id="links">
      {
        data?.map(res => {
          return <li id={ res.id.toString() }><a href={ res.url }>{ res.name }</a></li>
        })
      }
      </ul>
    </div>
  )
}

export default App
