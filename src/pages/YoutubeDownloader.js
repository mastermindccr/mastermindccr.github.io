import { useState } from 'react';

import './YoutubeDownloader.css';

const YoutubeDownloader = () => {
	const [url, setUrl] = useState('');
	const [format, setFormat] = useState('mp3');
	const [progress, setProgress] = useState(0);
	const [isDownloading, setIsDownloading] = useState(false);

	const backend_url = process.env.REACT_APP_HTTP_SERVER;

	const handleDownload = async () => {
		if (!url.trim()) {
			alert('Please enter a YouTube URL');
			return;
		}

		setIsDownloading(true);

		try {
			const download_response = await fetch(`${backend_url}/download`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Expose-Headers': 'Content-Disposition'
				},
				body: JSON.stringify({
					url: url,
					format: format
				})
			});

			if (download_response.status !== 200) {
				alert(await download_response.text());
			}
			else {
				const total_bytes = parseInt(download_response.headers.get('content-length'), 10);
				const title_data = download_response.headers.get('Content-Disposition').split('filename=')[1].replace(/"/g, '');

				const stream = [];
				let loaded_bytes = 0;

				const reader = download_response.body.getReader();

				while (true) {
					const chunk = await reader.read();
					if(chunk.done) break;
					if(!chunk.value) continue;
					stream.push(chunk.value);
					loaded_bytes += chunk.value.byteLength;
					setProgress(Math.round(loaded_bytes/total_bytes));
				}

				const videoBlob = new Blob(stream);
				const videoUrl = URL.createObjectURL(videoBlob);
				const a = document.createElement('a');
				a.href = videoUrl;
				a.download = title_data;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		}
		catch (error) {
			console.log(error);
			alert('Failed to download video. Please try again.');
		}

		setProgress(0);
		setIsDownloading(false);
	}

	return (
		<div className="main-container">
			<h2>YouTube Downloader</h2>
			<div className="input-container">
				<label htmlFor="url">YouTube URL:</label>
				<input
					className="url-input"
					id="url"
					type="text"
					placeholder="Enter YouTube video URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>

			<div className="format-select-div">
				<label htmlFor="format">Format:</label>
				<select
					className="format-select-dropdown"
					id="format"
					value={format}
					onChange={(e) => setFormat(e.target.value)}
				>
					<option value="mp3">MP3 (Audio)</option>
					<option value="mp4">MP4 (Video)</option>
					<option value="wav">WAV (Audio)</option>
				</select>
			</div>

			<button
                className="download-button"
                onClick={handleDownload}
                disabled={isDownloading} // Disable button during download
            >
                {isDownloading ? 'Downloading...' : 'Download'}
            </button>

            {isDownloading ? 
				progress !== 0 ? (
					<div className="progress-container">
						<progress className="progress-bar" value={progress} max="100" />
						<span>{Math.round(progress)}%</span>
					</div>
				) : (
						<div className="preparing-container">
						<div className="spinner"></div>
						<span className="preparing-text">Preparing video...</span>
						</div>
					)
			: null}
		</div>
	);
};

export default YoutubeDownloader;
