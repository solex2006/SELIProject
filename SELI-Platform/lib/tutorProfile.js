
var OPTIONS = [
  {
    label: [
      "My courses",
      "Mis cursos",
      "Meus cursos",
      "Moje kursy",
      "Benim derslerim",
    ],
    suboptions: [
      {
        label: [
          "Create course",
          "Crear un curso",
          "Crie um curso",
          "Utwórz kurs",
          "Ders oluştur",
        ],
        component: 'create',
      },
      {
        label: [
          "Published courses",
          "Cursos publicados",
          "Cursos publicados",
          "Opublikuj kurs",
          "Yayınlanan dersler",
        ],
        component: 'published',
      },
      {
        label: [
          "Saved courses",
          "Cursos guardados",
          "Cursos salvos",
          "Zapisane kursy",
          "Kaydedilen dersler",
        ],
        component: 'saved',
      },
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
        component: 'community',
      },
    ],
  },
  {
    label: [
      "Learning analytics",
      "Analíticas de aprendizaje",
      "Análise de aprendizado",
      "Nauka analityki",
      "Analitiği öğrenme",
    ],
    suboptions: [
      {
        label: [
          "My Dashboard",
          "Mi tablero",
          "Meu painel",
          "Moja tablica",
          "Gösterge Panelim",
        ],
        component: 'dashboard',
      }
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
