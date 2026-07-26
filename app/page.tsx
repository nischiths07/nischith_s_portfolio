"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import { PulseBeams } from "@/components/ui/pulse-beams"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import {
  Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Download, MapPin,
  GraduationCap, Briefcase, Instagram, Sparkles, ArrowRight, Star, Clock, Award,
  Terminal, Brain, Cloud, Wrench, Menu, User, Code2, FolderKanban, Contact, Globe2,
  Home, Zap, Heart, Lightbulb, ChevronLeft, ChevronRight, X, Loader, Bot, Cpu, Palette, Eye
} from "lucide-react"
import dynamic from "next/dynamic"

const RobotCanvas = dynamic(() => import("@/components/three-robot").then((mod) => mod.RobotCanvas), {
  ssr: false,
})

type Language = "en" | "hi" | "kn"
type Project = {
  title: string
  description: string
  tech: string[]
  github: string
  category: string
  highlight: string
  image: string
  demoLink?: string
  galleryImages?: { name: string; path: string }[]
}

const translations = {
  en: {
    name: "Nischith S",
    developer: "Hello, I'm a Developer", building: "Building Tomorrow's Digital Future",
    description: "Passionate about crafting innovative software solutions, exploring cutting-edge technologies, and creating meaningful digital experiences.",
    downloadResume: "Download Resume", viewProjects: "View Projects", aboutMe: "About Me", home: "Home",
    education: "Education", currentFocus: "Current Focus", cse: "B.Tech in CSE", college: "Sahyadri College, Mangaluru",
    cgpa: "CGPA: 8.5", focusText: "AI/ML & Full-Stack Development & DevOps ", focusDesc: "Exploring creative design and innovative solutions",
    technicalSkills: "Technical Skills", skillsSubtitle: "Technologies I work with",
    featuredProjects: "Featured Projects", projectsSubtitle: "Some of my recent work",
    letsCreate: "Let's Create Together", contactDesc: "I'm always interested in discussing new opportunities, innovative projects, and having conversations about technology and design.",
    emailMe: "Email Me", linkedIn: "LinkedIn", gitHub: "GitHub", getInTouch: "Get In Touch",
    projects: "Projects", technologies: "Technologies", years: "Years", openToWork: "Open to Work",
    computerScienceEngineer: "Computer Science Engineer", location: "Shimoga, Karnataka",
    passion: "Passionate about crafting innovative software solutions with AI & modern web technologies.",
    whatIDo: "What I Do", creativeSolutions: "Creative Solutions", creativeDesc: "Building innovative applications that solve real-world problems",
    innovativeTech: "Innovative Tech", innovativeDesc: "Leveraging AI/ML and modern frameworks for cutting-edge results",
    userCentric: "User-Centric Design", userCentricDesc: "Creating intuitive and engaging digital experiences",
    languagesKnown: "Languages Known", kannada: "Kannada", english: "English", hindi: "Hindi",
    code: "Code", liveApp: "Live App", download: "Download", screenshots: "Screenshots", demo: "Demo",
    downloadImage: "Download Image", comingSoon: "Under Development!",
    comingSoonDesc: "This live app demo is currently under active development. I'm working hard on it and will deploy it soon!",
    comingSoonNote: "⏱️ Expected to be deployed soon. Stay tuned!",
    gotIt: "Got it, thanks!",
  },
  hi: {
    name: "निश्चिथ एस",
    developer: "नमस्ते, मैं एक डेवलपर हूं", building: "कल के डिजिटल भविष्य का निर्माण",
    description: "अभिनव सॉफ्टवेयर समाधान बनाने, अत्याधुनिक तकनीकों का अन्वेषण करने और सार्थक डिजिटल अनुभव बनाने के लिए उत्सुक।",
    downloadResume: "रिज़्यूमे डाउनलोड करें", viewProjects: "प्रोजेक्ट देखें", aboutMe: "मेरे बारे में", home: "होम",
    education: "शिक्षा", currentFocus: "वर्तमान फोकस", cse: "CSE में B.Tech", college: "सह्याद्री कॉलेज, मंगलुरु",
    cgpa: "CGPA: 8.5", focusText: "AI/ML और फुल-स्टैक डेवलपमेंट और डेवऑप्स ", focusDesc: "क्रिएटिव डिज़ाइन और नवीन समाधानों का अन्वेषण",
    technicalSkills: "तकनीकी कौशल", skillsSubtitle: "जिस तकनीक के साथ काम करता हूं",
    featuredProjects: "प्रमुख परियोजनाएं", projectsSubtitle: "मेरा कुछ हालिया काम",
    letsCreate: "मिलकर कुछ बनाएं", contactDesc: "मुझे नई संभावनाओं, नवीन परियोजनाओं और प्रौद्योगिकी और डिज़ाइन के बारे में बात करने में हमेशा रुचि होती है।",
    emailMe: "ईमेल करें", linkedIn: "लिंक्डइन", gitHub: "गिटहब", getInTouch: "संपर्क करें",
    projects: "प्रोजेक्ट", technologies: "तकनीक", years: "वर्ष", openToWork: "काम के लिए तैयार",
    computerScienceEngineer: "कंप्यूटर साइंस इंजीनियर", location: "शिमोगा, कर्नाटक",
    passion: "AI और आधुनिक वेब तकनीकों के साथ अभिनव सॉफ्टवेयर समाधान बनाने में उत्सुक।",
    whatIDo: "मैं क्या करता हूं", creativeSolutions: "क्रिएटिव समाधान", creativeDesc: "वास्तविक समस्याओं को हल करने वाले अभिनव एप्लिकेशन बनाना",
    innovativeTech: "इनोवेटिव टेक", innovativeDesc: "अत्याधुनिक परिणामों के लिए AI/ML और आधुनिक फ्रेमवर्क का उपयोग",
    userCentric: "यूजर-सेंट्रिक डिज़ाइन", userCentricDesc: "सहज और आकर्षक डिजिटल अनुभव बनाना",
    languagesKnown: "भाषाएं जानते हैं", kannada: "कन्नड़", english: "अंग्रेज़ी", hindi: "हिंदी",
    code: "कोड", liveApp: "लाइव ऐप", download: "डाउनलोड", screenshots: "स्क्रीनशॉट", demo: "डेमो",
    downloadImage: "इमेज डाउनलोड करें", comingSoon: "निर्माणाधीन है!",
    comingSoonDesc: "यह लाइव ऐप डेमो अभी विकास के अधीन है। मैं इस पर काम कर रहा हूं और इसे जल्द ही लाइव करूंगा!",
    comingSoonNote: "⏱️ जल्द ही लाइव होने की उम्मीद है। जुड़े रहें!",
    gotIt: "ठीक है, धन्यवाद!",
  },
  kn: {
    name: "ನಿಶ್ಚಿತ್ ಎಸ್",
    developer: "ಹಲೋ, ನಾನೊಬ್ಬ ಡೆವಲಪರ್", building: "ನಾಳಿನ ಡಿಜಿಟಲ್ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇನೆ",
    description: "ನವೀನ ಸಾಫ್ಟ್‌ವೇರ್ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸುವ, ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳನ್ನು ಅನ್ವೇಷಿಸುವ ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಡಿಜಿಟಲ್ ಅನುಭವಗಳನ್ನು ರಚಿಸುವ ಉತ್ಸಾಹಿ.",
    downloadResume: "ರೆಜ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", viewProjects: "ಪ್ರೊಜೆಕ್ಟ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ", aboutMe: "ನನ್ನ ಬಗ್ಗೆ", home: "ಹೋಮ್",
    education: "ಶಿಕ್ಷಣ", currentFocus: "ಪ್ರಸ್ತುತ ಗಮನ", cse: "CSE ನಲ್ಲಿ B.Tech", college: "ಸಹ್ಯಾದ್ರಿ ಕಾಲೇಜು, ಮಂಗಳೂರು",
    cgpa: "CGPA: 8.5", focusText: "AI/ML & ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಅಭಿವೃಧಿ & ಡೆವೊಪ್ಸ್", focusDesc: "ಸೃಜನಾತ್ಮಕ ವಿನ್ಯಾಸ ಮತ್ತು ನವೀನ ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸುತ್ತಿದ್ದೇನೆ",
    technicalSkills: "ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳು", skillsSubtitle: "ನಾನು ಕೆಲಸ ಮಾಡುವ ತಂತ್ರಜ್ಞಾನಗಳು",
    featuredProjects: "ವಿಶೇಷ ಪ್ರೊಜೆಕ್ಟ್‌ಗಳು", projectsSubtitle: "ನನ್ನ ಇತ್ತೀಚಿನ ಕೆಲಸಗಳು",
    letsCreate: "ಒಟ್ಟಿಗೆ ರಚಿಸೋಣ", contactDesc: "ಹೊಸ ಅವಕಾಶಗಳು, ನವೀನ ಪ್ರೊಜೆಕ್ಟ್‌ಗಳು ಮತ್ತು ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ವಿನ್ಯಾಸದ ಬಗ್ಗೆ ಮಾತನಾಡುವುದರಲ್ಲಿ ನಾನು ಯಾವಾಗಲೂ ಆಸಕ್ತಿ ಹೊಂದಿದ್ದೇನೆ.",
    emailMe: "ಇಮೇಲ್ ಮಾಡಿ", linkedIn: "ಲಿಂಕ್ಡ್‌ಇನ್", gitHub: "ಗಿಟ್‌ಹಬ್", getInTouch: "ಸಂಪರ್ಕಿಸಿ",
    projects: "ಪ್ರೊಜೆಕ್ಟ್‌ಗಳು", technologies: "ತಂತ್ರಜ್ಞಾನಗಳು", years: "ವರ್ಷ", openToWork: "ಕೆಲಸಕ್ಗೆ ಸಿದ್ಧ",
    computerScienceEngineer: "ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಇಂಜಿನಿಯರ್", location: "ಶಿವಮೊಗ್ಗ, ಕರ್ನಾಟಕ",
    passion: "AI ಮತ್ತು ಆಧುನಿಕ ವೆಬ್ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ ನವೀನ ಸಾಫ್ಟ್‌ವೇರ್ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸುವಲ್ಲಿ ಉತ್ಸಾಹಿ.",
    whatIDo: "ನಾನು ಏನು ಮಾಡುತ್ತಿದ್ದೇನೆ", creativeSolutions: "ಸೃಜನಾತ್ಮಕ ಪರಿಹಾರಗಳು", creativeDesc: "ವಾಸ್ತವಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಹರಿಸುವ ನವೀನ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುವುದು",
    innovativeTech: "ನವೀನ ತಂತ್ರಜ್ಞಾನ", innovativeDesc: "ಅತ್ಯಾಧುನಿಕ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ AI/ML ಮತ್ತು ಆಧುನಿಕ ಫ್ರೇಮ್‌ವರ್ಕ್‌ಗಳನ್ನು ಬಳಸುವುದು",
    userCentric: "ಬಳಕೆದಾರ-ಕೇಂದ್ರಿತ ವಿನ್ಯಾಸ", userCentricDesc: "ಸಹಜ ಮತ್ತು ಆಕರ್ಷಕ ಡಿಜಿಟಲ್ ಅನುಭವಗಳನ್ನು ರಚಿಸುವುದು",
    languagesKnown: "ತಿಳಿದಿರುವ ಭಾಷೆಗಳು", kannada: "ಕನ್ನಡ", english: "English", hindi: "ಹಿಂದಿ",
    code: "ಕೋಡ್", liveApp: "ಲೈವ್ ಆ್ಯಪ್", download: "ಡೌನ್‌ಲೋಡ್", screenshots: "ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು", demo: "ಡೆಮೊ",
    downloadImage: "ಚಿತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", comingSoon: "ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ!",
    comingSoonDesc: "ಈ ಲೈವ್ ಅಪ್ಲಿಕೇಶನ್ ಡೆಮೊ ಪ್ರಸ್ತುತ ಸಕ್ರಿಯ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನಾನು దీని ಮೇಲೆ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇನೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ಲೈವ್ ಮಾಡುತ್ತೇನೆ!",
    comingSoonNote: "⏱️ ಶೀಘ್ರದಲ್ಲೇ ಲೈವ್ ಆಗುವ ನಿರೀಕ್ಷೆಯಿದೆ. ಜೊತೆಯಾಗಿರಿ!",
    gotIt: "ಸರಿ, ಧನ್ಯವಾದಗಳು!",
  },
}

