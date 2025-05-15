import React from 'react';

const BlogRequestsList = ({ userBlogs }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return 'Published';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {userBlogs.length === 0 ? (
        <p className="text-gray text-center">You have no blog requests.</p>
      ) : (
        userBlogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center justify-between p-4 rounded-xl bg-sub-dark card"
          >
            <div>
              <h3 className="text-medium font-semibold text-white">{blog.title}</h3>
              <p className="text-small text-gray">{blog.category}</p>
            </div>
            <span
              className={`text-small px-3 py-1 rounded-full ${
                blog.status === 'accepted'
                  ? 'bg-green-900'
                  : blog.status === 'pending'
                  ? 'bg-yellow-900'
                  : 'bg-red-900'
              } text-white`}
            >
              {getStatusText(blog.status)}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogRequestsList;