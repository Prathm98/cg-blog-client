import axios from "axios"
import { restURL } from "../utils/configProvider";

// Fetches the blogs from server
export const getBlogs = async () => {
    try {
        const blogs = await axios.get(restURL + '/api/blog');
        return blogs.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// creates the blog
export const postBlog = async (title, description) => {
    try {
        const blog = await axios.post(restURL + '/api/blog', {
            title, description
        });

        return blog.data.statusCode === 200;
    } catch (error) {
        console.log(error);
        return null;
    }
}