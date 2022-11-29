
import type { NextApiRequest, NextApiResponse } from "next";

import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files: formidable.Files) {

        await saveFile(files);
        return res.status(201).send("");
    });
};

const saveFile = async (file: formidable.Files) => {
    if (!file)
        // const data = fs.readFileSync(file.filePath);
        // fs.writeFileSync(`./public/${file.name}`, data);
        // await fs.unlinkSync(file.path);
        return;
};

// export default (req, res) => {
//   req.method === "POST"
//     ? post(req, res)
//     : req.method === "PUT"
//     ? console.log("PUT")
//     : req.method === "DELETE"
//     ? console.log("DELETE")
//     : req.method === "GET"
//     ? console.log("GET")
//     : res.status(404).send("");
// };

