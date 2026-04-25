import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async create(req, res) {
        try {
            const { userId } = req.params;
            const post = await postService.createPost(userId, req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async renderNewForm(req, res) {
        try {
            const users = await userRepository.findAll();
            res.render("post-form", { post: null, users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async createFromWeb(req, res) {
        try {
            const { title, content, user, imageUrl, hashtags } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(h => h.trim()) : [];
            await postService.createPost(user, { title, content, imageUrl, hashtags: hashtagsArray });
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send("Error al crear: Asegúrate de cumplir con las restricciones del modelo (Título mín. 5, Contenido mín. 10). " + error.message);
        }
    }

    async renderEditForm(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            const users = await userRepository.findAll();
            res.render("post-form", { post, users });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async updateFromWeb(req, res) {
        try {
            const { title, content, imageUrl, hashtags } = req.body;
            const hashtagsArray = hashtags ? hashtags.split(",").map(h => h.trim()) : [];
            await postService.updatePost(req.params.id, { title, content, imageUrl, hashtags: hashtagsArray });
            res.redirect("/posts");
        } catch (error) {
            res.status(400).send("Error al actualizar: " + error.message);
        }
    }

    async deleteFromWeb(req, res) {
        try {
            await postService.deletePost(req.params.id);
            res.redirect("/posts");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new PostController();
