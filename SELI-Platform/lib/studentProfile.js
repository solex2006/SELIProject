var OPTIONS = [
  {
    label: "My courses",
    suboptions: [
      {
        label: "Suscribed courses",
        component: 'subscribed',
      },
      {
        label: "SELI courses",
        component: 'courses',
      },
    ],
  },
  {
    label: "Storytelling",
    suboptions: [
      {
        label: "My stories",
        component: 'stories',
      },
      {
        label: "Create story",
        component: 'storytelling',
      },
    ],
  },
  {
    label: "Certificates",
    suboptions: [
      {
        label: "My certificates",
        component: 'certificates',
      },
    ],
  },
  {
    label: "Support",
    suboptions: [
      {
        label: "Help",
        component: 'help',
      },
      {
        label: "Documentation",
        component: 'documentation',
      },
    ],
  },
]

export default OPTIONS;
