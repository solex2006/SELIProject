

var OPTIONS = [
  {
    label: [
      "My courses",
      "Mis cursos",
      "Meus cursos",
      "Moje kursy",
      "Derslerim",
    ],
    suboptions: [
      {
        label: [
          "Suscribed courses",
          "Cursos Inscritos",
          "Cursos inscritos",
          "Subskrybowane kursy",
          "Takip edilen derslerim",
        ],
        component: 'subscribed',
      },
      {
        label: [
          "SELI courses",
          "Cursos SELI",
          "Cursos SELI",
          "Kursy SELI",
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
      "Historie Cyfrowe",
      "Hikaye Anlatımı",
    ],
    suboptions: [
      {
        label: [
          "My stories",
          "Mis historias",
          "Minhas histórias",
          "Moje Historie",
          "Benim Hikayelerim",
        ],
        component: 'stories',
      },
      {
        label: [
          "Create story (Scenes)",
          "Crear una historia (Escenas)",
          "Criar história (Cenas)",
          "Utwórz historię (Sceny)",
          "Hikaye oluştur (Sahneler)",
        ],
        component: 'storytelling',
      },
      {
        label: [
          "Create story (Timeline)",
          "Crear una historia (Línea de tiempo)",
          "Criar história (Linha do tempo)",
          "Utwórz historię (Oś czasu)",
          "Hikaye oluştur (Zaman çizelgesi)",
        ],
        component: 'storytelling-time',
      },
      {
        label: [
          "SELI Stories",
          "Historias SELI",
          "Histórias SELI",
          "SELI Stories",
          "SELI Hikayeleri",
        ],
        component: 'StoriesDashboard',
      },
    ],
  },
  {
    label: [
      "Certificates",
      "Certificados",
      "Certificados",
      "Certyfikaty",
      "Sertifikalar",
    ],
    suboptions: [
      {
        label: [
          "My certificates",
          "Mis certificados",
          "Meus certificados",
          "Moje certyfikaty",
          "Benim Sertifikalarım",
        ],
        component: 'certificates',
      },
    ],
  },
  {
    label: [
      "Badges",
      "Emblemas",
      "Badges",//translate to portuguese
      "Badges",//translate to polish
      "Badges",//translate to turkish
    ],
    
    suboptions: [
      {
        label: [
          "My badges",
          "Mis emblemas",
          "My badges",//translate to portuguese
          "My badges",//translate to polish
          "My badges",//translate to turkish
        ],
        component: 'badgeCollection',
      },
      {
        label: [
          "Verificate badge",
          "Verificar emblema",
          "Verificate badge",//translate to portuguese
          "Verificate badge",//translate to polish
          "Verificate badge",//translate to turkish
        ],
        component: 'badgeVerification',
      },
    ],
  },
  {
    label: [
      "Support",
      "Soporte",
      "Suporte",
      "Pomoc techniczna",
      "Destek",
    ],
    suboptions: [
      {
        label: [
          "Help",
          "Ayuda",
          "Ajuda",
          "Pomoc",
          "Yardım",
        ],
        component: 'help',
      },
      {
        label: [
          "Documentation",
          "Documentación",
          "Documentação",
          "Dokumentacja",
          "Belgeleme",
        ],
        component: 'documentation',
      },
    ],
  },
]

export default OPTIONS;
