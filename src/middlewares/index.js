const db = require('../database/config');
const { verifyPostExist } = require('../querys');

const updatePostMiddleware = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (id) {
			const values = [id];
			const query_result = await db.query(verifyPostExist, values);
			const post = query_result.rows[0];

			if (!post) {
				return res.status(400).json({
					status: 'Bad Request',
					msg: 'El ID no existe',
				});
			} else {
				req.data = {
					postExist: true,
					post,
				};
				next();
			}
		} else {
			return res.status(400).json({
				status: 'Bad Request',
				msg: 'El ID es requerido',
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	updatePostMiddleware,
};
