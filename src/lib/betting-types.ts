// Base de conhecimento completa de tipos de apostas por esporte

export interface BettingType {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedFor: string;
  example: string;
}

export interface SportBettingTypes {
  sport: string;
  icon: string;
  types: BettingType[];
}

export const BETTING_KNOWLEDGE: SportBettingTypes[] = [
  {
    sport: 'Futebol',
    icon: '⚽',
    types: [
      {
        id: 'resultado-final',
        name: 'Resultado Final (1X2)',
        description: 'Vitória do time da casa (1), empate (X) ou vitória do visitante (2)',
        riskLevel: 'medium',
        recommendedFor: 'Iniciantes e apostadores gerais',
        example: 'Flamengo (1) vs Palmeiras (2) - Apostar em vitória do Flamengo'
      },
      {
        id: 'dupla-chance',
        name: 'Dupla Chance',
        description: 'Combina dois resultados possíveis (1X, 12, X2)',
        riskLevel: 'low',
        recommendedFor: 'Apostadores conservadores',
        example: '1X = Vitória do mandante OU empate'
      },
      {
        id: 'empate-anula',
        name: 'Empate Anula Aposta',
        description: 'Se der empate, o valor apostado é devolvido',
        riskLevel: 'low',
        recommendedFor: 'Redução de risco em jogos equilibrados',
        example: 'Apostar em vitória, mas se empatar recebe o dinheiro de volta'
      },
      {
        id: 'handicap',
        name: 'Handicap (Asiático/Europeu)',
        description: 'Adiciona vantagem ou desvantagem de gols (ex: +1.5 / -1.5)',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores experientes',
        example: 'Time favorito com -1.5 precisa vencer por 2+ gols'
      },
      {
        id: 'btts',
        name: 'Ambas Equipes Marcam (BTTS)',
        description: 'Apostar se ambos os times farão gol ou não',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com ataques fortes',
        example: 'Sim = Ambos marcam | Não = Pelo menos um não marca'
      },
      {
        id: 'over-under',
        name: 'Mais/Menos Gols (Over/Under)',
        description: 'Total de gols acima ou abaixo de uma linha (ex: 2.5 gols)',
        riskLevel: 'medium',
        recommendedFor: 'Análise de histórico de gols',
        example: 'Over 2.5 = 3 ou mais gols no jogo'
      },
      {
        id: 'placar-exato',
        name: 'Placar Exato',
        description: 'Acertar o resultado preciso da partida',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes com odds altas',
        example: '2x1 para o mandante'
      },
      {
        id: 'intervalo-final',
        name: 'Intervalo / Final de Jogo',
        description: 'Resultado no 1º tempo e no final do jogo',
        riskLevel: 'high',
        recommendedFor: 'Análise de padrões de jogo',
        example: 'Empate no intervalo / Vitória mandante no final'
      },
      {
        id: 'primeiro-marcar',
        name: 'Primeiro a Marcar',
        description: 'Qual time fará o primeiro gol da partida',
        riskLevel: 'medium',
        recommendedFor: 'Times com início forte',
        example: 'Mandante marca primeiro'
      },
      {
        id: 'marcador-gol',
        name: 'Marcador de Gol',
        description: 'Jogador específico que fará gol (ou número de gols)',
        riskLevel: 'high',
        recommendedFor: 'Conhecimento de artilheiros',
        example: 'Neymar marca a qualquer momento'
      },
      {
        id: 'escanteios',
        name: 'Escanteios',
        description: 'Total de escanteios, por tempo, ou qual time terá mais',
        riskLevel: 'medium',
        recommendedFor: 'Análise de estatísticas avançadas',
        example: 'Over 9.5 escanteios no jogo'
      },
      {
        id: 'cartoes',
        name: 'Cartões',
        description: 'Total de cartões, cor (amarelo/vermelho) ou jogador punido',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com rivalidade ou árbitros rigorosos',
        example: 'Over 4.5 cartões amarelos'
      },
      {
        id: 'tempo-mais-gols',
        name: 'Tempo com Mais Gols',
        description: 'Se o 1º ou 2º tempo terá mais gols',
        riskLevel: 'medium',
        recommendedFor: 'Análise de padrões táticos',
        example: '2º tempo terá mais gols'
      },
      {
        id: 'resultado-intervalo',
        name: 'Resultado Correto no Intervalo',
        description: 'Placar exato ao final do 1º tempo',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: '1x0 no intervalo'
      },
      {
        id: 'multigol',
        name: 'Multigol',
        description: 'Faixa de gols que serão marcados no jogo',
        riskLevel: 'medium',
        recommendedFor: 'Previsão de jogos movimentados',
        example: '2-3 gols no jogo total'
      }
    ]
  },
  {
    sport: 'Basquete',
    icon: '🏀',
    types: [
      {
        id: 'moneyline-basquete',
        name: 'Moneyline',
        description: 'Apostar em qual time vencerá o jogo',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores gerais',
        example: 'Lakers vencem os Warriors'
      },
      {
        id: 'handicap-spread',
        name: 'Handicap (Spread)',
        description: 'Vantagem em pontos para equilibrar as odds (ex: +7.5 / -7.5)',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com favoritos claros',
        example: 'Time favorito -7.5 precisa vencer por 8+ pontos'
      },
      {
        id: 'total-pontos',
        name: 'Total de Pontos (Over/Under)',
        description: 'Soma dos pontos das duas equipes acima ou abaixo da linha',
        riskLevel: 'medium',
        recommendedFor: 'Análise de ritmo de jogo',
        example: 'Over 215.5 pontos no jogo'
      },
      {
        id: 'total-equipe',
        name: 'Total por Equipe',
        description: 'Pontos de um time específico',
        riskLevel: 'medium',
        recommendedFor: 'Foco em desempenho individual',
        example: 'Lakers Over 110.5 pontos'
      },
      {
        id: 'par-impar-basquete',
        name: 'Par/Ímpar de Pontos',
        description: 'Total de pontos finais será par ou ímpar',
        riskLevel: 'low',
        recommendedFor: 'Apostas recreativas',
        example: 'Total de pontos será número par'
      },
      {
        id: 'periodos-basquete',
        name: '1º Tempo / 2º Tempo / Quarto',
        description: 'Vencedor ou total de pontos por período específico',
        riskLevel: 'medium',
        recommendedFor: 'Análise de padrões por período',
        example: 'Lakers vencem o 1º quarto'
      },
      {
        id: 'prorrogacao',
        name: 'Prorrogação Conta?',
        description: 'Alguns mercados incluem overtime, outros não',
        riskLevel: 'medium',
        recommendedFor: 'Atenção às regras da casa',
        example: 'Verificar se OT está incluída na aposta'
      },
      {
        id: 'jogador-stats',
        name: 'Estatísticas de Jogador',
        description: 'Pontos, rebotes, assistências de jogador específico',
        riskLevel: 'medium',
        recommendedFor: 'Conhecimento de jogadores estrela',
        example: 'LeBron James Over 25.5 pontos'
      },
      {
        id: 'margem-vitoria',
        name: 'Margem de Vitória',
        description: 'Diferença de pontos na vitória (ex: 1-5 pontos)',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: 'Time vence por 6-10 pontos'
      }
    ]
  },
  {
    sport: 'Tênis',
    icon: '🎾',
    types: [
      {
        id: 'vencedor-partida',
        name: 'Vencedor da Partida',
        description: 'Apostar em qual jogador vencerá',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores gerais',
        example: 'Djokovic vence Nadal'
      },
      {
        id: 'handicap-tenis',
        name: 'Handicap de Games/Sets',
        description: 'Vantagem em games ou sets (ex: +1.5 sets ou -3.5 games)',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com favoritos',
        example: 'Jogador favorito -3.5 games'
      },
      {
        id: 'total-games',
        name: 'Total de Games (Over/Under)',
        description: 'Total de games na partida acima ou abaixo da linha',
        riskLevel: 'medium',
        recommendedFor: 'Análise de estilo de jogo',
        example: 'Over 22.5 games na partida'
      },
      {
        id: 'total-sets',
        name: 'Total de Sets',
        description: 'Se a partida terá 2 ou 3 sets (ou 3 ou 5 em Grand Slams)',
        riskLevel: 'medium',
        recommendedFor: 'Previsão de duração',
        example: 'Partida terá 3 sets'
      },
      {
        id: 'placar-sets',
        name: 'Placar Exato em Sets',
        description: 'Resultado exato da partida em sets',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: '2-0 para o favorito'
      },
      {
        id: 'vencedor-set',
        name: 'Vencedor de Set Específico',
        description: 'Quem ganhará o 1º, 2º ou 3º set',
        riskLevel: 'medium',
        recommendedFor: 'Análise de início de jogo',
        example: 'Federer vence o 1º set'
      },
      {
        id: 'break-saque',
        name: 'Game com Break',
        description: 'Se haverá quebra de saque em um set',
        riskLevel: 'medium',
        recommendedFor: 'Jogos equilibrados',
        example: 'Haverá break no 1º set'
      },
      {
        id: 'tiebreak',
        name: 'Tie-break Acontecerá?',
        description: 'Se algum set irá para tie-break',
        riskLevel: 'medium',
        recommendedFor: 'Jogos equilibrados',
        example: 'Sim, haverá tie-break'
      }
    ]
  },
  {
    sport: 'MMA/UFC',
    icon: '🥊',
    types: [
      {
        id: 'vencedor-luta',
        name: 'Vencedor da Luta',
        description: 'Apostar em qual lutador vencerá',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores gerais',
        example: 'McGregor vence Poirier'
      },
      {
        id: 'metodo-vitoria',
        name: 'Método de Vitória',
        description: 'Como a luta terminará: nocaute, finalização, decisão',
        riskLevel: 'high',
        recommendedFor: 'Conhecimento de estilos de luta',
        example: 'Vitória por nocaute'
      },
      {
        id: 'total-rounds',
        name: 'Total de Rounds (Over/Under)',
        description: 'Se a luta durará mais ou menos rounds que a linha',
        riskLevel: 'medium',
        recommendedFor: 'Análise de resistência',
        example: 'Over 2.5 rounds'
      },
      {
        id: 'vai-distancia',
        name: 'Vai até o Fim? (Goes the Distance)',
        description: 'Se a luta chegará ao último round',
        riskLevel: 'medium',
        recommendedFor: 'Previsão de finalização',
        example: 'Não, luta termina antes do fim'
      },
      {
        id: 'round-vitoria',
        name: 'Round da Vitória',
        description: 'Em qual round específico a luta terminará',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: 'Vitória no 2º round'
      },
      {
        id: 'dupla-chance-mma',
        name: 'Dupla Chance (Método + Lutador)',
        description: 'Combina lutador e método de vitória',
        riskLevel: 'medium',
        recommendedFor: 'Redução de risco',
        example: 'Lutador A vence por KO ou decisão'
      },
      {
        id: 'empate-tecnico',
        name: 'Empate Técnico',
        description: 'Resultado raro mas apostável',
        riskLevel: 'high',
        recommendedFor: 'Odds muito altas',
        example: 'Luta termina em empate'
      }
    ]
  },
  {
    sport: 'Vôlei',
    icon: '🏐',
    types: [
      {
        id: 'vencedor-volei',
        name: 'Vencedor da Partida (Moneyline)',
        description: 'Qual time vencerá a partida',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores gerais',
        example: 'Brasil vence Argentina'
      },
      {
        id: 'handicap-sets',
        name: 'Handicap de Sets',
        description: 'Vantagem em sets (ex: +1.5 sets)',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com favoritos',
        example: 'Time azarão +1.5 sets'
      },
      {
        id: 'handicap-pontos-volei',
        name: 'Handicap de Pontos',
        description: 'Vantagem em pontos totais (ex: +5.5 pontos)',
        riskLevel: 'medium',
        recommendedFor: 'Análise de desempenho',
        example: 'Time favorito -5.5 pontos'
      },
      {
        id: 'total-sets-volei',
        name: 'Total de Sets (Over/Under)',
        description: 'Quantidade de sets na partida',
        riskLevel: 'medium',
        recommendedFor: 'Previsão de duração',
        example: 'Over 3.5 sets (partida vai para 4 ou 5 sets)'
      },
      {
        id: 'placar-exato-volei',
        name: 'Placar Exato',
        description: 'Resultado exato em sets',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: '3-1 para o mandante'
      },
      {
        id: 'total-pontos-volei',
        name: 'Total de Pontos (Over/Under)',
        description: 'Soma total dos pontos de ambos os times',
        riskLevel: 'medium',
        recommendedFor: 'Análise de ritmo',
        example: 'Over 180.5 pontos totais'
      },
      {
        id: 'vencedor-set-volei',
        name: 'Vencedor do Set 1, 2, 3...',
        description: 'Qual time vencerá set específico',
        riskLevel: 'medium',
        recommendedFor: 'Análise de início de jogo',
        example: 'Time A vence o 1º set'
      },
      {
        id: 'margem-set',
        name: 'Margem de Vitória no Set',
        description: 'Diferença de pontos na vitória do set',
        riskLevel: 'high',
        recommendedFor: 'Apostadores experientes',
        example: 'Vence o set por 5+ pontos'
      }
    ]
  },
  {
    sport: 'Outros Esportes',
    icon: '🏆',
    types: [
      {
        id: 'formula1-vencedor',
        name: 'Fórmula 1 - Vencedor',
        description: 'Qual piloto vencerá a corrida',
        riskLevel: 'medium',
        recommendedFor: 'Fãs de automobilismo',
        example: 'Verstappen vence o GP'
      },
      {
        id: 'formula1-top3',
        name: 'Fórmula 1 - Top 3',
        description: 'Piloto terminará no pódio',
        riskLevel: 'low',
        recommendedFor: 'Apostas mais seguras',
        example: 'Hamilton termina no top 3'
      },
      {
        id: 'formula1-volta',
        name: 'Fórmula 1 - Volta Mais Rápida',
        description: 'Qual piloto fará a volta mais rápida',
        riskLevel: 'high',
        recommendedFor: 'Conhecimento técnico',
        example: 'Leclerc faz volta mais rápida'
      },
      {
        id: 'formula1-duelo',
        name: 'Fórmula 1 - Duelo entre Pilotos',
        description: 'Qual piloto terminará à frente do outro',
        riskLevel: 'medium',
        recommendedFor: 'Comparação direta',
        example: 'Hamilton termina à frente de Russell'
      },
      {
        id: 'beisebol-moneyline',
        name: 'Beisebol - Moneyline',
        description: 'Qual time vencerá o jogo',
        riskLevel: 'medium',
        recommendedFor: 'Apostadores gerais',
        example: 'Yankees vencem Red Sox'
      },
      {
        id: 'beisebol-corridas',
        name: 'Beisebol - Total de Corridas',
        description: 'Over/Under de corridas no jogo',
        riskLevel: 'medium',
        recommendedFor: 'Análise de arremessadores',
        example: 'Over 8.5 corridas'
      },
      {
        id: 'beisebol-runline',
        name: 'Beisebol - Handicap (Run Line)',
        description: 'Vantagem de corridas (geralmente 1.5)',
        riskLevel: 'medium',
        recommendedFor: 'Jogos com favoritos',
        example: 'Favorito -1.5 corridas'
      },
      {
        id: 'esports-mapa',
        name: 'E-sports - Vencedor do Mapa',
        description: 'Qual time vencerá mapa específico',
        riskLevel: 'medium',
        recommendedFor: 'Fãs de e-sports',
        example: 'Team Liquid vence mapa 1'
      },
      {
        id: 'esports-total-mapas',
        name: 'E-sports - Total de Mapas',
        description: 'Quantidade de mapas na série',
        riskLevel: 'medium',
        recommendedFor: 'Previsão de duração',
        example: 'Over 2.5 mapas'
      },
      {
        id: 'esports-kills',
        name: 'E-sports - Handicap de Kills',
        description: 'Vantagem em eliminações',
        riskLevel: 'high',
        recommendedFor: 'Conhecimento avançado',
        example: 'Time favorito -5.5 kills'
      }
    ]
  }
];

