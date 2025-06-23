// import { useState, useEffect, useRef } from "react";
// import { ArrowLeft, Play, Pause, RotateCcw, Award, Clock, Target, CheckCircle, Circle, Camera, Video, BookOpen, Star } from "lucide-react";

// const TrainingSession = () => {
//   const [moduleId] = useState("1"); // Simulated route param
//   const [activeTab, setActiveTab] = useState("video");
//   const [sessionProgress, setSessionProgress] = useState(0);
//   const [sessionStarted, setSessionStarted] = useState(false);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [sessionTime, setSessionTime] = useState(0);
//   const [sessionScore, setSessionScore] = useState(0);
//   const [bestScore, setBestScore] = useState(87);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [videoProgress, setVideoProgress] = useState(0);
//   const videoRef = useRef(null);

//   const trainingModules = [
//     {
//       id: "1",
//       title: "First Touch Fundamentals",
//       description: "Master the art of receiving and controlling the ball under pressure with perfect first touches.",
//       skillLevel: "Beginner",
//       category: "Technical Skills",
//       duration: "25 min",
//       progress: 65,
//       videoCount: 5,
//       isCompleted: false,
//       difficulty: 2,
//       rating: 4.8,
//       completedBy: "12.3k students"
//     }
//   ];

//   const moduleVideos = [
//     {
//       id: "v1",
//       title: "Introduction to First Touch",
//       duration: 180,
//       description: "Learn the basics of controlling the ball with your first touch"
//     },
//     {
//       id: "v2", 
//       title: "Body Positioning",
//       duration: 240,
//       description: "Proper stance and body alignment for optimal ball control"
//     },
//     {
//       id: "v3",
//       title: "Surface Selection",
//       duration: 200,
//       description: "When to use different parts of your foot"
//     },
//     {
//       id: "v4",
//       title: "Under Pressure",
//       duration: 280,
//       description: "Maintaining control when defenders are closing in"
//     },
//     {
//       id: "v5",
//       title: "Advanced Techniques",
//       duration: 320,
//       description: "Master-level first touch variations"
//     }
//   ];

//   const currentModule = trainingModules.find((module) => module.id === moduleId);
//   const currentVideo = moduleVideos[currentVideoIndex];

//   // Session timer
//   useEffect(() => {
//     let interval;
//     if (sessionStarted) {
//       interval = setInterval(() => {
//         setSessionTime((prev) => prev + 1);
//         // Simulate score progression
//         if (sessionProgress > 0) {
//           setSessionScore(Math.min(100, Math.floor(sessionProgress * 0.8 + Math.random() * 10)));
//         }
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [sessionStarted, sessionProgress]);

//   // Auto-progress video simulation
//   useEffect(() => {
//     let interval;
//     if (isVideoPlaying && sessionStarted) {
//       interval = setInterval(() => {
//         setVideoProgress(prev => {
//           const newProgress = Math.min(100, prev + 0.5);
          
//           // Update session progress
//           const videoContribution = 20; // Each video contributes 20% to total progress
//           const currentVideoProgress = (newProgress / 100) * videoContribution;
//           const previousVideosProgress = currentVideoIndex * videoContribution;
//           setSessionProgress(previousVideosProgress + currentVideoProgress);
          
//           // Auto-advance to next video when current one ends
//           if (newProgress >= 100 && currentVideoIndex < moduleVideos.length - 1) {
//             setTimeout(() => {
//               setCurrentVideoIndex(prev => prev + 1);
//               setVideoProgress(0);
//               setIsVideoPlaying(false);
//             }, 1000);
//           }
          
//           return newProgress;
//         });
//       }, 100);
//     }
//     return () => clearInterval(interval);
//   }, [isVideoPlaying, sessionStarted, currentVideoIndex]);

//   const handleVideoToggle = () => {
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   const startSession = () => {
//     setSessionStarted(true);
//     setSessionTime(0);
//     setSessionProgress(0);
//     setCurrentVideoIndex(0);
//     setVideoProgress(0);
//   };

//   const endSession = () => {
//     setSessionStarted(false);
//     setIsVideoPlaying(false);
//     if (sessionScore > bestScore) {
//       setBestScore(sessionScore);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const resetSession = () => {
//     setSessionProgress(0);
//     setCurrentVideoIndex(0);
//     setVideoProgress(0);
//     setSessionScore(0);
//     setIsVideoPlaying(false);
//   };

//   if (!currentModule) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h2>
//           <p className="text-gray-600 mb-6">The training module you're looking for doesn't exist.</p>
//           <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//             Back to Training
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Navigation */}
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-4">
//               <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
//                 <ArrowLeft className="w-5 h-5" />
//                 <span>Back to Training</span>
//               </button>
//               <div className="h-6 w-px bg-gray-300"></div>
//               <span className="text-lg font-semibold text-gray-900">Training Session</span>
//             </div>

