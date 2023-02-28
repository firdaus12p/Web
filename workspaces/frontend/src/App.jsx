import { useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap"
export default function App() {
  const [data, setData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [input, setInput] = useState({
    nama_karyawan: "",
    jabatan_karyawan: "",
    gaji_karyawan: 0,
    tunjangan: 0,
    jam_kerja: 0,
    pendidikan: "",
    alamat: "",
    status: ""
  })
  async function getData() {
    try {
      const response = await fetch("/api");
      if (!response.ok) return
      const data = await response.json();
      setData(data)
    }catch(err) {
      console.log(err)
    }
  }
  async function submit(ev) {
    ev.preventDefault()
    const response = await fetch(isEdit ? "/api/" + input.id_karyawan : "/api", {
      method: isEdit ? "PUT" : "POST"
      ,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    setIsEdit(false)
    if (!response.ok) return
    getData()
    setInput({
      nama_karyawan: "",
      jabatan_karyawan: "",
      gaji_karyawan: 0,
      tunjangan: 0,
      jam_kerja: 0,
      pendidikan: "",
      alamat: "",
      status: ""
    })
  }
  async function hapus(id) {
    const response = await fetch("/api/" + id, {
      method: "DELETE"
    })
    getData()
  }
  useEffect(() => {
    getData()
  }, [])
  function handleChange(ev) {
    console.log(ev.target.type)
    setInput(prev => ({
      ...prev,
      [ev.target.name]: ev.target.type == "number" ? parseInt(ev.target.value) : ev.target.value
    }))
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "90%", minHeight: "90vh", backgroundColor: "white", margin: "5rem 0" }}>
        <h1>Karyawan</h1>
        <form >
          <FloatingLabel controlId="nama" label="Nama Karyawan">
            <Form.Control type="text" value={input.nama_karyawan} onChange={handleChange} name="nama_karyawan" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="jabatan" label="Jabatan Karyawan">
            <Form.Control type="text" value={input.jabatan_karyawan} onChange={handleChange} name="jabatan_karyawan" placeholder="Jabatan Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="gaji" label="Gaji Karyawan">
            <Form.Control type="number" value={input.gaji_karyawan} onChange={handleChange} name="gaji_karyawan" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="tunjangan" label="Tunjangan Karyawan">
            <Form.Control type="number" value={input.tunjangan} onChange={handleChange} name="tunjangan" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="jam_kerja" label="Jam Kerja">
            <Form.Control type="number" value={input.jam_kerja} onChange={handleChange} name="jam_kerja" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="pendidikan" label="Pendidikan">
            <Form.Control type="text" value={input.pendidikan} onChange={handleChange} name="pendidikan" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="alamat" label="Alamat">
            <Form.Control type="text" value={input.alamat} onChange={handleChange} name="alamat" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <FloatingLabel controlId="status" label="Status">
            <Form.Control type="text" value={input.status} onChange={handleChange} name="status" placeholder="Nama Karyawan" />
          </FloatingLabel>
          <Button onClick={submit} type="submit">{isEdit ? "Edit" : "Submit"}</Button>
        </form>
        <div style={{display:"flex", flexWrap:"wrap"}}> 
          {
            data?.map(el => (
              <Card key={el.id_karyawan} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{el.nama_karyawan}</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>Gaji : {el.gaji_karyawan.toLocaleString("id-ID", {style :"currency", currency : "IDR"})}</li>
                      <li>Tunjangan : {el.tunjangan.toLocaleString("id-ID", {style :"currency", currency : "IDR"})}</li>
                      <li>Jabatan : {el.jabatan_karyawan}</li>
                      <li>Jam Kerja : {el.jam_kerja}</li>
                      <li>Pendidikan : {el.pendidikan}</li>
                      <li>Alamat : {el.alamat}</li>
                      <li>Status : {el.status}</li>
                    </ul>
                  </Card.Text>
                  <Button variant="primary" onClick={() => {
                    setInput(el)
                    setIsEdit(true)
                  }}>Edit</Button>
                  <Button variant="danger" onClick={() => {
                    hapus(el.id_karyawan)
                  }}>Hapus</Button>
                </Card.Body>
              </Card>
            ))
          }
        </div>
      </div>
    </div>
  )
}