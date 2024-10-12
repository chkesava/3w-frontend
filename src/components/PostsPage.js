import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch posts
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://threew-backend.onrender.com/v1/posts/all', {
                    withCredentials: true // Ensures cookies are sent with the request
                });

                if (response.data.status === 'success') {
                    setPosts(response.data.data);
                } else {
                    setError('Unauthorized or no posts available');
                }
            } catch (err) {
                setError('You dont have access to see posts');
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-extrabold text-center text-white mb-10">
                    All Posts
                </h1>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                                <img
                                    src={post.image_url}
                                    alt={post.name}
                                    className="w-full h-48 object-cover rounded-t-lg transform transition duration-500 hover:scale-110"
                                />
                                <div className="p-6">
                                    <p className="text-lg font-semibold text-gray-900 truncate hover:text-indigo-500 transition duration-300">
                                        {post.name}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2 hover:text-indigo-400 transition duration-300">
                                        {post.social_media_handle}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-white">No posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
