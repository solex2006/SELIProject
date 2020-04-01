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
          "Create story (Scenes)",
          "Crear una historia (Escenas)",
          "Criar história (Cenas)",
          "",
          "Hikaye oluştur (Sahneler)",
        ],
        component: 'storytelling',
      },
      {
        label: [
          "Create story (Timeline)",
          "Crear una historia (Línea de tiempo)",
          "Criar história (Linha do tempo)",
          "",
          "Hikaye oluştur (Zaman çizelgesi)",
        ],
        component: 'storytelling-time',
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
