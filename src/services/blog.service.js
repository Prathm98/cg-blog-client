import axios from "axios"
import { restURL } from "../utils/configProvider";

// Fetches the blogs from server
export const getBlogs = async () => {
    try {
        const blogs = await axios.get(restURL + `/api/blog`);
        return blogs.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fetches the blog by id from server
export const getBlogById = async (blog_id) => {
    try {
        const blogs = await axios.get(restURL + `/api/blog/${blog_id}`);
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

// likes the blog
export const likeDislikeBlog = async (blog_id, doLike) => {
    try {
        const blog = await axios.post(restURL + `/api/blog/${blog_id}/like`, {
            doLike
        });

        return blog.data.statusCode === 200;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// creates the comment
export const postComment = async (blog_id, message) => {
    try {
        const blog = await axios.post(restURL + `/api/blog/${blog_id}/comment`, {
            message
        });

        return blog.data.statusCode === 200;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Fetches the blogs by username from server
export const getBlogsByUserName = async (username) => {
    try {
        const blogs = await axios.get(restURL + `/api/blog/user/${username}`);
        return blogs.data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}