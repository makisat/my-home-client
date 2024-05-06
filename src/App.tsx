import './App.css'
import axios from 'axios'
import Popup from 'reactjs-popup'
import { useQuery } from '@tanstack/react-query'

interface Link {
  id: number;
  name: string;
  url: string;
}

function App() {
  const { data, refetch } = useQuery({ queryKey: ["links"], queryFn: (): Promise<Link[]> => (
    axios.get("http://localhost:8080/")
      .then(res => {
        return res.data
      })
  )})

  const addLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = (e.target as HTMLFormElement).name.value
    const url = (e.target as HTMLFormElement).url.value
    axios.post("http://localhost:8080/add-link", {
      name,
      url
    })
    .then(res => console.log(res))
    .then(() => refetch())
  }

  const deleteLink = (id: number) => {
    // const target = new Link({ id, name: "", url: "" })
    axios.delete(`http://localhost:8080/delete-link/${ id }`)
    .then(res => console.log(res))
    .then(() => refetch())
  }

  return (
    <div>
      <h1>Hello World</h1>
      <ul id="links">
      {
        data?.map(res => {
          return <li key={ res.id.toString() }><a href={ res.url }>{ res.name }</a> <button onClick={ () => deleteLink(res.id) }>X</button></li>
        })
      }
      <li id="add-link"><Popup trigger={ <button>Add Link</button>}>
          <h2>Add Link</h2>
          <form onSubmit={ addLink }>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="url">URL</label>
            <input type="text" id="url" name="url" />
            <button type="submit">Add</button>
          </form>
      </Popup></li>
      </ul>
    </div>
  )
}



export default App
