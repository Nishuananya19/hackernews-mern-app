function StoryCard({
  story,
  onBookmark,
  isBookmarked,
}) {
  return (
    <div style={styles.card}>
      <a
        href={story.url}
        target="_blank"
        rel="noreferrer"
        style={styles.title}
      >
        {story.title}
      </a>

      <p>Points: {story.points}</p>
      <p>Author: {story.author}</p>
      <p>Posted: {story.postedAt}</p>

      {onBookmark && (
        <button
          onClick={() =>
            onBookmark(story._id)
          }
          style={styles.button}
        >
          {isBookmarked
            ? "Remove Bookmark"
            : "Bookmark"}
        </button>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    textDecoration: "none",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    cursor: "pointer",
  },
};

export default StoryCard;