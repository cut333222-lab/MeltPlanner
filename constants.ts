
import { WeekPlan, FunnelStage } from './types';

export const INITIAL_PLAN: WeekPlan[] = [
  {
    weekNumber: 1,
    mainTheme: "WTF is that?",
    objective: "SoundCloud / Awareness",
    actions: [
      {
        id: 'w1d1',
        day: 1,
        title: "Teaser SoundCloud",
        description: "Publica teaser track en SoundCloud con artwork táctil.",
        channels: ["SoundCloud"],
        stage: FunnelStage.AWARENESS
      },
      {
        id: 'w1d3',
        day: 3,
        title: "Intro Socials",
        description: "Post intro en IG/X: 'Descubre el tacto de nuestra música'.",
        channels: ["Instagram", "X"],
        stage: FunnelStage.AWARENESS
      },
      {
        id: 'w1d5',
        day: 5,
        title: "DJ Outreach",
        description: "DM a DJs para feedback inicial.",
        channels: ["DMs"],
        stage: FunnelStage.INTEREST
      }
    ]
  },
  {
    weekNumber: 2,
    mainTheme: "Próximo Paso",
    objective: "Link de Preventa / Desire",
    actions: [
      {
        id: 'w2d1',
        day: 8,
        title: "Lanzamiento Crowdfunding",
        description: "Anuncio oficial en Stories/Reels con video BTS.",
        channels: ["Instagram", "TikTok"],
        stage: FunnelStage.INTEREST
      },
      {
        id: 'w2d3',
        day: 10,
        title: "Email Blast",
        description: "Email a la lista inicial: 'Apoya el proyecto'.",
        channels: ["Email"],
        stage: FunnelStage.DESIRE
      },
      {
        id: 'w2d5',
        day: 12,
        title: "Early Bird Promo",
        description: "Descuento limitado + sticker exclusivo.",
        channels: ["Web", "Instagram"],
        stage: FunnelStage.DESIRE
      }
    ]
  },
  {
    weekNumber: 3,
    mainTheme: "Detalles del EP",
    objective: "Link de Preventa / Desire",
    actions: [
      {
        id: 'w3d1',
        day: 15,
        title: "Track-by-Track",
        description: "Post detallado sobre los tracks y quotes de artistas.",
        channels: ["Instagram", "Threads"],
        stage: FunnelStage.DESIRE
      },
      {
        id: 'w3d3',
        day: 17,
        title: "IG Live: Fisicalidad",
        description: "Q&A sobre el concepto y por qué vinilo.",
        channels: ["Instagram Live"],
        stage: FunnelStage.DESIRE
      },
      {
        id: 'w3d6',
        day: 20,
        title: "Retargeting Ads",
        description: "Meta Ads a visitantes previos de la web.",
        channels: ["Meta Ads"],
        stage: FunnelStage.DESIRE
      }
    ]
  },
  {
    weekNumber: 4,
    mainTheme: "Evento Físico",
    objective: "Link de Venta / Action",
    actions: [
      {
        id: 'w4d1',
        day: 22,
        title: "Anuncio Evento",
        description: "Anuncia listening party: 'Ven al club, toca el vinilo'.",
        channels: ["Instagram", "Email", "X"],
        stage: FunnelStage.ACTION
      },
      {
        id: 'w4d4',
        day: 25,
        title: "Final Push Countdown",
        description: "Stories countdown + email reminder de stock.",
        channels: ["Instagram", "Email"],
        stage: FunnelStage.ACTION
      },
      {
        id: 'w4d7',
        day: 28,
        title: "Post-Event Survey",
        description: "Encuesta feedback y upsell de merch.",
        channels: ["Email", "DMs"],
        stage: FunnelStage.ACTION
      }
    ]
  }
];

export const FUNNEL_COLORS = {
  [FunnelStage.AWARENESS]: "bg-zinc-800 border-zinc-700 text-zinc-400",
  [FunnelStage.INTEREST]: "bg-blue-900/30 border-blue-800 text-blue-300",
  [FunnelStage.DESIRE]: "bg-purple-900/30 border-purple-800 text-purple-300",
  [FunnelStage.ACTION]: "bg-emerald-900/30 border-emerald-800 text-emerald-300"
};