const beams = [
  {
    path: "M 0 200 Q 400 0 858 200",
    gradientConfig: {
      initial: { x1: "0%", x2: "100%", y1: "0%", y2: "0%" },
      animate: { x1: ["0%", "100%"], x2: ["100%", "0%"], y1: ["0%", "100%"], y2: ["100%", "0%"] },
      transition: { duration: 5, repeat: Infinity, repeatType: "loop" as const },
    },
  },
  {
    path: "M 0 300 Q 400 100 858 300",
    gradientConfig: {
      initial: { x1: "0%", x2: "100%", y1: "50%", y2: "50%" },
      animate: { x1: ["0%", "100%"], x2: ["100%", "0%"], y1: ["50%", "0%"], y2: ["50%", "100%"] },
      transition: { duration: 7, repeat: Infinity, repeatType: "loop" as const },
    },
  },
]

const gradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [clickedDemoIndex, setClickedDemoIndex] = useState<number | null>(null)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [suggestionOpen, setSuggestionOpen] = useState(false)
  const [suggestionMessage, setSuggestionMessage] = useState("")
  const [suggestionSubmitted, setSuggestionSubmitted] = useState(false)
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All")

  const awsMilestoneImages = [
    { name: "Architecture Diagram", path: "/aws-milestone/archti. diagram.png" },
    { name: "AWS Instance", path: "/aws-milestone/aws instance.png" },
    { name: "Docker Repository", path: "/aws-milestone/docker repo.png" },
    { name: "Nginx Configuration", path: "/aws-milestone/nginx.png" },
    { name: "Login Page", path: "/aws-milestone/login in page.png" },
    { name: "Home Page", path: "/aws-milestone/HOME PAGE.png" },
    { name: "Sign In Page", path: "/aws-milestone/signin page.png" },
    { name: "Student Terminal", path: "/aws-milestone/Student terminal.png" },
    { name: "Student Terminal 2", path: "/aws-milestone/student terminal 2.png" },
    { name: "YAML Configuration", path: "/aws-milestone/.yml for frontend.png" },
    { name: "Admin Access", path: "/aws-milestone/admin access.png" },
  ]

  const astroragaImages = [
    { name: "AstroRaga - AI-Powered Astrology Overview", path: "/images/astroraga.png" },
    { name: "AstroRaga Sanctuary Home (English)", path: "/astroraga/home-en.png" },
    { name: "AstroRaga Sanctuary Home (Kannada)", path: "/astroraga/home-kn.png" },
    { name: "Kundali & User Profile Form", path: "/astroraga/profile.png" },
    { name: "AstroSage AI Cosmic Chat Assistant", path: "/astroraga/astrosage-ai.png" },
    { name: "About AstroRaga & Spiritual Tech Market", path: "/astroraga/about.png" },
    { name: "Feedback & Community Suggestions", path: "/astroraga/feedback.png" },
  ]

  const nischRestoImages = [
    { name: "Elevated Culinary Artistry - Home & Fine Dining", path: "/nisch-resto/screenshot1.png" },
    { name: "Table Reservation & Experience Booking System", path: "/nisch-resto/screenshot2.png" },
    { name: "Gourmet Chef Specials & Interactive Menu", path: "/nisch-resto/screenshot3.png" },
    { name: "Nisch-Resto Luxury Dark Theme Overview", path: "/nisch-resto/thumbnail.jpg" },
  ]

  const razorpayImages = [
    { name: "Razorpay Hero - Financial Platform", path: "/razorpay/screenshot1.png" },
    { name: "RazorpayX Banking & Analytics Dashboard", path: "/razorpay/screenshot2.png" },
    { name: "Payment Suite & Gateway Features", path: "/razorpay/screenshot3.png" },
    { name: "Interactive Payment Gateway Checkout Modal", path: "/razorpay/screenshot4.png" },
    { name: "Payment Success & Transaction Confirmation", path: "/razorpay/screenshot5.png" },
  ]

  const [currentGallery, setCurrentGallery] = useState<{ name: string; path: string }[]>(nischRestoImages)

  const t = translations[language]

  useEffect(() => { setIsLoaded(true) }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!demoModalOpen || !currentGallery.length) return
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length)
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [demoModalOpen, currentGallery])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 80
        window.scrollTo({ top, behavior: "smooth" })
      }
    }
  }

  const handleEmailClick = () => { window.location.href = "mailto:snischith07@gmail.com" }
  const handleGithubClick = () => { window.open("https://github.com/nischiths07", "_blank") }
  const handleLinkedInClick = () => { window.open("https://www.linkedin.com/in/nischith-s7/", "_blank") }
  const handleInstagramClick = () => { window.open("https://www.instagram.com/creatat_ns1/", "_blank") }
  const handleResumeDownload = () => {
    setComingSoonOpen(true)
  }

  const handleSuggestionSubmit = () => {
    if (suggestionMessage.trim()) {
      // Send email with suggestion
      const encodedMessage = encodeURIComponent(`User Suggestion:\n\n${suggestionMessage}`)
      window.location.href = `mailto:snischith07@gmail.com?subject=Portfolio Suggestion&body=${encodedMessage}`

      // Show thank you message
      setSuggestionSubmitted(true)

      // Reset after 2 seconds
      setTimeout(() => {
        setSuggestionMessage("")
        setSuggestionSubmitted(false)
        setSuggestionOpen(false)
      }, 2000)
    }
  }

  const skillCategories = [
    {
      title: "Programming Languages",
      categoryKey: "languages",
      icon: Code,
      color: "from-blue-500 via-indigo-500 to-cyan-500",
      skills: [
        { name: "Python", level: 90, badge: "Advanced", desc: "Data Structures, ML Models & Automation" },
        { name: "JavaScript (ES6+)", level: 92, badge: "Advanced", desc: "Async/Await, DOM & Modern Web APIs" },
        { name: "TypeScript", level: 85, badge: "Proficient", desc: "Strict Types, Generics & Interfaces" },
        { name: "C / C++", level: 80, badge: "Proficient", desc: "Algorithms, OOP & Memory Basics" },
        { name: "Java", level: 82, badge: "Proficient", desc: "OOP, Core Java & System Logic" },
        { name: "SQL", level: 88, badge: "Advanced", desc: "Relational Queries & Joins" },
      ]
    },
    {
      title: "Web & Full-Stack Development",
      categoryKey: "web",
      icon: Globe,
      color: "from-emerald-500 via-teal-500 to-green-500",
      skills: [
        { name: "Next.js 14", level: 90, badge: "Advanced", desc: "App Router, SSR, SSG & Server Actions" },
        { name: "React.js 18/19", level: 92, badge: "Advanced", desc: "Hooks, Context & Component Architecture" },
        { name: "Tailwind CSS", level: 95, badge: "Expert", desc: "Glassmorphism, Animations & Responsive UI" },
        { name: "Node.js & Express", level: 85, badge: "Proficient", desc: "RESTful APIs & Backend Architecture" },
        { name: "Prisma ORM", level: 84, badge: "Proficient", desc: "Type-safe Data Modeling & Migrations" },
        { name: "HTML5 / CSS3", level: 95, badge: "Expert", desc: "Semantic Markup, Flexbox & Grid Layouts" },
      ]
    },
    {
      title: "AI, ML & Data Science",
      categoryKey: "ai",
      icon: Brain,
      color: "from-purple-500 via-fuchsia-500 to-pink-500",
      skills: [
        { name: "Deep Learning (CNN)", level: 88, badge: "Advanced", desc: "Medical Image Classification & ACO" },
        { name: "NLP & Explainable AI", level: 85, badge: "Proficient", desc: "Document Analysis & Text Intelligence" },
        { name: "Scikit-Learn & Pandas", level: 88, badge: "Advanced", desc: "Predictive Modeling & Feature Engineering" },
        { name: "OpenCV", level: 82, badge: "Proficient", desc: "Image Preprocessing & Computer Vision" },
        { name: "Time-Series Forecasting", level: 85, badge: "Proficient", desc: "Gold Price Prediction Models" },
      ]
    },
    {
      title: "Databases & Cloud Storage",
      categoryKey: "databases",
      icon: Database,
      color: "from-amber-500 via-orange-500 to-red-500",
      skills: [
        { name: "PostgreSQL / Neon", level: 88, badge: "Advanced", desc: "Cloud Serverless DB & Schema Design" },
        { name: "MySQL", level: 88, badge: "Advanced", desc: "Relational DBMS & Stored Procedures" },
        { name: "MongoDB", level: 82, badge: "Proficient", desc: "NoSQL Collections & Document Aggregation" },
        { name: "Redis", level: 78, badge: "Intermediate", desc: "In-memory Caching & Session Management" },
      ]
    },
    {
      title: "Cloud & DevOps Infrastructure",
      categoryKey: "devops",
      icon: Cloud,
      color: "from-sky-500 via-blue-500 to-cyan-500",
      skills: [
        { name: "AWS EC2 & S3", level: 85, badge: "Proficient", desc: "Instance Configuration & Cloud Deployments" },
        { name: "Docker & Containers", level: 88, badge: "Advanced", desc: "Dockerfile, Containerization & Docker Hub" },
        { name: "Nginx", level: 82, badge: "Proficient", desc: "Reverse Proxy & Load Balancing" },
        { name: "Git & GitHub CI/CD", level: 90, badge: "Advanced", desc: "Branching, PRs & GitHub Workflows" },
        { name: "Vercel & Render", level: 92, badge: "Expert", desc: "Automated Production Deployments" },
      ]
    },
    {
      title: "Developer Tools & Workflow",
      categoryKey: "tools",
      icon: Wrench,
      color: "from-rose-500 via-pink-500 to-red-500",
      skills: [
        { name: "VS Code", level: 95, badge: "Expert", desc: "Power Extensions, Debugging & Custom Config" },
        { name: "Linux / Bash Shell", level: 84, badge: "Proficient", desc: "CLI Operations & System Admin" },
        { name: "Figma", level: 82, badge: "Proficient", desc: "UI Mockups, Wireframes & Prototypes" },
        { name: "Postman", level: 88, badge: "Advanced", desc: "API Endpoint Testing & Documentation" },
      ]
    },
  ]

  const projects: Project[] = [
    {
      title: "Razorpay Website & Payment Gateway Clone",
      description: "Full-featured Razorpay landing page and interactive payment modal checkout clone built with modern responsive web design.",
      tech: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "Vercel"],
      github: "https://github.com/nischiths07",
      demoLink: "https://razorpay-website-clone-nine.vercel.app/",
      galleryImages: razorpayImages,
      category: "Web Dev",
      highlight: "Live Fintech App",
      image: "/razorpay/thumbnail.png"
    },
    {
      title: "Nisch-Resto - Fine Dining Sanctuary",
      description: "Luxury fine dining restaurant platform with interactive menu, table reservation system, chef specials, and elegant responsive design.",
      tech: ["Next.js", "React", "Tailwind CSS", "JavaScript", "Render"],
      github: "https://github.com/nischiths07/nisch-resto",
      demoLink: "https://nisch-resto-07.onrender.com/",
      galleryImages: nischRestoImages,
      category: "Full Stack",
      highlight: "Live Restaurant App",
      image: "/nisch-resto/thumbnail.jpg"
    },
    {
      title: "AstroRaga - Royal Vedic Sanctuary",
      description: "AI-powered Vedic astrology platform with multilingual support (English & Kannada), birth chart profiles, AstroSage AI guidance, and Neon PostgreSQL database.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Neon PostgreSQL", "AstroSage AI"],
      github: "https://github.com/nischiths07",
      demoLink: "https://astro-raga-n6r7.vercel.app",
      galleryImages: astroragaImages,
      category: "Full Stack / AI",
      highlight: "Live Web App",
      image: "/images/astroraga.png"
    },
    { title: "Skin Lesion Detection using Deep Learning & ACO", description: "Medical image classification system using Deep Learning with Ant Colony Optimization for improved accuracy.", tech: ["Python", "Deep Learning", "CNN", "OpenCV"], github: "https://github.com/nischiths07", category: "AI/ML", highlight: "95% Accuracy", image: "/images/skin lesion.png" },
    { title: "Gold Price Prediction System", description: "ML-based predictive analytics system forecasting gold prices using historical data.", tech: ["Python", "ML", "Pandas", "Scikit-learn"], github: "https://github.com/nischiths07", category: "Data Science", highlight: "Time Series", image: "/images/GOLD PREDITION.png" },
    { title: "Farm Management System", description: "Database-driven agricultural platform for tracking crops, inventory, and transactions.", tech: ["MySQL", "DBMS", "SQL", "ER Diagrams"], github: "https://github.com/nischiths07", category: "Database", highlight: "Full CRUD", image: "/images/farm.png" },
    { title: "Hostel Management (DevOps)", description: "Full-stack hostel management deployed using Docker containers and AWS EC2.", tech: ["Docker", "AWS EC2", "Nginx", "MERN"], github: "https://github.com/nischiths07", demoLink: "/aws-milestone.zip", galleryImages: awsMilestoneImages, category: "DevOps", highlight: "Cloud Deployed", image: "/images/sahyadriOps.png" },
    { title: "Book My Show Clone", description: "Responsive movie booking frontend with seat layout design.", tech: ["HTML", "CSS", "JavaScript", "Responsive"], github: "https://github.com/nischiths07", category: "Web Dev", highlight: "Interactive UI", image: "/images/book-my-show.png" },
    { title: "Govt Scheme Analyzer (NLP)", description: "AI-powered NLP system analyzing government scheme documents.", tech: ["NLP", "AI", "Explainable AI", "System Design"], github: "https://github.com/nischiths07", category: "AI/ML", highlight: "NLP Powered", image: "/images/govt scheme analzyer.png" },
  ]

  const stats = [
    { label: t.projects, value: "8+", icon: Award },
    { label: t.technologies, value: "20+", icon: Terminal },
    { label: t.years, value: "3+", icon: Clock },
    { label: "CGPA", value: "8.5", icon: Star },
  ]

  const langOptions = [
    { code: "en" as Language, label: "English", short: "EN" },
    { code: "hi" as Language, label: "हिंदी", short: "HI" },
    { code: "kn" as Language, label: "ಕನ್ನಡ", short: "KN" },
  ]

  const languagesKnown = [
    { name: t.english || "English", level: "Professional" },
    { name: t.hindi || "Hindi", level: "Professional" },
    { name: t.kannada || "Kannada", level: "Native" }
  ]

  const whatIDoItems = [
    { icon: Lightbulb, title: t.creativeSolutions, description: t.creativeDesc, color: "from-yellow-500 to-orange-500" },
    { icon: Zap, title: t.innovativeTech, description: t.innovativeDesc, color: "from-purple-500 to-pink-500" },
    { icon: Heart, title: t.userCentric, description: t.userCentricDesc, color: "from-red-500 to-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-slate-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <nav className={`fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">NISCHITH.S</h1>
            <div className="hidden lg:flex space-x-1">
              {[{ id: "home", label: t.home, icon: Home }, { id: "about", label: t.aboutMe, icon: User }, { id: "skills", label: t.technicalSkills, icon: Code2 }, { id: "projects", label: t.featuredProjects, icon: FolderKanban }, { id: "contact", label: "Contact", icon: Contact }].map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <item.icon className="w-4 h-4" /><span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center space-x-1 mr-4">
              <Globe2 className="w-4 h-4 text-muted-foreground mr-2" />
              {langOptions.map((lang) => (
                <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${language === lang.code ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  {lang.short}
                </button>
              ))}
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="w-6 h-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-background">
                <div className="flex flex-col h-full pt-8">
                  <div className="flex justify-center space-x-2 mb-6">
                    {langOptions.map((lang) => (
                      <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${language === lang.code ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-primary/20 mb-3">
                      <img src="/images/profile-photo.jpg" alt="Nischith S" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold">{t.name}</h2>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {[{ id: "home", label: t.home, icon: Home }, { id: "about", label: t.aboutMe, icon: User }, { id: "skills", label: t.technicalSkills, icon: Code2 }, { id: "projects", label: t.featuredProjects, icon: FolderKanban }, { id: "contact", label: "Contact", icon: Contact }].map((item) => (
                      <button key={item.id} onClick={() => { scrollToSection(item.id); setMobileMenuOpen(false) }} className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${activeSection === item.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}>
                        <item.icon className="w-5 h-5" /><span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto space-y-3 pt-8">
                    <Button className="w-full bg-primary" onClick={() => { handleEmailClick(); setMobileMenuOpen(false) }}><Mail className="w-4 h-4 mr-2" />{t.getInTouch}</Button>
                    <Button variant="outline" className="w-full" onClick={() => { handleResumeDownload(); setMobileMenuOpen(false) }}><Download className="w-4 h-4 mr-2" />{t.downloadResume}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <section id="home" className="min-h-[85vh] flex items-center justify-center px-4 md:px-6 py-12 md:py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
          <AnimatedGridPattern
            numSquares={40}
            maxOpacity={0.2}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-20%] h-[140%] skew-y-12 opacity-40",
            )}
          />
          {/* Decorative Blobs */}
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute top-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto relative z-10 px-4">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              
              {/* Main Heading Section - Adjusted */}
              <div className="space-y-6 relative z-20 mb-8 pt-12">
                <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 backdrop-blur-md rounded-full text-sm font-black border border-primary/20 shadow-lg text-primary uppercase tracking-widest">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping" />
                    {t.developer}
                  </span>
                </div>
              </div>

              {/* Premium Profile Section - Simplified */}
              <div className={`flex flex-col md:flex-row items-center gap-12 mb-16 transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Visual Avatar */}
                <div className="relative group">
                  <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl z-10 transition-all duration-500 group-hover:border-primary/50">
                    <img src="/images/profile-photo.jpg" alt="Nischith S" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {/* Glass Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-6 right-6 bg-emerald-500 w-7 h-7 rounded-full border-4 border-white dark:border-slate-900 z-20 animate-pulse shadow-green-500/50 shadow-lg" />
                </div>
                
                <div className="text-center md:text-left flex flex-col items-center md:items-start gap-6">
                  <div className="relative">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-2 text-foreground">
                       {t.name}
                    </h2>
                    {/* Animated Underline */}
                    <div className="h-2 w-1/3 bg-primary rounded-full group-hover:w-full transition-all duration-500" />
                  </div>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="px-6 py-2.5 bg-blue-600/10 backdrop-blur-xl border border-blue-600/20 rounded-2xl shadow-xl shadow-blue-600/10 group cursor-default">
                       <div className="flex items-center gap-3">
                         <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                         <span className="text-blue-600 dark:text-blue-400 font-black text-lg md:text-xl uppercase tracking-wider">{t.computerScienceEngineer}</span>
                       </div>
                    </div>
                    
                    <div className="px-6 py-2.5 bg-slate-500/10 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl flex items-center gap-3">
                       <MapPin className="w-5 h-5 text-slate-500" />
                       <span className="text-muted-foreground font-black text-base md:text-lg">{t.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 group cursor-pointer">
                       <div className="w-2 h-2 rounded-full bg-blue-600 shadow-blue-600/50 shadow-lg group-hover:scale-150 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-blue-600 transition-colors">Available For Hire</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                       <div className="w-2 h-2 rounded-full bg-purple-600 shadow-purple-600/50 shadow-lg group-hover:scale-150 transition-transform" />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-purple-600 transition-colors">Digital Architect</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section Header */}
              <div id="about" className={`pt-20 pb-10 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-4xl md:text-6xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600 drop-shadow-sm">
                  {t.aboutMe}
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-4 rounded-full" />
              </div>

              {/* Digital Hub - Tighter & More Creative */}
              <div className={`w-full max-w-6xl relative mt-4 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                  
                  {/* Left Column: Academic */}
                  <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
                    <div className="group relative p-4 bg-background/60 backdrop-blur-3xl rounded-[1.5rem] border border-primary/30 shadow-2xl hover:border-primary transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                       <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-3xl border-b border-l border-primary/20 pointer-events-none" />
                       <div className="relative z-10">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-primary/30 group-hover:bg-primary group-hover:text-white transition-all">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <h4 className="font-black text-foreground text-sm tracking-wide mb-1 uppercase opacity-70">{t.education}</h4>
                        <p className="text-foreground text-sm font-bold leading-tight">{t.cse}</p>
                        <p className="text-primary/70 text-[11px] font-bold mt-1">{t.college}</p>
                       </div>
                       <div className="absolute bottom-1 right-2 w-8 h-[2px] bg-primary/20 group-hover:w-full transition-all duration-700" />
                    </div>

                    <div className="group relative p-4 bg-background/60 backdrop-blur-3xl rounded-[1.5rem] border border-purple-500/30 shadow-2xl hover:border-purple-500 transition-all duration-500 hover:-translate-y-1 overflow-hidden bg-gradient-to-br from-background to-purple-500/5">
                       <div className="relative z-10 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-black text-purple-500 text-xs tracking-[0.2em] uppercase">Academic Index</h4>
                           <Award className="w-6 h-6 text-purple-500 group-hover:scale-125 transition-transform" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-foreground drop-shadow-sm">{t.cgpa.split(': ')[1]}</span>
                          <span className="text-xs font-bold text-muted-foreground uppercase">CGPA</span>
                        </div>
                        {/* Creative Progress Bar */}
                        <div className="w-full h-1.5 bg-muted rounded-full mt-3 overflow-hidden border border-purple-500/10">
                           <div className="h-full bg-gradient-to-r from-purple-500 to-primary w-[85%] animate-[shimmer_2s_infinite]" />
                        </div>
                       </div>
                    </div>
                  </div>

                  {/* Center Column: The Robot Interface (Larger & Tighter) */}
                  <div className="lg:col-span-2 relative order-1 lg:order-2 -mx-4">
                    <div className="relative z-10 aspect-square max-w-[500px] mx-auto group">
                      <RobotCanvas />
                      {/* Interactive Meta-Lines */}
                      <div className="absolute inset-0 border border-primary/5 rounded-full animate-ping opacity-20 pointer-events-none" />
                      <div className="absolute inset-4 border border-purple-500/10 rounded-full animate-[ping_3s_infinite] opacity-10 pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Skills */}
                  <div className="lg:col-span-1 space-y-4 order-3">
                    <div className="group relative p-4 bg-background/60 backdrop-blur-3xl rounded-[1.5rem] border border-blue-500/30 shadow-2xl hover:border-blue-500 transition-all duration-500 hover:-translate-y-1">
                       <div className="relative z-10">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-blue-500/30 group-hover:scale-110 transition-transform">
                          <Brain className="w-5 h-5 text-blue-500" />
                        </div>
                        <h4 className="font-black text-foreground text-sm tracking-wide mb-1 uppercase opacity-70">{t.currentFocus}</h4>
                        <p className="text-foreground text-sm font-bold leading-tight">{t.focusText}</p>
                       </div>
                       <div className="absolute top-2 right-2 flex gap-1">
                         <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                         <div className="w-1 h-1 bg-blue-500/50 rounded-full animate-pulse delay-75" />
                         <div className="w-1 h-1 bg-blue-500/30 rounded-full animate-pulse delay-150" />
                       </div>
                    </div>

                    <div className="group relative p-4 bg-background/60 backdrop-blur-3xl rounded-[1.5rem] border border-green-500/30 shadow-2xl hover:border-green-500 transition-all duration-500 hover:-translate-y-1">
                       <div className="relative z-10">
                        <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-green-500/30">
                          <Globe2 className="w-5 h-5 text-green-500" />
                        </div>
                        <h4 className="font-black text-foreground text-sm tracking-wide mb-2 uppercase opacity-70">Linguistics</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {[t.kannada, t.english, t.hindi].map((l, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-black border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">{l}</span>
                          ))}
                        </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Simplified & Tighter Action Bar */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                   {whatIDoItems.map((item, idx) => (
                     <div key={idx} className="group flex items-center gap-3 p-3 bg-background/50 backdrop-blur-xl rounded-xl border border-border/50 hover:border-primary/40 transition-all duration-300">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-black text-foreground text-xs leading-tight">{item.title}</h4>
                          <p className="text-muted-foreground text-[9px] leading-tight mt-0.5">{item.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Call to Actions - Directly Below Digital Hub */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-10 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/95 text-white shadow-2xl shadow-primary/30 h-16 px-12 text-xl font-black rounded-2xl transition-all hover:scale-[1.05] active:scale-[0.95]" onClick={handleResumeDownload}>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Download className="w-6 h-6 mr-3 relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">{t.downloadResume}</span>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-black rounded-2xl border-2 hover:bg-foreground/5 hover:scale-[1.05] active:scale-[0.95] transition-all" onClick={() => scrollToSection("projects")}>
                  {t.viewProjects}<ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Socials */}
              <div className={`flex justify-center space-x-6 pt-10 transition-all duration-700 delay-1100 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {[
                  { icon: Github, href: "https://github.com/nischiths07", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/nischith-s7/", label: "LinkedIn" },
                  { icon: Instagram, href: "https://www.instagram.com/creatat_ns1/", label: "Instagram" },
                  { icon: Mail, href: "mailto:sniscith07@gmail.com", label: "Email", target: "_self" }
                ].map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    target={social.target || "_blank"} 
                    rel="noopener noreferrer" 
                    aria-label={social.label}
                    className="p-5 bg-muted/40 hover:bg-primary/10 rounded-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50 group shadow-lg"
                  >
                    <social.icon className="w-7 h-7 text-foreground/80 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="py-20 px-4 md:px-6 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tighter mb-8">
            Building Tomorrow's<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600">
              Digital Future
            </span>
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-semibold">
            Passionate about crafting innovative software solutions, exploring cutting-edge technologies, and creating meaningful digital experiences.
          </p>
        </div>
      </section>

      <section id="skills" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
          <AnimatedGridPattern
            numSquares={25}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-25%] h-[175%] skew-y-6",
            )}
          />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-10 md:mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-xs font-extrabold text-primary uppercase tracking-widest mb-3 border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Core Competencies
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-3">{t.technicalSkills}</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-medium">{t.skillsSubtitle}</p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-purple-500 to-blue-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10 md:mb-12">
              {[
                { label: "All Skills", key: "All" },
                { label: "Languages", key: "languages" },
                { label: "Web & Full-Stack", key: "web" },
                { label: "AI & ML", key: "ai" },
                { label: "Databases", key: "databases" },
                { label: "Cloud & DevOps", key: "devops" },
                { label: "Tools", key: "tools" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedSkillCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    selectedSkillCategory === cat.key
                      ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                      : "bg-background/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skill Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories
                .filter((cat) => selectedSkillCategory === "All" || cat.categoryKey === selectedSkillCategory)
                .map((category, index) => (
                  <Card
                    key={index}
                    className="border border-border/60 hover:border-primary/50 bg-background/70 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group overflow-hidden flex flex-col justify-between"
                  >
                    <CardHeader className="relative pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ring-2 ring-white/20`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-primary/5 text-primary border-primary/20">
                          {category.skills.length} Technologies
                        </Badge>
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold mt-4 text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-1.5 group/skill">
                          <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-foreground font-bold text-sm flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 group-hover/skill:scale-150 transition-transform" />
                              {skill.name}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border ${
                              skill.badge === "Expert" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" :
                              skill.badge === "Advanced" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" :
                              "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                            }`}>
                              {skill.badge}
                            </span>
                          </div>

                          {/* Skill Level Animated Bar */}
                          <div className="w-full h-2 bg-muted/60 rounded-full overflow-hidden p-0.5 border border-border/30">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out group-hover/skill:brightness-125`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          {/* Skill Description */}
                          <p className="text-[11px] text-muted-foreground font-medium leading-tight opacity-80 group-hover/skill:opacity-100 transition-opacity">
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-400/5 via-slate-500/5 to-slate-400/5" />
          <AnimatedGridPattern
            numSquares={20}
            maxOpacity={0.08}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-15%] h-[130%] skew-y-3",
            )}
          />
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.featuredProjects}</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-4">{t.projectsSubtitle}</p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <Card key={index} className={`border-2 border-primary/10 hover:border-blue-400/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:ring-2 hover:ring-blue-400/50 group cursor-pointer ${hoveredProject === index ? 'scale-[1.02] shadow-blue-500/30 ring-2 ring-blue-400/50' : ''}`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => {
                    if (project.demoLink && project.demoLink.startsWith("http")) {
                      window.open(project.demoLink, "_blank")
                    } else if (project.galleryImages) {
                      setCurrentGallery(project.galleryImages)
                      setCurrentImageIndex(0)
                      setDemoModalOpen(true)
                    }
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 md:w-20 h-16 md:h-20 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
                          <Code className="w-8 md:w-10 h-8 md:h-10 text-primary" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 text-white text-xs px-2 md:px-3 py-0.5 md:py-1">{project.category}</Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-full">{project.highlight}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-xs md:text-sm line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                      {(project.tech || []).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs px-1.5 md:px-2 py-0.5">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" className="flex-1 text-xs font-medium" onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank") }}>
                        <Github className="w-3.5 h-3.5 mr-1" />{t.code || "Code"}
                      </Button>
                      
                      {project.demoLink && (
                        <Button size="sm" className="flex-1 text-xs font-medium bg-primary hover:bg-primary/90 text-white" onClick={(e) => {
                          e.stopPropagation()
                          if (project.demoLink!.startsWith("http")) {
                            window.open(project.demoLink, "_blank")
                          } else {
                            const link = document.createElement("a")
                            link.href = project.demoLink!
                            link.download = "aws-milestone.zip"
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }
                        }}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          {project.demoLink.startsWith("http") ? (t.liveApp || "Live App") : (t.download || "Download")}
                        </Button>
                      )}

                      {project.galleryImages && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1 text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentGallery(project.galleryImages!)
                            setCurrentImageIndex(0)
                            setDemoModalOpen(true)
                          }}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          {t.screenshots || "Screenshots"}
                        </Button>
                      )}

                      {!project.demoLink && !project.galleryImages && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex-1 text-xs font-medium border border-border/50"
                          onClick={(e) => {
                            e.stopPropagation()
                            setComingSoonOpen(true)
                          }}
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          {t.demo || "Demo"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={demoModalOpen} onOpenChange={setDemoModalOpen}>
          <DialogContent className="max-w-4xl p-4 bg-background/95 backdrop-blur-xl border border-border">
            {currentGallery && currentGallery.length > 0 && (
              <div className="space-y-3">
                <div className="text-center">
                  <DialogTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
                    {currentGallery[currentImageIndex]?.name}
                  </DialogTitle>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length)}
                    className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                  </button>

                  <div className="relative bg-slate-950/80 rounded-xl overflow-hidden shadow-2xl border border-primary/20 flex items-center justify-center p-2" style={{ width: "100%", height: "65vh", maxHeight: "550px" }}>
                    <img
                      src={currentGallery[currentImageIndex]?.path}
                      alt={currentGallery[currentImageIndex]?.name}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10">
                      {currentImageIndex + 1} / {currentGallery.length}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % currentGallery.length)}
                    className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                    title="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </button>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = currentGallery[currentImageIndex]?.path
                      link.download = `${currentGallery[currentImageIndex]?.name}.png`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors font-semibold text-sm"
                    title="Download image"
                  >
                    <Download className="w-4 h-4" />
                    {t.downloadImage || "Download Image"}
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>


        <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
          <DialogContent className="max-w-md p-6">
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-primary/20 to-purple-500/20 p-4 rounded-full">
                    <Clock className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{t.comingSoon || "Under Development!"}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.comingSoonDesc || "This live app demo is currently under active development. I'm working hard on it and will deploy it soon!"}
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <p className="text-xs text-muted-foreground font-medium">
                  {t.comingSoonNote || "⏱️ Expected to be deployed soon. Stay tuned!"}
                </p>
              </div>

              <button
                onClick={() => setComingSoonOpen(false)}
                className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-semibold text-sm"
              >
                {t.gotIt || "Got it, thanks!"}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={suggestionOpen} onOpenChange={setSuggestionOpen}>
          <DialogContent className="max-w-md p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground">Share Your Suggestion</h3>
                <p className="text-sm text-muted-foreground mt-1">Help me improve my portfolio</p>
              </div>

              {suggestionSubmitted ? (
                <div className="space-y-3 py-6 text-center">
                  <div className="text-4xl">✨</div>
                  <h4 className="text-xl font-bold text-foreground">Thank You!</h4>
                  <p className="text-muted-foreground">Your suggestion has been sent successfully. I appreciate your feedback!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={suggestionMessage}
                    onChange={(e) => setSuggestionMessage(e.target.value)}
                    placeholder="Share your thoughts, ideas, or suggestions..."
                    className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleSuggestionSubmit}
                      disabled={!suggestionMessage.trim()}
                      className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                    <button
                      onClick={() => {
                        setSuggestionOpen(false)
                        setSuggestionMessage("")
                      }}
                      className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <section id="contact" className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
          <PulseBeams
            beams={beams}
            gradientColors={gradientColors}
            className="bg-slate-950"
          >
            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">{t.letsCreate}</h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">{t.contactDesc}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 flex-wrap">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                  <a href="mailto:sniscith07@gmail.com">
                    <Mail className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.emailMe}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-[#0077B5] hover:bg-[#005885] text-white font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-lg shadow-[#0077B5]/25 hover:shadow-[#0077B5]/40 transition-all duration-300 transform hover:scale-105">
                  <a href="https://www.linkedin.com/in/nischith-s7/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.linkedIn}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                  <a href="https://github.com/nischiths07" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.gitHub}
                  </a>
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg" onClick={() => setSuggestionOpen(true)}>
                  💡 Send Suggestion
                </Button>
              </div>
            </div>
          </PulseBeams>
        </section>

        <footer className="bg-gradient-to-r from-primary via-purple-600 to-primary py-8 md:py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-white font-semibold text-base md:text-lg mb-2">© 2025 NISCHITH.S. All rights reserved.</p>
              <p className="text-white/90 text-sm md:text-base font-semibold">Designed & Built with Next.js, React, Tailwind CSS & Modern Web Technologies</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }
