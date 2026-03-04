"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { PulseBeams } from "@/components/ui/pulse-beams"
import {
  Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Download, MapPin,
  GraduationCap, Briefcase, Instagram, Sparkles, ArrowRight, Star, Clock, Award,
  Terminal, Brain, Cloud, Wrench, Menu, User, Code2, FolderKanban, Contact, Globe2,
  Home, Zap, Heart, Lightbulb
} from "lucide-react"

type Language = "en" | "hi" | "kn"

const translations = {
  en: {
    developer: "Hello, I'm a Developer", building: "Building Tomorrow's Digital Future",
    description: "Passionate about crafting innovative software solutions, exploring cutting-edge technologies, and creating meaningful digital experiences.",
    downloadResume: "Download Resume", viewProjects: "View Projects", aboutMe: "About Me", home: "Home",
    education: "Education", currentFocus: "Current Focus", cse: "B.Tech in CSE", college: "Sahyadri College, Mangaluru",
    cgpa: "CGPA: 8.5", focusText: "AI/ML & Full-Stack Development", focusDesc: "Exploring creative design and innovative solutions",
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
  },
  hi: {
    developer: "नमस्ते, मैं एक डेवलपर हूं", building: "कल के डिजिटल भविष्य का निर्माण",
    description: "अभिनव सॉफ्टवेयर समाधान बनाने, अत्याधुनिक तकनीकों का अन्वेषण करने और सार्थक डिजिटल अनुभव बनाने के लिए उत्सुक।",
    downloadResume: "रिज़्यूमे डाउनलोड करें", viewProjects: "प्रोजेक्ट देखें", aboutMe: "मेरे बारे में", home: "होम",
    education: "शिक्षा", currentFocus: "वर्तमान फोकस", cse: "CSE में B.Tech", college: "सह्याद्री कॉलेज, मंगलुरु",
    cgpa: "CGPA: 8.5", focusText: "AI/ML और फुल-स्टैक डेवलपमेंट", focusDesc: "क्रिएटिव डिज़ाइन और नवीन समाधानों का अन्वेषण",
    technicalSkills: "तकनीकी कौशल", skillsSubtitle: "जिस तकनीक के साथ काम करता हूं",
    featuredProjects: "प्रमुख परियोजनाएं", projectsSubtitle: "मेरा कुछ हालिया काम",
    letsCreate: "मिलकर कुछ बनाएं", contactDesc: "मुझे नई संभावनाओं, नवीन परियोजनाओं और प्रौद्योगिकी और डिज़ाइन के बारे में बात करने में हमेशा रुचि होती है।",
    emailMe: "ईमेल करें", linkedIn: "लिंक्डइन", gitHub: "गिटहब", getInTouch: "संपर्क करें",
    projects: "प्रोजेक्ट", technologies: "तकनीक", years: "वर्ष", openToWork: "काम के लिए तैयार",
    computerScienceEngineer: "कंप्यूटर साइंस इंजीನಿಯರ್", location: "शिमोगा, कर्नाटक",
    passion: "AI और आधुनिक वेब तकनीकों के साथ अभिनव सॉफ्टवेयर समाधान बनाने में उत्सुक।",
    whatIDo: "मैं क्या करता हूं", creativeSolutions: "क्रिएटिव समाधान", creativeDesc: "वास्तविक समस्याओं को हल करने वाले अभिनव एप्लिकेशन बनाना",
    innovativeTech: "इनोवेटिव टेक", innovativeDesc: "अत्याधुनिक परिणामों के लिए AI/ML और आधुनिक फ्रेमवर्क का उपयोग",
    userCentric: "यूजर-सेंट्रिक डिज़ाइन", userCentricDesc: "सहज और आकर्षक डिजिटल अनुभव बनाना",
    languagesKnown: "भाषाएं जानते हैं", kannada: "कन्नड़", english: "अंग्रेज़ी", hindi: "हिंदी",
  },
  kn: {
    developer: "ಹಲೋ, ನಾನೊಬ್ಬ ಡೆವಲಪರ್", building: "ನಾಳಿನ ಡಿಜಿಟಲ್ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇನೆ",
    description: "ನವೀನ ಸಾಫ್ಟ್‌ವೇರ್ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸುವ, ಅತ್ಯಾಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳನ್ನು ಅನ್ವೇಷಿಸುವ ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಡಿಜಿಟಲ್ ಅನುಭವಗಳನ್ನು ರಚಿಸುವ ಉತ್ಸಾಹಿ.",
    downloadResume: "ರೆಜ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", viewProjects: "ಪ್ರೊಜೆಕ್ಟ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ", aboutMe: "ನನ್ನ ಬಗ್ಗೆ", home: "ಹೋಮ್",
    education: "ಶಿಕ್ಷಣ", currentFocus: "ಪ್ರಸ್ತುತ ಗಮನ", cse: "CSE ನಲ್ಲಿ B.Tech", college: "ಸಹ್ಯಾದ್ರಿ ಕಾಲೇಜು, ಮಂಗಳೂರು",
    cgpa: "CGPA: 8.5", focusText: "AI/ML ಮತ್ತು ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಅಭಿವೃದ್ಧಿ", focusDesc: "ಸೃಜನಾತ್ಮಕ ವಿನ್ಯಾಸ ಮತ್ತು ನವೀನ ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸುತ್ತಿದ್ದೇನೆ",
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
  const isMobile = useIsMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const t = translations[language]

  useEffect(() => { setIsLoaded(true) }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(sectionId)
      if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" })
    }
  }

  const handleEmailClick = () => { window.location.href = "mailto:snischith07@gmail.com" }
  const handleGithubClick = () => { window.open("https://github.com/nischiths07", "_blank") }
  const handleLinkedInClick = () => { window.open("https://www.linkedin.com/in/nischith-s7/", "_blank") }
  const handleInstagramClick = () => { window.open("https://www.instagram.com/creatat_ns1/", "_blank") }
  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Nischith_S_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const skillCategories = [
    { title: "Programming Languages", icon: Code, skills: ["C", "Python", "Java", "JavaScript"], color: "from-blue-500 to-cyan-500" },
    { title: "AI & Machine Learning", icon: Brain, skills: ["Deep Learning", "NLP", "Computer Vision", "Scikit-learn"], color: "from-purple-500 to-pink-500" },
    { title: "Web Technologies", icon: Globe, skills: ["React", "Next.js", "Node.js", "HTML/CSS"], color: "from-green-500 to-emerald-500" },
    { title: "Databases", icon: Database, skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis"], color: "from-orange-500 to-amber-500" },
    { title: "Cloud & DevOps", icon: Cloud, skills: ["AWS", "Docker", "Nginx", "Git"], color: "from-sky-500 to-blue-500" },
    { title: "Tools", icon: Wrench, skills: ["VS Code", "Docker Hub", "Linux", "Figma"], color: "from-rose-500 to-red-500" },
  ]

  const projects = [
    { title: "Skin Lesion Detection using Deep Learning & ACO", description: "Medical image classification system using Deep Learning with Ant Colony Optimization for improved accuracy.", tech: ["Python", "Deep Learning", "CNN", "OpenCV"], github: "https://github.com/nischiths07", category: "AI/ML", highlight: "95% Accuracy", image: "/images/skin lesion.png" },
    { title: "Gold Price Prediction System", description: "ML-based predictive analytics system forecasting gold prices using historical data.", tech: ["Python", "ML", "Pandas", "Scikit-learn"], github: "https://github.com/nischiths07", category: "Data Science", highlight: "Time Series", image: "/images/GOLD PREDITION.png" },
    { title: "Farm Management System", description: "Database-driven agricultural platform for tracking crops, inventory, and transactions.", tech: ["MySQL", "DBMS", "SQL", "ER Diagrams"], github: "https://github.com/nischiths07", category: "Database", highlight: "Full CRUD", image: "/images/farm.png" },
    { title: "Hostel Management (DevOps)", description: "Full-stack hostel management deployed using Docker containers and AWS EC2.", tech: ["Docker", "AWS EC2", "Nginx", "MERN"], github: "https://github.com/nischiths07", category: "DevOps", highlight: "Cloud Deployed", image: "/images/sahyadriOps.png" },
    { title: "Book My Show Clone", description: "Responsive movie booking frontend with seat layout design.", tech: ["HTML", "CSS", "JavaScript", "Responsive"], github: "https://github.com/nischiths07", category: "Web Dev", highlight: "Interactive UI", image: "/images/book-my-show.png" },
    { title: "Govt Scheme Analyzer (NLP)", description: "AI-powered NLP system analyzing government scheme documents.", tech: ["NLP", "AI", "Explainable AI", "System Design"], github: "https://github.com/nischiths07", category: "AI/ML", highlight: "NLP Powered", image: "/images/govt scheme analzyer.png" },
  ]

  const stats = [
    { label: t.projects, value: "6+", icon: Award },
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
    { name: t.kannada || "Kannada", level: "Native" },
    { name: t.english || "English", level: "Professional" },
    { name: t.hindi || "Hindi", level: "Professional" },
  ]

  const whatIDoItems = [
    { icon: Lightbulb, title: t.creativeSolutions, description: t.creativeDesc, color: "from-yellow-500 to-orange-500" },
    { icon: Zap, title: t.innovativeTech, description: t.innovativeDesc, color: "from-purple-500 to-pink-500" },
    { icon: Heart, title: t.userCentric, description: t.userCentricDesc, color: "from-red-500 to-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <nav className={`fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">NISCHITH.S</h1>
            <div className="hidden lg:flex space-x-1">
              {[{id:"home",label:t.home,icon:Home},{id:"about",label:t.aboutMe,icon:User},{id:"skills",label:t.technicalSkills,icon:Code2},{id:"projects",label:t.featuredProjects,icon:FolderKanban},{id:"contact",label:"Contact",icon:Contact}].map((item) => (
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
                    <h2 className="text-xl font-bold">Nischith S</h2>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {[{id:"home",label:t.home,icon:Home},{id:"about",label:t.aboutMe,icon:User},{id:"skills",label:t.technicalSkills,icon:Code2},{id:"projects",label:t.featuredProjects,icon:FolderKanban},{id:"contact",label:"Contact",icon:Contact}].map((item) => (
                      <button key={item.id} onClick={() => {scrollToSection(item.id); setMobileMenuOpen(false)}} className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${activeSection === item.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}>
                        <item.icon className="w-5 h-5" /><span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto space-y-3 pt-8">
                    <Button className="w-full bg-primary" onClick={() => {handleEmailClick(); setMobileMenuOpen(false)}}><Mail className="w-4 h-4 mr-2" />{t.getInTouch}</Button>
                    <Button variant="outline" className="w-full" onClick={() => {handleResumeDownload(); setMobileMenuOpen(false)}}><Download className="w-4 h-4 mr-2" />{t.downloadResume}</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <div className="w-full">
        <section id="home" className="min-h-[90vh] flex items-center justify-center px-4 md:px-6 py-20 bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
          <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className={`transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative inline-block mb-8">
                <div className="w-56 h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl ring-4 ring-primary/20">
                  <img src="/images/profile-photo.jpg" alt="Nischith S" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-background"></div>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-white border border-primary/20 whitespace-nowrap">
                  <Sparkles className="w-4 h-4 inline mr-1" />{t.openToWork}
                </div>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Nischith S</h2>
              <p className="text-primary font-semibold text-lg md:text-xl mb-4">{t.computerScienceEngineer}</p>
              <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-6"><MapPin className="w-4 h-4" /><span className="text-sm">{t.location}</span></div>
            </div>
            <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">👋 {t.developer}</span>
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.building}
            </h1>
            <p className={`text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t.description}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-base md:text-lg px-6 md:px-8" onClick={handleResumeDownload}><Download className="w-5 h-5 mr-2" />{t.downloadResume}</Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 border-2" onClick={() => scrollToSection("projects")}>{t.viewProjects}<ArrowRight className="w-5 h-5 ml-2" /></Button>
            </div>
            <div className={`flex justify-center space-x-4 mt-8 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[{icon:Github,link:handleGithubClick},{icon:Linkedin,link:handleLinkedInClick},{icon:Instagram,link:handleInstagramClick},{icon:Mail,link:handleEmailClick}].map((social, index) => (
                <button key={index} onClick={social.link} className="p-3 bg-muted hover:bg-primary/20 rounded-full transition-all duration-300 hover:scale-110">
                  <social.icon className="w-5 h-5 text-foreground" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.aboutMe}</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="space-y-4">
                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-3 md:mr-4"><GraduationCap className="w-5 md:w-6 h-5 md:h-6 text-primary" /></div>
                    <div><CardTitle className="text-lg md:text-xl">{t.education}</CardTitle><p className="text-sm text-muted-foreground">{t.cse}</p></div>
                  </CardHeader>
                  <CardContent><p className="font-bold text-foreground">{t.college}</p><p className="text-primary font-semibold mt-1">{t.cgpa}</p></CardContent>
                </Card>
                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mr-3 md:mr-4"><Briefcase className="w-5 md:w-6 h-5 md:h-6 text-purple-500" /></div>
                    <div><CardTitle className="text-lg md:text-xl">{t.currentFocus}</CardTitle><p className="text-sm text-muted-foreground">Building Skills</p></div>
                  </CardHeader>
                  <CardContent><p className="font-bold text-foreground">{t.focusText}</p><p className="text-muted-foreground mt-1 text-sm">{t.focusDesc}</p></CardContent>
                </Card>
                <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">{t.languagesKnown || "Languages Known"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {languagesKnown.map((lang, index) => (
                        <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary">{lang.name} - {lang.level}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground mb-4">{t.whatIDo || "What I Do"}</h3>
                {whatIDoItems.map((item, index) => (
                  <Card key={index} className="border-2 border-primary/10 hover:border-primary/40 transition-all duration-300">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}><item.icon className="w-6 h-6 text-white" /></div>
                        <div><h4 className="font-bold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.description}</p></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.technicalSkills}</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-4">{t.skillsSubtitle}</p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {skillCategories.map((category, index) => (
                <Card key={index} className="border-2 border-primary/10 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br ${category.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 md:w-7 h-6 md:h-7 text-white" />
                    </div>
                    <CardTitle className="text-base md:text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 bg-primary/5 text-primary">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t.featuredProjects}</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-4">{t.projectsSubtitle}</p>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <Card key={index} className={`border-2 border-primary/10 hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl group cursor-pointer ${hoveredProject === index ? 'scale-[1.02]' : ''}`}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
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
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => window.open(project.github, "_blank")}>
                        <Github className="w-3 h-3 mr-1" />Code
                      </Button>
                      <Button size="sm" className="flex-1 text-xs bg-primary/90">
                        <ExternalLink className="w-3 h-3 mr-1" />Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-lg shadow-primary/25" onClick={handleEmailClick}>
                  <Mail className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.emailMe}
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg" onClick={handleLinkedInClick}>
                  <Linkedin className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.linkedIn}
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg" onClick={handleGithubClick}>
                  <Github className="w-5 md:w-6 h-5 md:h-6 mr-2" />{t.gitHub}
                </Button>
              </div>
            </div>
          </PulseBeams>
        </section>

        <footer className="bg-gradient-to-r from-primary via-purple-600 to-primary py-8 md:py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <p className="text-white font-semibold text-base md:text-lg mb-2">© 2025 NISCHITH.S. All rights reserved.</p>
            <p className="text-white/90 text-sm md:text-base font-semibold">Designed & Built with Next.js, React, Tailwind CSS & Modern Web Technologies</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
