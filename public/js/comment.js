const commentFormHandler = async (event) => {
    event.preventDefault();
  const id = window.location.href.split('/')[window.location.href.split('/').length-1];
  console.log(id);
    // Collect values from the comment form
    const user_comment = document.querySelector('#new-comment').value.trim();
  
    if (user_comment) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/comments/${id}`, {
        method: 'POST',
        body: JSON.stringify({ user_comment }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // If successful, redirect the browser to the blog page
        document.location.replace(`/blog/${id}`);
      } else {
        alert(response.statusText);
      }
    }
  };

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const commentId = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        console.log(result);
    if (response.ok) {
      const blogId = window.location.href.split('/')[window.location.href.split('/').length-1];
        document.location.replace(`/blog/${blogId}`);
    } else {
        alert("Cannot delete someone else's comment!");
    }
}
};


document
.querySelector('.new-comment-form')
.addEventListener('submit', commentFormHandler);

document
  .querySelector('.comment-list')
  .addEventListener('click', delButtonHandler);