import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

function Bookmarks() {
  const { token } = useAuth();

  const [stories, setStories] = useState([]);

  useEffect(() => {
  if (token) {
    fetchBookmarks();
  }
}, [token]);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStories(res.data.user.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBookmark = async (storyId) => {
    await api.post(
      `/stories/${storyId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBookmarks();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>My Bookmarks</h1>

        {stories.length === 0 ? (
          <p>No bookmarks yet</p>
        ) : (
          stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onBookmark={toggleBookmark}
              isBookmarked={true}
            />
          ))
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "800px",
    margin: "30px auto",
  },
};

export default Bookmarks;