//             <div className="flex items-center space-x-6">
//               {sessionStarted && (
//                 <div className="flex items-center space-x-6">
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-4 h-4 text-gray-500" />
//                     <span className="text-sm font-medium text-gray-900">{formatTime(sessionTime)}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Target className="w-4 h-4 text-green-500" />
//                     <span className="text-sm font-medium text-gray-900">{sessionProgress.toFixed(0)}%</span>
//                   </div>
//                 </div>
//               )}
//               <div className="flex space-x-2">
//                 {sessionStarted && (
//                   <button
//                     onClick={resetSession}
//                     className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <RotateCcw className="w-4 h-4" />
//                     <span>Reset</span>
//                   </button>
//                 )}
//                 <button
//                   onClick={sessionStarted ? endSession : startSession}
//                   className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                     sessionStarted
//                       ? "bg-red-600 text-white hover:bg-red-700"
//                       : "bg-green-600 text-white hover:bg-green-700"
//                   }`}
//                 >
//                   {sessionStarted ? "End Session" : "Start Session"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Module Header */}
//         <div className="bg-white rounded-xl shadow-sm border mb-8">
//           <div className="p-6">
//             <div className="flex justify-between items-start mb-6">
//               <div className="flex-1">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-3">{currentModule.title}</h1>
//                 <p className="text-lg text-gray-600 mb-4">{currentModule.description}</p>
//                 <div className="flex flex-wrap gap-3">
//                   <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
//                     {currentModule.skillLevel}
//                   </span>
//                   <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
//                     {currentModule.category}
//                   </span>
//                   <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
//                     {currentModule.duration}
//                   </span>
//                   <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
//                     {currentModule.videoCount} videos
//                   </span>
//                   <div className="flex items-center space-x-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="text-sm font-medium text-gray-700">{currentModule.rating}</span>
//                     <span className="text-sm text-gray-500">({currentModule.completedBy})</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-3xl font-bold text-green-600 mb-1">{currentModule.progress}%</div>
//                 <div className="text-sm text-gray-500">Overall Progress</div>
//               </div>
//             </div>

//             {/* Session Progress Bar */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm font-medium text-gray-700">Session Progress</span>
//                 <span className="text-sm font-medium text-gray-900">{sessionProgress.toFixed(0)}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-3">
//                 <div 
//                   className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
//                   style={{ width: `${sessionProgress}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Session Stats */}
//         {sessionStarted && (
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//               <div className="text-2xl font-bold text-blue-600 mb-2">{formatTime(sessionTime)}</div>
//               <div className="text-sm text-gray-500">Session Time</div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//               <div className="text-2xl font-bold text-green-600 mb-2">{sessionScore}%</div>
//               <div className="text-sm text-gray-500">Current Score</div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//               <div className="text-2xl font-bold text-purple-600 mb-2">{bestScore}%</div>
//               <div className="text-sm text-gray-500">Best Score</div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
//               <div className="text-2xl font-bold text-orange-600 mb-2">{Math.floor(sessionProgress / 20)}</div>
//               <div className="text-sm text-gray-500">Videos Completed</div>
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-sm border">
//           {/* Tab Navigation */}
//           <div className="border-b">
//             <nav className="flex space-x-8 px-6">
//               <button
//                 onClick={() => setActiveTab("video")}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === "video"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Video className="w-4 h-4" />
//                   <span>Training Video</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab("camera")}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === "camera"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Camera className="w-4 h-4" />
//                   <span>AI Analysis</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab("overview")}
//                 className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                   activeTab === "overview"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-center space-x-2">
//                   <BookOpen className="w-4 h-4" />
//                   <span>Overview</span>
//                 </div>
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === "video" && (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Video Player */}
//                 <div className="lg:col-span-2">
//                   <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
//                     {currentVideo ? (
//                       <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
//                         <div className="text-center text-white">
//                           <div className="text-6xl mb-4">⚽</div>
//                           <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
//                           <p className="text-blue-100 mb-6">{currentVideo.description}</p>
//                           <button
//                             onClick={handleVideoToggle}
//                             disabled={!sessionStarted}
//                             className={`flex items-center space-x-2 mx-auto px-6 py-3 rounded-full font-medium transition-all ${
//                               sessionStarted
//                                 ? "bg-white text-blue-600 hover:bg-blue-50"
//                                 : "bg-gray-600 text-gray-300 cursor-not-allowed"
//                             }`}
//                           >
//                             {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//                             <span>{isVideoPlaying ? "Pause" : "Play"}</span>
//                           </button>
//                         </div>
                        
//                         {/* Video Progress Bar */}
//                         {sessionStarted && (
//                           <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
//                             <div className="flex justify-between items-center mb-2">
//                               <span className="text-white text-sm">Video {currentVideoIndex + 1} of {moduleVideos.length}</span>
//                               <span className="text-white text-sm">{videoProgress.toFixed(0)}%</span>
//                             </div>
//                             <div className="w-full bg-gray-600 rounded-full h-2">
//                               <div 
//                                 className="bg-blue-400 h-2 rounded-full transition-all duration-300"
//                                 style={{ width: `${videoProgress}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center h-full">
//                         <div className="text-center text-gray-400">
//                           <Video className="w-16 h-16 mx-auto mb-4" />
//                           <h3 className="text-xl font-semibold mb-2">No Videos Available</h3>
//                           <p>Training videos for this module are coming soon!</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Sidebar */}
//                 <div className="space-y-6">
//                   {/* Video Progress */}
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-gray-900 mb-4">Video Progress</h3>
//                     <div className="space-y-3">
//                       {moduleVideos.map((video, index) => (
//                         <div 
//                           key={video.id}
//                           className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
//                             index === currentVideoIndex 
//                               ? "bg-blue-100 border border-blue-200" 
//                               : "bg-white hover:bg-gray-50"
//                           }`}
//                           onClick={() => sessionStarted && setCurrentVideoIndex(index)}
//                         >
//                           <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
//                             index < currentVideoIndex || (index === currentVideoIndex && videoProgress >= 100)
//                               ? "bg-green-500 text-white"
//                               : index === currentVideoIndex
//                               ? "bg-blue-500 text-white"
//                               : "bg-gray-200 text-gray-600"
//                           }`}>
//                             {index < currentVideoIndex || (index === currentVideoIndex && videoProgress >= 100) ? (
//                               <CheckCircle className="w-4 h-4" />
//                             ) : (
//                               <span>{index + 1}</span>
//                             )}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
//                             <p className="text-xs text-gray-500">
//                               {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Key Points */}
//                   <div className="bg-blue-50 rounded-lg p-4">
//                     <h3 className="font-semibold text-blue-900 mb-4">Key Points</h3>
//                     <ul className="space-y-2 text-sm text-blue-800">
//                       <li className="flex items-start space-x-2">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                         <span>Watch the demonstration carefully</span>
//                       </li>
//                       <li className="flex items-start space-x-2">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                         <span>Practice the technique slowly first</span>
//                       </li>
//                       <li className="flex items-start space-x-2">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                         <span>Focus on proper form over speed</span>
//                       </li>
//                       <li className="flex items-start space-x-2">
//                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
//                         <span>Use the AI analysis for feedback</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "camera" && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Camera Feed */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Camera Feed</h3>
//                   <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 relative">
//                     <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center">
//                       <div className="text-center text-white">
//                         <Camera className="w-16 h-16 mx-auto mb-4" />
//                         <h3 className="text-xl font-semibold mb-2">Camera Access</h3>
//                         <p className="text-green-100 mb-4">Enable camera to start AI analysis</p>
//                         <button 
//                           disabled={!sessionStarted}
//                           className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//                             sessionStarted
//                               ? "bg-white text-green-600 hover:bg-green-50"
//                               : "bg-gray-600 text-gray-300 cursor-not-allowed"
//                           }`}
//                         >
//                           Enable Camera
//                         </button>
//                       </div>
//                     </div>
//                     {sessionStarted && (
//                       <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
//                         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                         <span>LIVE</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* AI Feedback */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis & Feedback</h3>
//                   <div className="bg-gray-50 rounded-lg p-6 h-96">
//                     {sessionStarted ? (
//                       <div className="space-y-4">
//                         <div className="flex items-center space-x-3 p-3 bg-green-100 rounded-lg">
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                           <span className="text-sm text-green-800">Good body positioning detected</span>
//                         </div>
//                         <div className="flex items-center space-x-3 p-3 bg-yellow-100 rounded-lg">
//                           <Circle className="w-5 h-5 text-yellow-600" />
//                           <span className="text-sm text-yellow-800">Try to keep your head up more</span>
//                         </div>
//                         <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg">
//                           <Target className="w-5 h-5 text-blue-600" />
//                           <span className="text-sm text-blue-800">Focus on your first touch timing</span>
//                         </div>
                        
