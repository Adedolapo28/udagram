import { Router, Request, Response } from 'express';
import { deleteLocalFiles } from '../../../util/util';
import { filterImageFromURL } from '../../../util/util';
import { isUrlValid } from '../../../util/util';

const router: Router = Router();

// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// https://media.istockphoto.com/photos/three-thinkers-sitting-in-front-of-a-computer-screen-picture-id1271759928
router.get('/filteredimage', async ( req, res ) => {
    const { image_url } = req.query;

    if (!image_url || !isUrlValid(image_url)) {
        res.status(422).send({
            message: 'Url is not valid',
        });
    }

    try {
        const filteredImagepath = await filterImageFromURL(image_url);
        console.log('**************bb', filteredImagepath);
        
        res.sendFile(filteredImagepath, () => {
            deleteLocalFiles([filteredImagepath]);
        });
    } catch (error) {
        console.log('**************', error);
        res.status(422).send({
            message: 'Url dos not point to a valid image',
            error: error,
        });
    }

});

export const ImageRouter: Router = router;
