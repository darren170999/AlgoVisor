import React, { useState, useEffect } from "react";

function VideoPlayer({filename}: {filename: string}) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to store the video URL
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        fetchVideo();
    }, []); // Fetch video when the component mounts
    
    const fetchVideo = async () => {
        try {
        const response = await fetch(`https://algovisor.onrender.com/course/video/${filename}`);
        if (response.ok) {
            const videoBlob = await response.blob();
            const videoObjectUrl = URL.createObjectURL(videoBlob);
            setVideoUrl(videoObjectUrl);
        } else {
            console.error("Failed to fetch video:", response.statusText);
        }
        } catch (error) {
        console.error("Error fetching video:", error);
        } finally {
        setLoading(false);
        }
    };
    
    return (
        <div>
        <h1>Video Player</h1>
        {loading ? (
            <p>Loading...</p>
        ) : videoUrl ? (
            <video controls width="600" height="400">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        ) : (
            <p>No video available</p>
        )}
        </div>
    );
    }
    
    export default VideoPlayer;