//                         <div className="mt-6">
//                           <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
//                           <div className="space-y-3">
//                             <div>
//                               <div className="flex justify-between text-sm mb-1">
//                                 <span>Body Position</span>
//                                 <span>85%</span>
//                               </div>
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex justify-between text-sm mb-1">
//                                 <span>Ball Control</span>
//                                 <span>72%</span>
//                               </div>
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div className="bg-yellow-500 h-2 rounded-full" style={{width: '72%'}}></div>
//                               </div>
//                             </div>
//                             <div>
//                               <div className="flex justify-between text-sm mb-1">
//                                 <span>Technique</span>
//                                 <span>78%</span>
//                               </div>
//                               <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center h-full">
//                         <div className="text-center text-gray-400">
//                           <Award className="w-16 h-16 mx-auto mb-4" />
//                           <h4 className="text-lg font-semibold mb-2">Start Your Session</h4>
//                           <p className="text-sm">Begin training to see AI analysis and feedback</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "overview" && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <div>
//                   <div className="mb-8">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-6">Module Overview</h3>
//                     <div className="space-y-6">
//                       <div className="bg-blue-50 rounded-lg p-6">
//                         <h4 className="font-semibold text-blue-900 mb-3">What You'll Learn</h4>
//                         <ul className="space-y-2 text-blue-800">
//                           <li className="flex items-start space-x-2">
//                             <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
//                             <span>Proper technique fundamentals</span>
//                           </li>
//                           <li className="flex items-start space-x-2">
//                             <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
//                             <span>Body positioning and balance</span>
//                           </li>
//                           <li className="flex items-start space-x-2">
//                             <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
//                             <span>Common mistakes to avoid</span>
//                           </li>
//                           <li className="flex items-start space-x-2">
//                             <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
//                             <span>Advanced skill variations</span>
//                           </li>
//                         </ul>
//                       </div>
                      
//                       <div className="bg-purple-50 rounded-lg p-6">
//                         <h4 className="font-semibold text-purple-900 mb-3">Prerequisites</h4>
//                         <p className="text-purple-800">Basic soccer knowledge and comfortable athletic wear recommended. No prior experience with first touch techniques required.</p>
//                       </div>
                      
//                       <div className="bg-orange-50 rounded-lg p-6">
//                         <h4 className="font-semibold text-orange-900 mb-3">Equipment Needed</h4>
//                         <ul className="space-y-2 text-orange-800">
//                           <li className="flex items-center space-x-2">
//                             <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
//                             <span>Soccer ball (size 4 or 5)</span>
//                           </li>
//                           <li className="flex items-center space-x-2">
//                             <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
//                             <span>Camera/webcam access</span>
//                           </li>
//                           <li className="flex items-center space-x-2">
//                             <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
//                             <span>Adequate space (2x2 meters minimum)</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-6">Training Tips</h3>
//                   <div className="space-y-6">
//                     <div className="bg-green-50 rounded-lg p-6">
//                       <h4 className="font-semibold text-green-900 mb-3">Before You Start</h4>
//                       <ul className="space-y-2 text-green-800">
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                           <span>Warm up properly (5-10 minutes)</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                           <span>Ensure good lighting for camera</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                           <span>Position camera at chest height</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//                           <span>Clear your training area</span>
//                         </li>
//                       </ul>
//                     </div>
                    
//                     <div className="bg-yellow-50 rounded-lg p-6">
//                       <h4 className="font-semibold text-yellow-900 mb-3">During Training</h4>
//                       <ul className="space-y-2 text-yellow-800">
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
//                           <span>Start slowly, build up speed gradually</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
//                           <span>Pay attention to AI feedback</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
//                           <span>Take breaks when needed</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
//                           <span>Repeat exercises until comfortable</span>
//                         </li>
//                       </ul>
//                     </div>
                    
//                     <div className="bg-indigo-50 rounded-lg p-6">
//                       <h4 className="font-semibold text-indigo-900 mb-3">After Training</h4>
//                       <ul className="space-y-2 text-indigo-800">
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//                           <span>Review your performance metrics</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//                           <span>Note areas for improvement</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//                           <span>Plan your next training session</span>
//                         </li>
//                         <li className="flex items-center space-x-2">
//                           <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
//                           <span>Cool down and stretch properly</span>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrainingSession;



