import express from 'express';
import urlController  from '../controllers/url.controllers.js';

const router = express.Router();
const { shortenUrl, redirectUrl } = urlController;

router.route('/shorten').post(shortenUrl);
router.route('/:id').get(redirectUrl);

export default router;