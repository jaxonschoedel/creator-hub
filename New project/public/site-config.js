export const siteConfig = {
  brand: "Your Studio",
  tagline: "Social hub, booking form, and private submissions dashboard.",
  description:
    "A clean, publish-ready home for your online presence with a custom form you can tune as the project grows.",
  location: "Built for creators, teams, and small businesses",
  cta: "Send an inquiry",
  contactEmail: "hello@example.com",
  socials: [
    { label: "Instagram", handle: "@yourstudio", url: "https://instagram.com/" },
    { label: "TikTok", handle: "@yourstudio", url: "https://tiktok.com/" },
    { label: "YouTube", handle: "@yourstudio", url: "https://youtube.com/" },
    { label: "LinkedIn", handle: "Your Studio", url: "https://linkedin.com/" }
  ],
  highlights: [
    "Customizable form fields",
    "Private backend review",
    "Free hosting friendly",
    "Easy long-term edits"
  ],
  formTitle: "Tell us what you need",
  formIntro:
    "Use this form for bookings, collaborations, quotes, waitlists, or intake. Fields are controlled in one config file.",
  formFields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Your name"
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "you@example.com"
    },
    {
      name: "projectType",
      label: "What is this about?",
      type: "select",
      required: true,
      options: ["Booking", "Collaboration", "General question", "Support", "Other"]
    },
    {
      name: "budget",
      label: "Budget or timeline",
      type: "text",
      placeholder: "$1,000 or Launching in June"
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
      placeholder: "Share the details that matter."
    }
  ],
  adminColumns: ["name", "email", "projectType", "budget", "message"]
};