import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Award, Clock, Target, CheckCircle, Circle, Camera, Video, BookOpen, Star, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import * as tf from '@tensorflow/tfjs';

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

  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const analysisIntervalRef = useRef(null);

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
      videoUrl: "https://example.com/video1.mp4"
    },
    {
      id: "v2",
      title: "Body Positioning",
      duration: 240,
      description: "Proper stance and body alignment for optimal ball control",
      videoUrl: "https://example.com/video2.mp4"
    },
    {
      id: "v3",
      title: "Surface Selection",
      duration: 200,
      description: "When to use different parts of your foot",
      videoUrl: "https://example.com/video3.mp4"
    },
    {
      id: "v4",
      title: "Under Pressure",
      duration: 280,
      description: "Maintaining control when defenders are closing in",
      videoUrl: "https://example.com/video4.mp4"
    },
    {
      id: "v5",
      title: "Advanced Techniques",
      duration: 320,
      description: "Master-level first touch variations",
      videoUrl: "https://example.com/video5.mp4"
    }
  ];

  const currentModule = trainingModules.find((module) => module.id === moduleId);
  const currentVideo = moduleVideos[currentVideoIndex];

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading TensorFlow model...');
        setModel({ loaded: true });
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
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
    if (!model || !cameraEnabled) return;

    setIsAnalyzing(true);

    analysisIntervalRef.current = setInterval(() => {
      analyzePosture();
    }, 1000);
  };

  const stopPostureAnalysis = () => {
    setIsAnalyzing(false);
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }
  };

  const analyzePosture = async () => {
    if (!cameraRef.current || !canvasRef.current) return;

    try {
      const mockAnalysis = {
        headPosition: Math.random() > 0.3 ? 'good' : 'tilted',
        shoulderAlignment: Math.random() > 0.4 ? 'aligned' : 'uneven',
        bodyBalance: Math.random() > 0.5 ? 'centered' : 'off-balance',
        footPosition: Math.random() > 0.6 ? 'correct' : 'needs-adjustment',
        overallScore: Math.floor(Math.random() * 30) + 70
      };

      setPostureAnalysis(mockAnalysis);
      setPostureScore(mockAnalysis.overallScore);

      setPostureHistory(prev => {
        const newHistory = [...prev, {
          time: Date.now(),
          score: mockAnalysis.overallScore
        }].slice(-20);
        return newHistory;
      });

    } catch (error) {
      console.error('Error analyzing posture:', error);
    }
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
      interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = Math.min(100, prev + 0.5);

          const videoContribution = 20;
          const currentVideoProgress = (newProgress / 100) * videoContribution;
          const previousVideosProgress = currentVideoIndex * videoContribution;
          setSessionProgress(previousVideosProgress + currentVideoProgress);

          if (newProgress >= 100 && currentVideoIndex < moduleVideos.length - 1) {
            setTimeout(() => {
              setCurrentVideoIndex(prev => prev + 1);
              setVideoProgress(0);
              setIsVideoPlaying(false);
            }, 1000);
          }

          return newProgress;
        });
      }, 100);
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
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                    {currentVideo ? (
                      <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">⚽</div>
                          <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
                          <p className="text-blue-100 mb-6">{currentVideo.description}</p>
                          <button
                            onClick={handleVideoToggle}
                            disabled={!sessionStarted}
                            className={`flex items-center space-x-2 mx-auto px-6 py-3 rounded-full font-medium transition-all ${
                              sessionStarted
                                ? "bg-white text-blue-600 hover:bg-blue-50"
                                : "bg-gray-600 text-gray-300 cursor-not-allowed"
                            }`}
                          >
                            {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            <span>{isVideoPlaying ? "Pause" : "Play"}</span>
                          </button>
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
                      </div>
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
                          className="absolute top-0 left-0 w-full h-full"
                          style={{ display: 'none' }}
                        />
                        {sessionStarted && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>ANALYZING</span>
                          </div>
                        )}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {currentVideo ? (
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">⚽</div>
                        <h3 className="text-xl font-semibold mb-2">{currentVideo.title}</h3>
                        <p className="text-blue-100 mb-6">{currentVideo.description}</p>
                      </div>
                    </div>
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
                        className="absolute top-0 left-0 w-full h-full"
                        style={{ display: 'none' }}
                      />
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
