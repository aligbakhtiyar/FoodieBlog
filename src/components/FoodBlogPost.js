import React from 'react';

const FoodBlogPost = ({ post }) => {
  if (!post) return null;
  const { thumbnail_image, name, category, instructions, tags , ingredients, more, comments} = post[0];
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Thumbnail Image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={thumbnail_image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Title */}
      <h1 className="text-3xl font-bold mt-6">{name}</h1>

      {/* Category */}
      <p className="text-sm text-gray-500 mt-2">{category}</p>

      {/* Instructions */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Instructions</h2>
        <p className="mt-2 text-gray-700">{instructions}</p>
      </div>

      {/* Tags */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Tags</h2>
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <ul className="mt-2 list-disc list-inside">
          {ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.quantity} of {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      {/* More Info */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">More Information</h2>
        <ul className="mt-2">
          <li><strong>Preparation Time:</strong> {more.prep_time}</li>
          <li><strong>Cooking Time:</strong> {more.cook_time}</li>
          <li><strong>Servings:</strong> {more.servings}</li>
          <li><strong>Difficulty:</strong> {more.difficulty}</li>
          <li><strong>Source:</strong> <a href="#" className="text-blue-500 underline">{more.source}</a></li>
        </ul>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-2">
          {comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-800"><strong>{comment.user}:</strong></p>
              <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodBlogPost;
