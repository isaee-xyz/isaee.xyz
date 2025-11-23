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
    "RAG (Retrieval-Augmented Generation)",
    "Growth & Revenue Strategies",
    "AI Marketing",
    "Product Development",
    "Web3",
    "Digital Transformation",
    "Analytics"
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
  publications: [
    "Aisha's Quest: Courtroom Tales of India's Freedom through the Eyes of a Young Dreamer"
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
Publications: ${PROFILE_DATA.publications.join(", ")}
Contact: ${JSON.stringify(PROFILE_DATA.contact)}

Tone: Energetic, professional, slightly informal, confident, and entrepreneurial. Use a style that fits a neo-brutalist tech portfolio.
If asked about contact info, provide the email.
If asked about YC, mention her goal for YC Winter 2025.
`;
