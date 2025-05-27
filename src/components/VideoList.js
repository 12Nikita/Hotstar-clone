import { useEffect, useState } from "react";
import {getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const VideoList = () => {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    const fetchVideoUrls = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'movies/'); // Folder where your videos are stored

      try {
        const res = await listAll(listRef);
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));

        // Resolve all promises to get the video URLs
        const urls = await Promise.all(urlPromises);
        setVideoUrls(urls);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    };

    fetchVideoUrls();
  }, []);

  return (
    <div>
      <h2>Videos</h2>
      <ul>
        {videoUrls.map((url, index) => (
          <li key={index}>
            <video width="320" height="240" controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
