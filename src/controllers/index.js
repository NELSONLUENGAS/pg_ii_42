const db = require('../database/config');
const { updatePost } = require('../querys');

const updatePostController = async (req, res, next) => {
	const { data } = req;
	const { post, postExist } = data;

	try {
		const titulo = req.body.titulo || post.titulo;
		const img = req.body.img || post.img;
		const descripcion = req.body.descripcion || post.descripcion;

		let likes;

		if (req.body.likes !== undefined && req.body.likes === true) {
			likes = Number(post.likes + 1);
			console.log(likes, 'if');
		} else if (req.body.likes != undefined && req.body.likes === false) {
			if (post.likes == null) {
				likes = 0;
			} else if (post.likes > 0) {
				likes = Number(post.likes - 1);
			} else {
				likes = 0;
			}
		} else {
			likes = Number(post.likes);
		}

		const values = [titulo, img, descripcion, likes, post.id];

		if (postExist) {
			const post_query = await db.query(updatePost, values);
			const postUpdated = post_query.rows[0];
			if (post) {
				res.status(200).json({
					status: 'Success',
					msg: 'Post updated',
					post: postUpdated,
				});
			}
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	updatePostController,
};
