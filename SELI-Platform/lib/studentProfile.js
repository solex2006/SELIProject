var OPTIONS = [
  {
    label: [
      "My courses",
      "Mis cursos",
      "Meus cursos",
      "",
      "Derslerim",
    ],
    suboptions: [
      {
        label: [
          "Suscribed courses",
          "Cursos Inscritos",
          "Cursos inscritos",
          "",
          "Takip edilen derslerim",
        ],
        component: 'subscribed',
      },
      {
        label: [
          "SELI courses",
          "Cursos SELI",
          "Cursos SELI",
          "",
          "SELI Dersleri"
        ],
        component: 'courses',
      },
    ],
  },
  {
    label: [
      "Storytelling",
      "Narración Digital",
      "Narrativa",
      "",
      "Hikaye Anlatımı",
    ],
    suboptions: [
      {
        label: [
          "My stories",
          "Mis historias",
          "Minhas histórias",
          "",
          "Benim Hikayelerim",
        ],
        component: 'stories',
      },
      {
        label: [
          "Create story",
          "Crear una historia",
          "Criar história",
          "",
          "Hikaye oluştur",
        ],
        component: 'storytelling',
      },
    ],
  },
  {
    label: [
      "Certificates",
      "Certificados",
      "Certificados",
      "",
      "Sertifikalar",
    ],
    suboptions: [
      {
        label: [
          "My certificates",
          "Mis certificados",
          "Meus certificados",
          "",
          "Benim Sertifikalarım",
        ],
        component: 'certificates',
      },
    ],
  },
  {
    label: [
      "Support",
      "Soporte",
      "Suporte",
      "",
      "Destek",
    ],
    suboptions: [
      {
        label: [
          "Help",
          "Ayuda",
          "Ajuda",
          "",
          "Yardım",
        ],
        component: 'help',
      },
      {
        label: [
          "Documentation",
          "Documentación",
          "Documentação",
          "",
          "Belgeleme",
        ],
        component: 'documentation',
      },
    ],
  },
]

export default OPTIONS;
