import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  .catch(error=>{console.log(error);return error})
  return request.then(response => response.data)
}

const create = newObject => {
  const request= axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = (id, setError, name) =>{
    const request=axios.delete(`${baseUrl}/${id}`)
    request.then(console.log)
    .catch(error=>{
        setError(`the contact '${name}' was already deleted from server`)
        console.log(error)
    })
}

const update =( id,newObject )=>{
    const request=axios.put(`${baseUrl}/${id}`, newObject)
    request.then(console.log)
}

export default { getAll,  create, remove, update }