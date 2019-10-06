var OPTIONS = [
  {
    label: "Requests - feedback",
    suboptions: [
      {
        label: "Tutor requests",
        component: 'tutorRequests',
      },
      {
        label: "Audience requests",
        component: 'audienceRequests',
      },
      {
        label: "Requirements requests",
        component: 'requirementRequests',
      },
      {
        label: "Bug reports",
        component: 'bugs',
      },
    ],
  },
  {
    label: "Students administration",
    suboptions: [
      {
        label: "Registered students",
        component: 'students',
      },
    ],
  },
  {
    label: "Certificates administration",
    suboptions: [
      {
        label: "Registered certificates",
        component: 'certificates',
      },
    ],
  },
  {
    label: "Tutors administration",
    suboptions: [
      {
        label: "Registered tutors",
        component: 'tutors',
      },
    ],
  },
  {
    label: "Courses administration",
    suboptions: [
      {
        label: "Courses",
        component: 'courses',
      },
      {
        label: "Audiences",
        component: 'audiences',
      },
      {
        label: "Requirements",
        component: 'requirements',
      },
    ],
  },
  {
    label: "Comments administration",
    suboptions: [
      {
        label: "Comments list",
        component: 'comments',
      },
    ],
  },
]

export default OPTIONS;
