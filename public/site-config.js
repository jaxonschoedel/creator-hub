export const siteConfig = {
  brand: "Isaac Oppermann",
  tagline: "D1 athlete, filmmaker, and lifestyle creator helping brands earn attention online.",
  description:
    "Cinematic motivation, athlete lifestyle, and performance-focused content from a Penn State distance runner.",
  location: "Penn State Track & Field / Cross Country",
  cta: "Work with Isaac",
  contactEmail: "oppermannisaac@gmail.com",
  socials: [
    { label: "Instagram", handle: "@isaacoppermann", url: "https://www.instagram.com/isaacoppermann/" },
    { label: "YouTube", handle: "@IsaacOppermann", url: "https://www.youtube.com/@IsaacOppermann" },
    { label: "TikTok", handle: "@isaacoppermann", url: "https://www.tiktok.com/@isaacoppermann" },
    { label: "Linktree", handle: "All current links", url: "https://linktr.ee/isaacoppermann" }
  ],
  highlights: [
    "55K+ Instagram followers",
    "D1 Penn State athlete",
    "Cinematic short-form content",
    "Content Strategist"
  ],
  formTitle: "Work with Isaac",
  formIntro:
    "Brands can start a partnership on the left. Creators can reach out on the right for online coaching through Isaac's brand academy.",
  brandForm: {
    type: "Brand partnership",
    title: "For brands",
    intro: "Collaborations, performance products, creator campaigns, media work, and athlete-led storytelling.",
    cta: "Send brand inquiry",
    fields: [
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
        name: "company",
        label: "Brand or company",
        type: "text",
        required: true,
        placeholder: "Company name"
      },
      {
        name: "projectType",
        label: "Partnership type",
        type: "select",
        required: true,
        options: [
          "Brand collaboration",
          "Sponsored content",
          "UGC / product video",
          "Performance product partnership",
          "Media or interview",
          "Other"
        ]
      },
      {
        name: "budget",
        label: "Budget or timeline",
        type: "text",
        placeholder: "$1,000 or Launching in June"
      },
      {
        name: "message",
        label: "Campaign details",
        type: "textarea",
        required: true,
        placeholder: "Share the campaign goals, deliverables, timeline, and product details."
      }
    ]
  },
  creatorForm: {
    type: "Creator coaching",
    title: "For creators",
    intro: "Online coaching for creators who want to grow their content, sharpen their brand, and learn how to earn attention.",
    proof: "Join 1329+ other creators empowered by coaching services",
    cta: "Apply for coaching",
    fields: [
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
      name: "platform",
      label: "Main platform",
      type: "select",
      required: true,
      options: [
        "Instagram",
        "TikTok",
        "YouTube",
        "Multiple platforms",
        "Just getting started",
        "Other"
      ]
    },
    {
      name: "handle",
      label: "Social handle",
      type: "text",
      placeholder: "@yourhandle"
    },
    {
      name: "creatorGoals",
      label: "Creator goals",
      type: "text",
      required: true,
      placeholder: "Grow Instagram, improve video hooks, land brand deals, build a content system"
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
      placeholder: "Share where you are now, what you want help with, and what kind of coaching you are looking for."
    }
    ]
  },
  adminColumns: [
    "inquiryType",
    "name",
    "email",
    "company",
    "projectType",
    "platform",
    "handle",
    "creatorGoals",
    "budget",
    "message"
  ]
};