// Função para obter recomendação inteligente baseada no contexto
export function getSmartRecommendation(
  sport: string,
  matchContext: string,
  userPreference?: 'conservative' | 'balanced' | 'aggressive'
): BettingType[] {
  const sportData = BETTING_KNOWLEDGE.find(s => s.sport.toLowerCase() === sport.toLowerCase());
  
  if (!sportData) return [];

  const preference = userPreference || 'balanced';
  
  // Filtrar por nível de risco baseado na preferência
  let filtered = sportData.types;
  
  if (preference === 'conservative') {
    filtered = filtered.filter(t => t.riskLevel === 'low' || t.riskLevel === 'medium');
  } else if (preference === 'aggressive') {
    filtered = filtered.filter(t => t.riskLevel === 'high' || t.riskLevel === 'medium');
  }

  // Análise contextual simples
  const contextLower = matchContext.toLowerCase();
  
  // Priorizar tipos específicos baseado no contexto
  if (contextLower.includes('favorito') || contextLower.includes('forte')) {
    filtered = filtered.filter(t => 
      t.id.includes('handicap') || 
      t.id.includes('over') || 
      t.id === 'resultado-final'
    );
  }
  
  if (contextLower.includes('equilibrado') || contextLower.includes('parelho')) {
    filtered = filtered.filter(t => 
      t.id.includes('dupla-chance') || 
      t.id.includes('empate') ||
      t.id.includes('btts')
    );
  }

  if (contextLower.includes('gol') || contextLower.includes('ataque')) {
    filtered = filtered.filter(t => 
      t.id.includes('gol') || 
      t.id.includes('over') ||
      t.id.includes('btts')
    );
  }

  // Retornar top 3-5 recomendações
  return filtered.slice(0, 5);
}

// Função para obter todos os tipos de um esporte
export function getBettingTypesBySport(sport: string): BettingType[] {
  const sportData = BETTING_KNOWLEDGE.find(s => s.sport.toLowerCase() === sport.toLowerCase());
  return sportData?.types || [];
}

// Função para buscar tipo específico
export function getBettingTypeById(sport: string, typeId: string): BettingType | undefined {
  const sportData = BETTING_KNOWLEDGE.find(s => s.sport.toLowerCase() === sport.toLowerCase());
  return sportData?.types.find(t => t.id === typeId);
}
