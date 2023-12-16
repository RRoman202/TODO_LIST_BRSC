const url = `/api/tasks`;
export const getTasks = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const options = {
    method: "GET",
  };
  const result = await fetch(url, { ...options, headers });

  if (result.ok) {
    const posts = await result.json();

    return posts
      .filter(
        (post) => post.userId === parseInt(localStorage.getItem("userid"))
      )
      .sort((a, b) => (a.id > b.id ? -1 : 1));
  }
  return [];
};
