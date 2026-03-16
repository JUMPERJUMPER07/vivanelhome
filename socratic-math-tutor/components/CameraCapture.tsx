import React, { useRef, useEffect, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
  t?: {
    cameraError?: string;
  };
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose, t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      setError('');
      try {
        // First try to get the rear camera (ideal for scanning docs)
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
      } catch (envError) {
        console.warn("Environment camera not found, trying fallback.", envError);
        try {
           // Fallback to any available video device (e.g. webcam)
           stream = await navigator.mediaDevices.getUserMedia({
             video: true
           });
        } catch (anyError) {
           console.error("Error accessing camera:", anyError);
           setError(t?.cameraError || "Could not access camera. Please check permissions or ensure a camera is connected.");
           return;
        }
      }

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        onCapture(imageData);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between animate-fade-in">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
        <span className="text-white font-medium">Take a photo of your problem</span>
        <button 
          onClick={onClose}
          className="bg-black/40 text-white rounded-full p-2 backdrop-blur-md hover:bg-black/60 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative flex items-center justify-center bg-black">
         {error ? (
           <div className="text-white text-center p-6">
             <p className="text-red-400 mb-2">{error}</p>
             <button onClick={onClose} className="text-indigo-300 underline">Close Camera</button>
           </div>
         ) : (
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             className="w-full h-full object-cover"
           />
         )}
         <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center">
        {!error && (
          <button 
            onClick={takePhoto}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group focus:outline-none"
            aria-label="Capture photo"
          >
            <div className="w-16 h-16 bg-white rounded-full group-active:scale-90 transition-transform duration-100" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
