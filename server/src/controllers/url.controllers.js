import Url from '../db/model.db.js';
import { nanoid } from 'nanoid';
import logEvent from '../../../logging/src/log.middleware.js';

const shortenUrl = async (req, res) => {
    try {
        const {originalUrl } = req.body;
        console.log("REQ BODY:", req.body);
        const shortId = nanoid(6);
        const row = await Url.findOne({ originalUrl });
        if (row) {
            await logEvent("backend", "info", "controller", `URL already exists: ${originalUrl} -> ${row.shortId}`);
            return res.status(200).json({ shortUrl: `http://localhost:3000/api/${row.shortId}` });
        }
        const newUrl = new Url({ shortId, originalUrl });
        await newUrl.save();
        await logEvent("backend", "info", "controller", `Shortened URL: ${originalUrl} -> ${shortId}`);
        res.status(201).json({ shortUrl: `http://localhost:3000/api/${shortId}` });
    } catch (error) {
        await logEvent("backend", "error", "controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });        
    }
}

const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const row = await Url.findOne({ shortId });
    if (row) {
      await logEvent("backend", "info", "controller", `Redirecting to ${row.originalUrl}`);
      res.redirect(row.originalUrl);
    } else {        
      await logEvent("backend", "warn", "controller", `No URL found for ID: ${shortId}`);
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    await logEvent("backend", "fatal", "controller", error.message);
    res.status(400).json({ error: "Url not found" });
  }
}

export default {
  shortenUrl, redirectUrl
};