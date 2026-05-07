import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { token } = useAuth();

  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStories();

    if (token) {
      fetchMe();
    }
  }, [token]);

  const fetchStories = async () => {
    const res = await api.get("/stories");
    setStories(res.data.stories);
    setLoading(false);
  };

  const fetchMe = async () => {
    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookmarks(
      res.data.user.bookmarks.map(
        (item) => item._id || item
      )
    );
  };

  const toggleBookmark = async (storyId) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await api.post(
      `/stories/${storyId}/bookmark`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBookmarks(res.data.bookmarks);
  };
if (loading) return <p>Loading...</p>;
  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h1>Top Hacker News Stories</h1>

        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onBookmark={toggleBookmark}
            isBookmarked={bookmarks.includes(
              story._id
            )}
          />
        ))}
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

export default Home;