import axios from "axios";

export default async function handler(req, res) {
  try {
    const result = await getAllUsers()
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}

const getAllUsers = async ():Promise<any> => {
  let data = null;
  let errorMsg = null;
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/users');
    data = await response.data;
    console.log(data)
  } catch (error: any) {
    console.log(error)
    errorMsg = error.response.data.message;
  }
  return { data, errorMsg };
}