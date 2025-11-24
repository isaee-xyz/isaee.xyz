export const PROFILE_DATA = {
  name: "Twinkle Garg",
  headline: "Aiming for YC Winter 2025 | Growth, Revenue & Product Marketing @Infinity Learn",
  subHeadline: "Aspiring Entrepreneur | Product Growth & AI Marketing Specialist | Integrity & Impact",
  location: "Bengaluru, Karnataka, India",
  summary: "Passionate entrepreneur with 4+ years of diverse experience in startups, specializing in growth, AI-driven marketing, and digital transformation. Currently building Howtohelp.in while leading impactful growth initiatives at Infinity Learn. Certified in Generative AI, Product Management, and Digital Marketing, I combine curiosity, courage, and a relentless drive to make a difference.",
  contact: {
    email: "deepugarg008@gmail.com",
    linkedin: "www.linkedin.com/in/twinkle-garg"
  },
  skills: [
    "Generative AI",
    "LLaMA",
    "RAG",
    "Semantic Search",
    "Growth Hacking",
    "Revenue Strategies",
    "Product Launch",
    "SEO & Analytics",
    "Web3",
    "Digital Transformation",
    "B2B Marketing",
    "Strategic Planning"
  ],
  experience: [
    {
      company: "Infinity Learn",
      role: "Product Growth Manager",
      period: "June 2024 - Present",
      location: "Bangalore Urban, Karnataka, India",
      description: "Improving efficiency across teams."
    },
    {
      company: "Infinity Learn",
      role: "Product Marketing Specialist",
      period: "March 2022 - May 2024",
      location: "Hyderabad, Telangana, India",
      description: ""
    },
    {
      company: "Annus Mirabilis LLP",
      role: "Managing Partner",
      period: "May 2023 - Present",
      location: "Hyderabad, Telangana, India",
      description: ""
    },
    {
      company: "Collegedunia",
      role: "Business Development",
      period: "August 2021 - November 2021",
      location: "Gurugram, Haryana, India",
      description: ""
    },
    {
      company: "Sunstone Eduversity",
      role: "Business Analyst",
      period: "April 2021 - August 2021",
      location: "Gurugram, Haryana, India",
      description: ""
    }
  ],
  education: [
    {
      institution: "Punjab Engineering College",
      degree: "Bachelor of Technology - BTech, ECE",
      period: "2017 - 2021"
    },
    {
      institution: "St. Xavier's School Bathinda",
      degree: "Schooling",
      period: "2000 - 2016"
    }
  ],
  awards: [
    "Institute Colors"
  ],
  book: {
    title: "Aisha's Quest : Courtroom Tales of India's Freedom",
    subtitle: "through the Eyes of a Young Dreamer",
    authors: "Twinkle Garg, ChatGPT 4 (Editor), Claude AI (Editor)",
    description: "When young college student Aisha begins questioning the meaning of freedom on an idle morning, she sets foot on a profound journey that will unravel the winding tale of India's fight for social reform and judicial activism. Accompanied by her grandmother Meera's stories, Aisha traces the arduous battles fought by trailblazers like Shah Bano and Kesavananda Bharati.",
    link: "https://www.amazon.in/Aishas-Quest-Courtroom-Freedom-through-ebook/dp/B0CFZDD3PQ",
    image: "https://m.media-amazon.com/images/I/41-lS2kX-CL.jpg" 
  },
  articles: [
    {
      title: "Transforming AI: Key Takeaways from Compound AI Systems & DSPy",
      description: "A breakdown of modular AI systems, the shift from monolithic models to compound systems, and how frameworks like DSPy are enabling transparent, efficient, and flexible AI solutions.",
      date: "Dec 08, 2024",
      link: "https://www.linkedin.com/pulse/transforming-ai-my-key-takeaways-from-compound-systems-garg--85afc"
    },
    {
      title: "2024: The Year Reality Shifted - A Letter from the Edge of Tomorrow",
      description: "Reflecting on a year of extraordinary acceleration—from Quantum Computing and AI abundance to the new post-labor economy and the urgent calls of climate change.",
      date: "Jan 01, 2025",
      link: "https://www.linkedin.com/pulse/2024-year-reality-shifted-letter-from-edge-tomorrow-twinkle-garg--e3iec"
    },
    {
      title: "Titans: A Giant Leap in AI Memory and Reasoning",
      description: "Exploring Google Research's 'Titans' architecture, which introduces neural long-term memory to handle contexts of over 2 million tokens, overcoming the limitations of traditional Transformers.",
      date: "Jan 23, 2025",
      link: "https://www.linkedin.com/pulse/titans-giant-leap-ai-memory-reasoning-twinkle-garg--rkzdc"
    },
    {
      title: "The Wikipedia Wars: When Fighting Bias Creates More Bias",
      description: "An analysis of Grokipedia vs. Wikipedia, exploring the uncomfortable truth that replacing human curators with algorithms often just swaps one set of blind spots for another.",
      date: "Nov 04, 2025",
      link: "https://www.linkedin.com/in/twinkle-garg" 
    }
  ]
};

export const RESUME_CONTEXT = `
You are an AI assistant representing Twinkle Garg. Use the following resume data to answer questions.
Name: ${PROFILE_DATA.name}
Headline: ${PROFILE_DATA.headline}
Summary: ${PROFILE_DATA.summary}
Skills: ${PROFILE_DATA.skills.join(", ")}
Experience: ${JSON.stringify(PROFILE_DATA.experience)}
Education: ${JSON.stringify(PROFILE_DATA.education)}
Awards: ${PROFILE_DATA.awards.join(", ")}
Book: ${PROFILE_DATA.book.title} - ${PROFILE_DATA.book.description}
Articles: ${PROFILE_DATA.articles.map(a => a.title).join(", ")}
Contact: ${JSON.stringify(PROFILE_DATA.contact)}

Tone: Energetic, professional, slightly informal, confident, and entrepreneurial. Use a style that fits a neo-brutalist tech portfolio.
If asked about contact info, provide the email.
If asked about YC, mention her goal for YC Winter 2025.
If asked about her book, emphasize it explores Indian judicial activism through storytelling.
`;