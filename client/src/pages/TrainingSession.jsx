import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Award, Clock, Target, CheckCircle, Circle, Camera, Video, BookOpen, Star, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';

const TrainingSession = () => {
  const [moduleId] = useState("1");
  const [activeTab, setActiveTab] = useState("video");
  const [sessionProgress, setSessionProgress] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [bestScore, setBestScore] = useState(87);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [postureAnalysis, setPostureAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [model, setModel] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [postureScore, setPostureScore] = useState(0);
  const [postureHistory, setPostureHistory] = useState([]);
  const [detector, setDetector] = useState(null);

  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const analysisIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Real soccer training videos (replace with your actual video URLs)
  const trainingModules = [
    {
      id: "1",
      title: "First Touch Fundamentals",
      description: "Master the art of receiving and controlling the ball under pressure with perfect first touches.",
      skillLevel: "Beginner",
      category: "Technical Skills",
      duration: "25 min",
      progress: 65,
      videoCount: 5,
      isCompleted: false,
      difficulty: 2,
      rating: 4.8,
      completedBy: "12.3k students"
    }
  ];

  const moduleVideos = [
    {
      id: "v1",
      title: "Introduction to First Touch",
      duration: 180,
      description: "Learn the basics of controlling the ball with your first touch",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-receives-soccer-ball-and-trains-1239-large.mp4"
    },
    {
      id: "v2",
      title: "Body Positioning",
      duration: 240,
      description: "Proper stance and body alignment for optimal ball control",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-training-with-ball-1261-large.mp4"
    },
    {
      id: "v3",
      title: "Surface Selection",
      duration: 200,
      description: "When to use different parts of your foot",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-training-with-ball-1261-large.mp4"
    },
    {
      id: "v4",
      title: "Under Pressure",
      duration: 280,
      description: "Maintaining control when defenders are closing in",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-receives-soccer-ball-and-trains-1239-large.mp4"
    },
    {
      id: "v5",
      title: "Advanced Techniques",
      duration: 320,
      description: "Master-level first touch variations",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-training-with-ball-1261-large.mp4"
    }
  ];

  const currentModule = trainingModules.find((module) => module.id === moduleId);
  const currentVideo = moduleVideos[currentVideoIndex];

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading TensorFlow model...');
        await tf.ready();
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
          enableSmoothing: true
        };
        const movenet = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );
        setDetector(movenet);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();

    return () => {
      if (detector) {
        detector.dispose();
      }
    };
  }, []);

  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user'
        }
      });

      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }

      setCameraStream(stream);
      setCameraEnabled(true);

      if (sessionStarted) {
        startPostureAnalysis();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const disableCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraEnabled(false);
    stopPostureAnalysis();
  };

  const startPostureAnalysis = () => {
    if (!detector || !cameraEnabled) return;

    setIsAnalyzing(true);
    analyzePosture();
  };

  const stopPostureAnalysis = () => {
    setIsAnalyzing(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const analyzePosture = async () => {
    if (!cameraRef.current || !canvasRef.current || !detector) {
      animationFrameRef.current = requestAnimationFrame(analyzePosture);
      return;
    }

    try {
      const poses = await detector.estimatePoses(cameraRef.current);
      
      if (poses && poses.length > 0) {
        const keypoints = poses[0].keypoints;
        const analysis = analyzeKeypoints(keypoints);
        
        setPostureAnalysis(analysis);
        setPostureScore(analysis.overallScore);

        setPostureHistory(prev => {
          const newHistory = [...prev, {
            time: Date.now(),
            score: analysis.overallScore
          }].slice(-20);
          return newHistory;
        });

        drawKeypoints(keypoints);
      }
    } catch (error) {
      console.error('Error analyzing posture:', error);
    }

    animationFrameRef.current = requestAnimationFrame(analyzePosture);
  };

  const analyzeKeypoints = (keypoints) => {
    // Simplified posture analysis based on keypoints
    // In a real app, you'd have more sophisticated analysis
    const nose = keypoints.find(k => k.name === 'nose');
    const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
    const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
    const leftHip = keypoints.find(k => k.name === 'left_hip');
    const rightHip = keypoints.find(k => k.name === 'right_hip');
    const leftKnee = keypoints.find(k => k.name === 'left_knee');
    const rightKnee = keypoints.find(k => k.name === 'right_knee');

    // Calculate shoulder alignment
    const shoulderYDiff = Math.abs(leftShoulder.y - rightShoulder.y);
    const shoulderAlignment = shoulderYDiff < 20 ? 'aligned' : 'uneven';

    // Calculate head position
    const headPosition = nose.y > leftShoulder.y - 30 ? 'good' : 'tilted';

    // Calculate body balance
    const hipYDiff = Math.abs(leftHip.y - rightHip.y);
    const bodyBalance = hipYDiff < 15 ? 'centered' : 'off-balance';

    // Calculate knee angles for foot position
    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftShoulder);
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightShoulder);
    const footPosition = (leftKneeAngle > 120 && rightKneeAngle > 120) ? 'correct' : 'needs-adjustment';

    // Calculate overall score (simplified)
    let score = 70; // base score
    if (shoulderAlignment === 'aligned') score += 10;
    if (headPosition === 'good') score += 5;
    if (bodyBalance === 'centered') score += 10;
    if (footPosition === 'correct') score += 5;
    score = Math.min(100, score);

    return {
      headPosition,
      shoulderAlignment,
      bodyBalance,
      footPosition,
      overallScore: Math.floor(score)
    };
  };

  const calculateAngle = (a, b, c) => {
    const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
    const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
    return Math.acos((ab * ab + bc * bc - ac * ac) / (2 * ab * bc)) * (180 / Math.PI);
  };

  const drawKeypoints = (keypoints) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const video = cameraRef.current;
    
    if (!video || !canvas) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Draw keypoints
    keypoints.forEach(keypoint => {
      if (keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      }
    });
    
    // Draw skeleton (simplified)
    const connections = [
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_elbow'],
      ['left_elbow', 'left_wrist'],
      ['right_shoulder', 'right_elbow'],
      ['right_elbow', 'right_wrist'],
      ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'],
      ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle']
    ];
    
    connections.forEach(([start, end]) => {
      const startPoint = keypoints.find(k => k.name === start);
      const endPoint = keypoints.find(k => k.name === end);
      
      if (startPoint && endPoint && startPoint.score > 0.3 && endPoint.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    let interval;
    if (sessionStarted) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
        if (sessionProgress > 0) {
          setSessionScore(Math.min(100, Math.floor(sessionProgress * 0.8 + Math.random() * 10)));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionStarted, sessionProgress]);

  useEffect(() => {
    let interval;
    if (isVideoPlaying && sessionStarted) {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }
      
      interval = setInterval(() => {
        if (videoRef.current) {
          const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setVideoProgress(progress);
          
          const videoContribution = 20;
          const currentVideoProgress = (progress / 100) * videoContribution;
          const previousVideosProgress = currentVideoIndex * videoContribution;
          setSessionProgress(previousVideosProgress + currentVideoProgress);

          if (progress >= 100 && currentVideoIndex < moduleVideos.length - 1) {
            setTimeout(() => {
              setCurrentVideoIndex(prev => prev + 1);
              setVideoProgress(0);
              setIsVideoPlaying(false);
            }, 1000);
          }
        }
      }, 100);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, sessionStarted, currentVideoIndex]);

  useEffect(() => {
    if (cameraEnabled && sessionStarted) {
      startPostureAnalysis();
    } else {
      stopPostureAnalysis();
    }

    return () => stopPostureAnalysis();
  }, [cameraEnabled, sessionStarted]);

  useEffect(() => {
    return () => {
      disableCamera();
      stopPostureAnalysis();
    };
  }, []);

  const handleVideoToggle = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const startSession = () => {
    setSessionStarted(true);
    setSessionTime(0);
    setSessionProgress(0);
    setCurrentVideoIndex(0);
    setVideoProgress(0);
    setPostureHistory([]);
  };

  const endSession = () => {
    setSessionStarted(false);
    setIsVideoPlaying(false);
    stopPostureAnalysis();
    if (sessionScore > bestScore) {
      setBestScore(sessionScore);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetSession = () => {
    setSessionProgress(0);
    setCurrentVideoIndex(0);
    setVideoProgress(0);
    setSessionScore(0);
    setIsVideoPlaying(false);
    setPostureHistory([]);
    setPostureAnalysis(null);
  };

  const getPostureColor = (value) => {
    if (value === 'good' || value === 'aligned' || value === 'centered' || value === 'correct') {
      return 'text-green-600 bg-green-100';
    }
    return 'text-yellow-600 bg-yellow-100';
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen().catch(e => console.error(e));
    }
    setIsFullscreen(!isFullscreen);
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
          <p className="text-gray-600 mb-6">The training module you're looking for doesn't exist.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Training
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Training</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-lg font-semibold text-gray-900">Training Session</span>
            </div>

            <div className="flex items-center space-x-6">
              {sessionStarted && (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{formatTime(sessionTime)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">{sessionProgress.toFixed(0)}%</span>
                  </div>
                  {postureScore > 0 && (
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-900">Posture: {postureScore}%</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex space-x-2">
                {sessionStarted && (
                  <button
                    onClick={resetSession}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                )}
                <button
                  onClick={sessionStarted ? endSession : startSession}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    sessionStarted
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {sessionStarted ? "End Session" : "Start Session"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{currentModule.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{currentModule.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {currentModule.skillLevel}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                    {currentModule.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {currentModule.duration}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                    {currentModule.videoCount} videos
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{currentModule.rating}</span>
                    <span className="text-sm text-gray-500">({currentModule.completedBy})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 mb-1">{currentModule.progress}%</div>
                <div className="text-sm text-gray-500">Overall Progress</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Session Progress</span>
                <span className="text-sm font-medium text-gray-900">{sessionProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {sessionStarted && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{formatTime(sessionTime)}</div>
              <div className="text-sm text-gray-500">Session Time</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{sessionScore}%</div>
              <div className="text-sm text-gray-500">Current Score</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{bestScore}%</div>
              <div className="text-sm text-gray-500">Best Score</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{Math.floor(sessionProgress / 20)}</div>
              <div className="text-sm text-gray-500">Videos Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
              <div className={`text-2xl font-bold mb-2 ${postureScore >= 80 ? 'text-green-600' : postureScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {postureScore}%
              </div>
              <div className="text-sm text-gray-500">Posture Score</div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("video")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "video"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>Training Video</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("camera")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "camera"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>AI Posture Analysis</span>
                  {cameraEnabled && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("sidebyside")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "sidebyside"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Maximize2 className="w-4 h-4" />
                  <span>Side by Side</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Overview</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "video" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
                    {currentVideo ? (
                      <>
                        <video
                          ref={videoRef}
                          src={currentVideo.videoUrl}
                          className="w-full h-full object-cover"
                          loop
                          onClick={handleVideoToggle}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          {!isVideoPlaying && (
                            <button
                              onClick={handleVideoToggle}
                              className="bg-black bg-opacity-50 rounded-full p-4 text-white hover:bg-opacity-70 transition-all"
                            >
                              <Play className="w-8 h-8" />
                            </button>
                          )}
                        </div>
                        {sessionStarted && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white text-sm">Video {currentVideoIndex + 1} of {moduleVideos.length}</span>
                              <span className="text-white text-sm">{videoProgress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${videoProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Video className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Videos Available</h3>
                          <p>Training videos for this module are coming soon!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Video Progress</h3>
                    <div className="space-y-3">
                      {moduleVideos.map((video, index) => (
                        <div
                          key={video.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            index === currentVideoIndex
                              ? "bg-blue-100 border border-blue-200"
                              : "bg-white hover:bg-gray-50"
                          }`}
                          onClick={() => sessionStarted && setCurrentVideoIndex(index)}
                        >
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            index < currentVideoIndex || (index === currentVideoIndex && videoProgress >= 100)
                              ? "bg-green-500 text-white"
                              : index === currentVideoIndex
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                            {index < currentVideoIndex || (index === currentVideoIndex && videoProgress >= 100) ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                            <p className="text-xs text-gray-500">
                              {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-4">Key Points</h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Watch the demonstration carefully</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Practice the technique slowly first</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Focus on proper form over speed</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Use the AI analysis for feedback</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "camera" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Live Camera Feed</h3>
                    <button
                      onClick={cameraEnabled ? disableCamera : enableCamera}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        cameraEnabled
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {cameraEnabled ? "Disable Camera" : "Enable Camera"}
                    </button>
                  </div>

                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
                    {cameraEnabled ? (
                      <>
                        <video
                          ref={cameraRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        />
                        {isAnalyzing && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Analyzing
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Camera className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Camera Disabled</h3>
                          <p>Enable the camera to start posture analysis</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Posture Analysis</h3>
                  {postureAnalysis ? (
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-500">Head Position</span>
                            <span className={`text-sm font-medium ${getPostureColor(postureAnalysis.headPosition).split(' ')[0]}`}>
                              {postureAnalysis.headPosition}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${getPostureColor(postureAnalysis.headPosition)}`}>
                            <div className="h-full rounded-full bg-opacity-75"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-500">Shoulder Alignment</span>
                            <span className={`text-sm font-medium ${getPostureColor(postureAnalysis.shoulderAlignment).split(' ')[0]}`}>
                              {postureAnalysis.shoulderAlignment}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${getPostureColor(postureAnalysis.shoulderAlignment)}`}>
                            <div className="h-full rounded-full bg-opacity-75"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-500">Body Balance</span>
                            <span className={`text-sm font-medium ${getPostureColor(postureAnalysis.bodyBalance).split(' ')[0]}`}>
                              {postureAnalysis.bodyBalance}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${getPostureColor(postureAnalysis.bodyBalance)}`}>
                            <div className="h-full rounded-full bg-opacity-75"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-500">Foot Position</span>
                            <span className={`text-sm font-medium ${getPostureColor(postureAnalysis.footPosition).split(' ')[0]}`}>
                              {postureAnalysis.footPosition}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${getPostureColor(postureAnalysis.footPosition)}`}>
                            <div className="h-full rounded-full bg-opacity-75"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                      <div className="text-center text-gray-400">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Analysis Data</h3>
                        <p>Enable the camera and start the session to see posture analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "sidebyside" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Side by Side Training</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={cameraEnabled ? disableCamera : enableCamera}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        cameraEnabled
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {cameraEnabled ? "Disable Camera" : "Enable Camera"}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    {currentVideo ? (
                      <>
                        <video
                          ref={videoRef}
                          src={currentVideo.videoUrl}
                          className="w-full h-full object-cover"
                          loop
                          onClick={handleVideoToggle}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          {!isVideoPlaying && (
                            <button
                              onClick={handleVideoToggle}
                              className="bg-black bg-opacity-50 rounded-full p-4 text-white hover:bg-opacity-70 transition-all"
                            >
                              <Play className="w-8 h-8" />
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Video className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">No Videos Available</h3>
                          <p>Training videos for this module are coming soon!</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                    {cameraEnabled ? (
                      <>
                        <video
                          ref={cameraRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        />
                        {isAnalyzing && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Analyzing
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Camera className="w-16 h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">Camera Disabled</h3>
                          <p>Enable the camera to see your posture</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{formatTime(sessionTime)}</div>
                      <div className="text-sm text-gray-500">Session Time</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 mb-2">{sessionScore}%</div>
                      <div className="text-sm text-gray-500">Current Score</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{bestScore}%</div>
                      <div className="text-sm text-gray-500">Best Score</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Posture History</h3>
                  {postureHistory.length > 0 ? (
                    <div className="space-y-4">
                      {postureHistory.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500">
                            {new Date(entry.time).toLocaleTimeString()}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{entry.score}%</span>
                            <div className={`w-20 h-2 rounded-full ${entry.score >= 80 ? 'bg-green-500' : entry.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                      <div className="text-center text-gray-400">
                        <BookOpen className="w-12 h-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Posture History</h3>
                        <p>Start a session to record posture history</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSession;