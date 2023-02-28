import express from "express";
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()
const app = express();
const port = 3000;
app.use(express.json())
app.get("/", async (req, res) => {
  try {
    console.log("lol")
    const result = await prisma.karyawan.findMany()
    return res.status(200).json(result)
  }catch(err) {
    console.log(err)
    return res.status(500).send("Server Error")
  }
});

app.post("/", async (req, res) => {
 try {
  const data = await prisma.karyawan.create({data : req.body})
  return res.status(200).json(data)
}catch(err) {
  console.log(err)
  return res.status(500).send("Server Error")
 } 
})

app.delete("/:id", async (req, res) => {
  try {
    const result = await prisma.karyawan.delete({
      where : {
        id_karyawan : parseInt(req.params.id)
      }
    })
  }catch(err) {
    console.log(err)
  }
})

app.put("/:id", async (req, res) => {
 try {
  const data = await prisma.karyawan.update({
    where : {
      id_karyawan : parseInt(req.params.id)
    },
    data : req.body
  })

  return res.status(200).json(data)
 }catch(err) {
  console.log(err)
 } 
})

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`);
});
