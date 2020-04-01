var OPTIONS = [
  {
    label: [
      "Dashboard",
      "Dashboard",
      "Dashboard",
      "",
      "Dashboard",
    ],
    suboptions: [
      {
        label: [
          "My Dashboard",
          "Mi Dashboard",
          "My Dashboard",
          "",
          "My Dashboard",
        ],
        component: 'dashboard',
      }
    ],
  },
  {
    label: ["Requests - feedback"],
    suboptions: [
      {
        label: ["Tutor requests"],
        component: 'tutorRequests',
      },
      {
        label: ["Disabilitie requests"],
        component: 'disabilitieRequests',
      },
      {
        label: ["Requirements requests"],
        component: 'requirementRequests',
      },
      {
        label: ["Bug reports"],
        component: 'bugs',
      },
    ],
  },
  {
    label: ["Students administration"],
    suboptions: [
      {
        label: ["Registered students"],
        component: 'students',
      },
    ],
  },
  {
    label: ["Certificates administration"],
    suboptions: [
      {
        label: ["Registered certificates"],
        component: 'certificates',
      },
    ],
  },
  {
    label: ["Tutors administration"],
    suboptions: [
      {
        label: ["Registered tutors"],
        component: 'tutors',
      },
    ],
  },
  {
    label: ["Courses administration"],
    suboptions: [
      {
        label: ["Courses"],
        component: 'courses',
      },
      {
        label: ["Disabilities"],
        component: 'disabilities',
      },
      {
        label: ["Requirements"],
        component: 'requirements',
      },
    ],
  },
  {
    label: ["Comments administration"],
    suboptions: [
      {
        label: ["Comments list"],
        component: 'comments',
      },
    ],
  },
]

export default OPTIONS;
